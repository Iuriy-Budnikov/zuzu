<script>
  import { onMount } from 'svelte';
  import Section from '../../elements/Section/Section.svelte';
  let containerElement = undefined;
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  const slides = [...Array(9).keys()];
  const imagePath = '/images/office/office_';

  onMount(async () => {
    const { tns } = await import('tiny-slider');
    const slider = tns({
      autoplay: false,
      container: containerElement,
      controls: false,
      edgePadding: 118,
      gutter: 40,
      items: 3,
      loop: false,
      mouseDrag: true,
      nav: false,
      responsive: {
        100: {
          items: 1,
          gutter: 20,
          edgePadding: 59
        },
        767: {
          items: 1
        },
        1024: {
          items: 2
        },
        1240: {
          items: 2,
          edgePadding: 118,
          gutter: 40
        },
        1921: {
          items: 3
        }
      },
      slideBy: 'page',
      startIndex: 1,
      swipeAngle: false
    });

    return () => {
      slider.destroy();
    };
  });
</script>

<Section
  description="<b>What are we doing?</b> Layout and frontend-from simple pages to large services. We select the optimal team for the complexity of the task."
  id="about"
  isAbout={true}
  title="About"
/>
<div class="about" bind:this={containerElement}>
  {#each slides as slide}
    <ImageLoader
      alt={`Office Push ${slide + 1}`}
      className="about__image"
      height={498}
      sourceSrcSet={`${imagePath}${slide + 1}.webp, ${imagePath}${slide + 1}@2x.webp 2x`}
      src={`${imagePath}${slide + 1}.png`}
      srcset={`${imagePath}${slide + 1}.png, ${imagePath}${slide + 1}@2x.png 2x`}
      width={880}
    />
  {/each}
</div>

<style lang="scss">
  :global {
    .about {
      min-height: 300px;

      @include media('<=phone') {
        min-height: 1px;
      }
      &__image {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
