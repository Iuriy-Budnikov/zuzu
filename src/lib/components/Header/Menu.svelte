<script>
  import gsap from 'gsap';
  import CustomEase from '$lib/utils/gsap/CustomEase';
  import { scrollToSectionWithGaEvent } from '$lib/utils/scrollUtils';
  import PushLogo from '$lib/elements/Logos/PushLogo.svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';
  import links from './links';
  import { onMount } from 'svelte';

  export let isMenuOpen = false;
  export let onClickBackdropMenu = () => {};
  let logoElement = undefined;
  let navElement = undefined;
  let backdropElement = undefined;
  const ease = CustomEase.create(
    'custom',
    'M0,0 C0.021,0.032 0.082,0.02 0.162,0.03 0.329,0.05 0.342,0.08 0.354,0.104 0.408,0.213 0.498,0.536 0.536,0.8 0.558,0.954 0.78,1 1,1'
  );

  function onClickLink(event) {
    onClickBackdropMenu();
    scrollToSectionWithGaEvent(event);
  }

  function animateMenuIn(node) {
    let tl = gsap.timeline();

    const durationMenu = 0.7;
    const durationLinks = 0.3;
    const durationLogo = 1;
    const durationLinksStagger = 0.08;
    const linksNode = navElement.querySelectorAll('li');
    gsap.set(node, {
      yPercent: -100
    });
    gsap.set(linksNode, {
      opacity: 0,
      y: -10
    });
    gsap.set(logoElement, {
      opacity: 0
    });
    gsap.set(backdropElement, {
      opacity: 0
    });

    tl.to(node, {
      duration: durationMenu,
      yPercent: 0,
      ease,
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

    gsap.to(
      logoElement,
      {
        duration: durationLogo,
        opacity: 1
      },
      '<35%'
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

  onMount(() => {
    gsap.registerPlugin(CustomEase);
  });
</script>

{#if isMenuOpen}
  <MediaQuery query="(max-width: 1024px)" let:matches>
    {#if matches}
      <div class="menu" in:animateMenuIn out:animateMenuOut>
        <div class="menu__logo" bind:this={logoElement}><PushLogo /></div>
        <nav class="menu__nav" bind:this={navElement}>
          <ul class="menu__ul">
            {#each links as item}
              <li class="menu__li">
                <a class="menu__a" on:click={onClickLink} href={`#${item.id}`}>{item.title}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
      <div class="menu__backdrop" bind:this={backdropElement} on:click={onClickBackdropMenu} />
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
    max-height: 520px;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    &__backdrop {
      background-color: var(--color__bg--primary);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      opacity: 0.5;
    }
    &__logo {
      display: none;
    }
    &__nav {
      width: 100%;
    }
    &__ul {
      text-align: right;
      padding: 0 5%;

      li {
        margin-bottom: 15px;
        a {
          font-size: 30px;
          color: var(--color__text--primary);
        }
      }
    }
  }
</style>
