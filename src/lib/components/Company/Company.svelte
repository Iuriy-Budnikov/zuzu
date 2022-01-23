<script>
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import Link from '$lib/elements/Link/Link.svelte';
  import { scrollToSectionWithGaEvent } from '$lib/utils/scrollUtils';
  import Section from '$lib/elements/Section/Section.svelte';
  import SplitText from '$lib/elements/Text/SplitText.svelte';
  import { completeCompanyAnimation } from '$lib/stores/animation';
  export let dead_zones = [];
  let companyElement;

  function animateIn(node) {
    let tl = gsap.timeline();

    const durationTitle = 0.6;
    const durationTitleStagger = 0.3;
    const durationSubTitle = 1;
    const durationSubTitleStagger = 0.1;
    const durationDescription = 0.7;
    const durationPlaceholder = 0.5;
    const durationLink = 0.3;
    const titleNodes = node.querySelectorAll('.js-title span');
    const subTitleNodes = node.querySelectorAll('.js-sub-title span');
    const descriptionNode = node.querySelector('.js-descripton-text');
    const descriptionPlaceholderNode = node.querySelector('.js-descripton-placeholder');
    const linkNode = node.querySelector('a');
    const linkCircleNode = linkNode.querySelector('.circle');
    const linkTextNode = linkNode.querySelector('.text');

    gsap.set(titleNodes, {
      y: 30,
      opacity: 0
    });

    gsap.set(subTitleNodes, {
      y: 25,
      opacity: 0
    });

    gsap.set(descriptionNode, {
      opacity: 0
    });

    gsap.set(descriptionPlaceholderNode, {
      yPercent: -100,
      force3D: true
    });

    gsap.set(linkCircleNode, {
      scale: 0,
      force3D: true
    });

    gsap.set(linkTextNode, {
      opacity: 0,
      x: -20,
      force3D: true
    });

    tl.to(titleNodes, {
      delay: 0.25,
      duration: durationTitle,
      y: 0,
      opacity: 1,
      stagger: durationTitleStagger,
      ease: 'power1.easeOut',
      force3D: true,
      onComplete: () => {
        initDots = true;
      }
    });

    tl.to(
      subTitleNodes,
      {
        duration: durationSubTitle,
        y: 0,
        opacity: 1,
        stagger: durationSubTitleStagger,
        ease: 'power1.easeOut',
        force3D: true
      },
      '<50%'
    );

    tl.to(
      descriptionPlaceholderNode,
      {
        duration: durationPlaceholder,
        yPercent: 200,
        ease: 'power2.easeInOut',
        force3D: true,
        onComplete: () => {
          completeCompanyAnimation();
        }
      },
      '<55%'
    );

    tl.to(
      descriptionNode,
      {
        duration: durationDescription,
        opacity: 1
      },
      '<55%'
    );

    tl.to(
      linkCircleNode,
      {
        duration: durationLink,
        scale: 1,
        ease: 'power1.easeIn',
        force3D: true
      },
      '<0%'
    );
    tl.to(
      linkTextNode,
      {
        duration: durationLink,
        x: 0,
        opacity: 1,
        ease: 'power1.easeIn',
        force3D: true
      },
      '<-50%'
    );
  }

  onMount(() => {
    dead_zones = [
      ...dead_zones,
      document.getElementById('header-logo'),
      document.getElementById('header-links')
    ];
    animateIn(companyElement);
  });
</script>

<div class="company" bind:this={companyElement}>
  <Section>
    <div class="company__container">
      <div class="company__header">
        <h1 class="company__title js-title" bind:this={dead_zones[0]}>
          <SplitText text="Digital Agency" />
        </h1>
        <h2 class="company__sub-title js-sub-title" bind:this={dead_zones[1]}>
          <SplitText text="Your software development partner in Eastern Europe" />
        </h2>
        <div class="company__descripton" bind:this={dead_zones[2]}>
          <div class="company__placeholder js-descripton-placeholder" />
          <p class="js-descripton-text">
            <SplitText
              text="Push works works hard to develop E-commerce, SaaS, Marketplace, Healthcare, FinTech, Gambling projects that win awards, drive customer sales and generate a solid return on your investment."
            />
          </p>
        </div>
      </div>
      <div class="company__link" bind:this={dead_zones[3]}>
        <Link href="#contact-form" onClick={scrollToSectionWithGaEvent}>Contact Us</Link>
      </div>
    </div>
  </Section>
</div>

<style lang="scss">
  .company {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 500px;
    background: var(--color__bg--primary);
    pointer-events: none;
    padding-top: 169px;

    @include media('<=tablet') {
      padding: 80px 0 0;
    }
    &__container {
      pointer-events: none;
      display: flex;
      align-items: flex-end;

      @include media('<=phone') {
        flex-direction: column;
      }
    }
    &__header {
      max-width: 843px;
      margin-right: 98px;

      @include media('<=phone') {
        margin: 0;
      }
    }
    &__link {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      margin-left: -7px;
      min-width: 180px;
      padding-right: 10px;

      @include media('<=phone') {
        margin-top: 24px;
      }
    }

    &__title,
    &__sub-title,
    &__descripton {
      pointer-events: all;
    }

    &__sub-title {
      font-size: 44px;
      margin-bottom: 16px;
    }

    &__title,
    &__sub-title {
      @include media('<=phone') {
        font-size: 34px;
        line-height: 40px;
      }
    }

    &__descripton {
      position: relative;
      overflow: hidden;
      @include media('<=phone') {
        display: none;
      }

      p {
        position: relative;
        z-index: 0;
      }
    }
    &__placeholder {
      @include placeholder();
      @include media('<=phone') {
        display: none;
      }
    }
  }
</style>
