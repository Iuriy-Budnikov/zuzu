<script>
  import { page } from '$app/stores';
  import Logo from '$lib/elements/Logos/Logo.svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';
  import Menu from './Menu.svelte';
  import links from './links';

  let isMenuOpen = false;
  function onOpenMenu() {
    isMenuOpen = !isMenuOpen;
  }
  function onClickBackdropMenu() {
    isMenuOpen = false;
  }
</script>

<header class="header">
  <div class="header__logo" id="header-logo">
    {#if $page.url.pathname === '/'}
      <Logo />
    {:else}
      <a href="/"><Logo /></a>
    {/if}
  </div>
  <div class="header__deadzone" />
  <MediaQuery query="(min-width: 1025px)" let:matches>
    {#if matches}
      <nav class="header__nav">
        <ul class="header__ul">
          {#each links as item}
            <li class="header__li">
              {#if $page.url.pathname === `/${item.slug}`}
                <span
                  class="header__a"
                  class:header__a--active={$page.url.pathname.indexOf(`/${item.slug}`) > -1}
                  href={`/${item.slug}/`}>{item.title}</span
                >
              {:else}
                <a
                  class="header__a"
                  class:header__a--active={$page.url.pathname.indexOf(`/${item.slug}`) > -1}
                  href={`/${item.slug}/`}>{item.title}</a
                >
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </MediaQuery>
</header>
<MediaQuery query="(max-width: 1024px)" let:matches>
  {#if matches}
    <div class="header__hamburger">
      <button
        type="button"
        class="header__switch"
        class:header__switch--active={isMenuOpen}
        on:click={onOpenMenu}
      >
        <span />
        <span />
      </button>
    </div>
  {/if}
</MediaQuery>

<Menu {isMenuOpen} {onClickBackdropMenu} />

<style lang="scss">
  .header {
    margin: 0 auto;
    max-width: 1200px;
    padding: 60px 40px 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;

    @include media('<=tablet') {
      padding: 28px 30px 0;
      z-index: 5;
    }
    @include media('<=phone') {
      padding: 28px 5% 0;
    }
    &__logo {
      min-width: 100px;
      pointer-events: all;
    }
    &__deadzone {
      position: absolute;
      top: 65px;
      right: 30px;
      height: 20px;
      width: 576px;
      z-index: 0;
      pointer-events: none;
      background-color: transparent;
      @include media('<=tablet') {
        top: 26px;
        right: 5%;
        height: 34px;
        width: 34px;
        margin-right: -2px;
      }
    }
    &__nav {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
    }
    &__ul {
      display: flex;
      justify-content: flex-end;
      margin: 0 auto;
      max-width: 1200px;
      padding: 0 40px;
    }
    &__li {
      margin: 0 0 0 24px;
    }
    &__a {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: var(--color__text--neutral);
      transition: color 0.2s;
      pointer-events: all;

      &--active,
      &:hover {
        color: var(--color__text--primary);
      }
    }
    &__hamburger {
      position: fixed;
      top: 25px;
      right: 5%;
      width: 30px;
      z-index: 5;
      margin-right: -15px;
    }

    &__switch {
      padding: 0;
      width: 20px;
      height: 30px;
      border: 0;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      width: 30px;
      height: 35px;
      margin: 0;

      span {
        display: block;
        margin: 0 auto;
        width: 18px;
        height: 2px;
        background-color: var(--color__text--primary);
        transform-origin: 50% 50%;
        transition: all 0.5s ease;

        &:first-child {
          margin-bottom: 7px;
        }

        &:last-child {
          margin-top: 6px;
        }
      }
      &--active span {
        &:first-child {
          margin-bottom: -2px;
          transform: rotate(45deg);
        }

        &:last-child {
          margin-top: -2px;
          transform: rotate(-45deg);
        }
      }
    }
  }
</style>
