<script>
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  import Link from '$lib/elements/Link/Link.svelte';
  import { dispatchEvent } from '$lib/utils/gaUtils';

  export let activeProject = {
    country: '',
    description: '',
    key: '',
    title: '',
    url: ''
  };
  $: ({ country, description, key, title, url } = activeProject);
  $: imagePath = '/images/projects/' + key;

  function onClick() {
    dispatchEvent('click', {
      section: 'projects',
      target: key
    });
  }
</script>

<div class="active-project">
  <div class="active-project__container">
    {#if key}
      <div class="active-project__image">
        <a
          class="active-project__url"
          href={url}
          target="_blank"
          on:click={onClick}
          rel="noreferrer noopener"
        >
          <ImageLoader
            alt={title}
            height={327}
            sourceSrcSet={`${imagePath}_tile.webp, ${imagePath}_tile@2x.webp 2x`}
            src={`${imagePath}_tile.png`}
            srcset={`${imagePath}_tile.png, ${imagePath}_tile@2x.png 2x`}
            width={582}
          />
        </a>
      </div>
    {/if}
    <div class="active-project__wrap">
      {#if country}
        <p class="active-project__country">{country}</p>
      {/if}
      {#if title}
        <h3 class="active-project__title">{title}</h3>
      {/if}
      {#if description}
        <p class="active-project__description">{description}</p>
      {/if}
      {#if url}
        <div class="active-project__url">
          <Link href={url} target="_blank" {onClick} rel="noreferrer noopener">Visit Live Site</Link>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .active-project {
    margin: 0 -40px;

    @include media('<=phone') {
      margin: 0;
    }
    &__title {
      font-size: 28px;
      line-height: 36px;
      padding: 12px 0;

      @include media('<=phone') {
        font-size: 22px;
        line-height: 31px;
      }
    }
    &__container{
      display: flex;
      justify-content: space-between;
      margin: 0 -20px;

      @include media('<=phone') {
        margin: 0;
        flex-direction: column;
      }
    }
    &__image {
      width: 50%;
      padding: 0 20px;

      @include media('<=phone') {
        width: 100%;
        margin-bottom: 20px;
        padding: 0;
      }
    }
    &__wrap{
      width: 50%;
      padding: 0 20px;

      @include media('<=phone') {
        width: 100%;
        padding: 0;
      }
    }
    &__description {
      margin-bottom: 28px;

      @include media('<=1280px') {
        padding-right: 30px;
      }

      @include media('<=phone') {
        padding: 0;
      }
    }
    &__country{
      color: var(--color__text--neutral);
      font-size: 16px;
      line-height: 24px;
    }
    &__url {
      :global(img) {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
