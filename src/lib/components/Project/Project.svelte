<script>
  import gsap from 'gsap';
  import { onDestroy } from 'svelte';
  import projects from '$lib/components/Projects/projects';
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  import { dispatchEvent } from '$lib/utils/gaUtils';
  import { animationStore } from '$lib/stores/animation';
  const index = Math.floor(Math.random() * projects.length);
  const project = projects[index];
  const { key, title, url } = project;
  const imagePath = '/images/projects/' + key;
  let imageContainerElement = undefined;

  function animateIn() {
    let tl = gsap.timeline();
    const durationImage = 0.35;
    const imageElement = imageContainerElement.querySelector('img');

    gsap.set(imageElement, {
      y: 30,
      force3D: true
    });

    tl.to(imageElement, {
      duration: durationImage,
      opacity: 1,
      y: 0
    });
  }

  const unsubscribe = animationStore.subscribe((value) => {
    if (value.companyAnimationComplete) {
      animateIn();
    }
  });

  onDestroy(unsubscribe);

  function onClick() {
    dispatchEvent('click', {
      section: 'project',
      target: key
    });
  }
</script>

<section class="project">
  <div class="project__container">
    <a class="project__url" href={url} target="_blank" on:click={onClick} rel="noreferrer noopener">
      <div class="project__image" bind:this={imageContainerElement}>
        <ImageLoader
          alt={title}
          height={585}
          sourceSrcSet={`${imagePath}_cover.webp, ${imagePath}_cover@2x.webp 2x`}
          src={`${imagePath}_cover.png`}
          srcset={`${imagePath}_cover.png, ${imagePath}_cover@2x.png 2x`}
          width={1240}
        />
      </div>
    </a>
  </div>
</section>

<style lang="scss">
  .project {
    background: var(--color__bg--primary);
    &__container {
      margin: 0 auto 208px;
      max-width: 1250px;
      padding: 0;
      filter: drop-shadow(0px 40px 60px rgba(83, 88, 93, 0.2));
    }
    &__image {
      padding-bottom: 46.8%;
      height: 0;

      :global(img) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
      }
      :global(.img) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      :global(picture) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
