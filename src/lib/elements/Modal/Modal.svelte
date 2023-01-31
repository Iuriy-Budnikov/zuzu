<script context="module">
  export { openModal, closeModal, focusModal } from './utils/store';
  export { default as portal } from './utils/portal';
</script>

<script>
  import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { blur, fade, fly, scale, slide } from 'svelte/transition';
  import { get } from 'svelte/store';
  import portal from './utils/portal';
  import cx from 'clsx';
  import {
    modalComponentState,
    modalsStore,
    initModal,
    unmountModal,
    openModal,
    closeModal
  } from './utils/store';

  export let modalId = '';
  export let target = '#root';

  export let zIndex = 1000;
  export let overlay = true;
  export let maxWidth = '600px';
  export let bgColor = '';
  export let overlayColor = '';

  export let className = '';
  export let overlayClassName = '';
  export let containerClassName = '';

  export let closeOnEsc = true;
  export let closeOnOverlay = true;
  export let closeOnButton = true;

  export let fullHeight = false;
  export let marginTop = '0px';
  export let marginBottom = marginTop;
  export let transitionInFn = 'fade';
  export let transitionOutFn = undefined;
  export let transitionInOptions = { duration: 200 };
  export let transitionOutOptions = undefined;

  const dispatch = createEventDispatcher();

  function dispatchOpen() {
    dispatch('open');
  }
  function dispatchClose() {
    dispatch('close');
  }
  export const open = () => {
    openModal(modalId);
  };
  export const close = () => {
    closeModal(modalId);
  };

  let _modalId = modalId;
  let modalState = modalComponentState(_modalId);
  let isOpen = false;
  let isActive = false;

  let modalRef;

  $: {
    const state = $modalState;
    isOpen = state.isOpen;
    isActive = state.isActive;

    if (isOpen) {
      dispatchOpen();
    } else {
      dispatchClose();
    }
  }

  const normalizeModalId = (modalId) => {
    const id = modalId || `${Date.now()}`;
    const modals = get(modalsStore);
    if (Object.hasOwn(modals, id)) {
      const regex = /(.+)(-)(\d+)$/;
      const nextId = regex.test(id)
        ? id.replace(regex, (_, p1, p2, p3) => `${p1}${p2}${Number(p3) + 1}`)
        : `${id}-1`;
      return normalizeModalId(nextId);
    }
    return id;
  };
  const initialize = () => {
    modalId = normalizeModalId(modalId);
    _modalId = modalId;
    modalState = modalComponentState(_modalId);
    initModal(modalId);
  };
  const unmount = (modalId) => {
    unmountModal(modalId);
  };
  const handleKeyDown = (e) => {
    if (closeOnEsc && isActive && e.key === 'Escape') {
      closeModal(_modalId);
    }
  };
  const handleOverlayClick = (e) => {
    if (closeOnOverlay && isActive && !modalRef?.contains(e.target)) {
      closeModal(_modalId);
    }
  };
  const handleButtonClick = (e) => {
    closeModal(_modalId);
  };

  onMount(() => {
    initialize();
  });
  beforeUpdate(() => {
    if (_modalId !== modalId) {
      unmount(_modalId);
      initialize();
    }
  });
  onDestroy(() => {
    unmount(modalId);
  });

  function noTransition() {
    return {
      delay: 0,
      duration: 0
    };
  }

  const transitionFns = { blur, fade, fly, scale, slide, none: noTransition };

  $: transitionIn = transitionFns[transitionInFn] || noTransition;
  $: transitionOut = transitionFns[transitionOutFn || transitionInFn] || noTransition;
</script>

<svelte:window on:keydown={handleKeyDown} />
{#if isOpen}
  <div
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200, delay: (transitionOutOptions || transitionInOptions)?.duration }}
    data-testid="modal-wrapper"
    class={cx('modal__overlay', overlayClassName)}
    class:modal__overlay--visible={overlay}
    use:portal={target}
    on:click={handleOverlayClick}
    style="
      --modal-container-z-index: {zIndex + (isActive ? 100 : 0)};
      --modal-z-index: {zIndex + 1 + (isActive ? 100 : 0)};
      --modal-max-width: {maxWidth};
      --modal-bg-color: {bgColor};
      --modal-overlay-color: {overlayColor};
      --modal-margin-top: {marginTop};
      --modal-margin-bottom: {marginBottom};
    "
  >
    <div data-testid="modal-container" class={cx('modal__container', containerClassName)}>
      <div
        in:transitionIn={{ ...transitionInOptions, delay: transitionInOptions?.delay || 50 }}
        out:transitionOut={transitionOutOptions || transitionInOptions}
        data-testid="modal"
        class={cx('modal', className)}
        class:modal--full-height={fullHeight}
        bind:this={modalRef}
      >
        {#if closeOnButton}
          <button class="modal__button" type="button" on:click={handleButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
        <slot {close} />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    --modal-bg-color: var(--color__bg--primary);
    width: 100%;
    max-width: var(--modal-max-width, '600px');
    margin: var(--modal-margin-top, '0px') auto var(--modal-margin-bottom, '0px');
    padding: 64px;
    border-radius: 0;
    background-color: var(--modal-bg-color);
    pointer-events: all;
    position: relative;
    margin-left: 40px;
    margin-right: 40px;

    @include media('<=phone') {
      padding: 0;
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    }

    &--full-height {
      height: calc(100vh - var(--modal-margin-top, '0px') - var(--modal-margin-bottom, '0px'));
      height: calc(100svh - var(--modal-margin-top, '0px') - var(--modal-margin-bottom, '0px'));
      overflow: auto;
    }

    &__container {
      display: flex;
      align-items: var(--modal-align-items, center);
      justify-content: center;
      min-height: 100%;
      position: relative;
      z-index: var(--modal-z-index, 2);
      outline: none;
      pointer-events: none;
    }
    &__overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: var(--modal-container-z-index, 1);
      overflow: auto;
      &--visible {
        background-color: var(--modal-overlay-color, rgba(0, 0, 0, 0.32));

        :global([data-theme='dark']) & {
          background-color: var(--modal-overlay-color, rgba(255, 255, 255, 0.32));
        }
      }
    }
    &__button {
      background-color: transparent;
      border: 0;
      position: absolute;
      right: 72px;
      top: 72px;
      transition: opacity 0.2s;
      padding: 0;
      width: 30px;
      height: 35px;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }

      @include media('<=phone') {
        right: 16px;
        top: 27px;
        margin-right: -6px;
      }

      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
</style>
