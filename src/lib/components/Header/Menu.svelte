<script>
  import { page } from '$app/stores';
  import gsap from 'gsap';
  import { createEventDispatcher } from 'svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';
  import links from './links';

  export let isMenuOpen = false;
  let navElement = undefined;
  let backdropElement = undefined;

  const dispatch = createEventDispatcher();

  function onClickLink() {
    onClickBackdropMenu();
  }
  function onClickBackdropMenu() {
    dispatch('clickBackdrop');
  }

  function animateMenuIn(node) {
    let tl = gsap.timeline();

    const durationMenu = 0.35;
    const durationLinks = 0.25;
    const durationLinksStagger = 0.08;
    const linksNode = navElement.querySelectorAll('li');
    gsap.set(node, {
      yPercent: -100
    });
    gsap.set(linksNode, {
      opacity: 0,
      y: -10
    });
    gsap.set(backdropElement, {
      opacity: 0
    });

    tl.to(node, {
      duration: durationMenu,
      yPercent: 0,
      force3D: true
    });

    tl.to(
      backdropElement,
      {
        duration: durationMenu,
        opacity: 0.5
      },
      '<55%'
    );

    tl.to(
      linksNode,
      {
        duration: durationLinks,
        opacity: 1,
        y: 0,
        ease: 'power1.easeOut',
        stagger: durationLinksStagger,
        force3D: true
      },
      '<60%'
    );

    return {
      /* GSAP's duration is in seconds. Svelte's is in miliseconds */
      duration: tl.duration() * 1000,
      tick: (t) => {
        tl.progress(t);
      }
    };
  }

  function animateMenuOut(node) {
    const duration = 0.3;
    let tl = gsap.timeline();

    tl.to(node, {
      duration,
      yPercent: -100,
      ease: 'power2.easeOut'
    });
    tl.to(
      backdropElement,
      {
        duration,
        opacity: 0
      },
      '<0%'
    );
    return {
      /* GSAP's duration is in seconds. Svelte's is in miliseconds */
      duration: tl.duration() * 1000,
      tick: (t, u) => {
        tl.progress(u);
      }
    };
  }
</script>

{#if isMenuOpen}
  <MediaQuery query="(max-width: 1024px)" let:matches>
    {#if matches}
      <div class="menu" in:animateMenuIn out:animateMenuOut>
        <nav class="menu__nav" bind:this={navElement}>
          <ul class="menu__ul">
            {#each links as item}
              <li class="menu__li">
                <a
                  class="menu__a"
                  class:menu__a--active={$page.url.pathname === `/${item.slug}`}
                  on:click={onClickLink}
                  href={`/${item.slug}`}
                >
                  {item.title}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
      <div
        class="menu__backdrop"
        bind:this={backdropElement}
        on:click={onClickBackdropMenu}
        role="presentation"
      />
    {/if}
  </MediaQuery>
{/if}

<style lang="scss">
  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 4;
    width: 100%;
    background-color: var(--color__bg--primary);
    margin: 0 auto;
    padding: 70px 0 15px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    overflow: auto;
    max-height: 320px;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    &__backdrop {
      background-color: var(--color__dark);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      opacity: 0.5;
    }
    &__nav {
      width: 100%;
    }
    &__ul {
      text-align: right;
      padding: 0 5%;

      li {
        margin-bottom: 15px;
      }
    }

    &__a {
      font-size: 30px;
      color: var(--color__text--primary);
      border-bottom: 0;

      &--active {
        pointer-events: none;
      }

      &--active,
      &:hover {
        color: var(--color__link);
      }
    }
  }
</style>
