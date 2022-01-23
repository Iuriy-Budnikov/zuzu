<script>
  import Link from '$lib/elements/Link/Link.svelte';
  import Section from '../../elements/Section/Section.svelte';
  import { dispatchEvent } from '$lib/utils/gaUtils';
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  import FlatStudioLogo from '$lib/elements/Logos/FlatStudioLogo.svelte';

  const imagePath = '/images/partner/';

  function onClick() {
    dispatchEvent('click', {
      section: 'partner',
      target: 'flatstudio'
    });
  }
</script>

<Section
  description="Flatstudio. A creative agency built to lift-off modern brands to a new level arrow. We are one of the leading digital & mobile agencies in Portugal"
  id="partner"
  isSecondary
  isPartner={true}
  title="Design partner"
>
  <div class="partner">
    <div class="partner__container">
      <div class="partner__logo">
        <FlatStudioLogo />
      </div>
      <p>
        We create digital services. Detail investigation, intuitive design and high quality
        development let us answer to all client's requests and create in-demand product. We believe
        that in-depth understanding of user’s needs is part of the design process.
      </p>
      <Link class="link" href="https://flatstudio.co" target="_blank" {onClick}>Explore More</Link>
    </div>
    <ImageLoader
      alt="Flatstudio Services"
      height={280}
      sourceSrcSet={`${imagePath}figure.webp, ${imagePath}figure@2x.webp 2x`}
      src={`${imagePath}figure.png`}
      srcset={`${imagePath}figure.png, ${imagePath}figure@2x.png 2x`}
      width={280}
    />
  </div>
</Section>

<style lang="scss">
  .partner {
    background-color: var(--color__bg--primary);
    padding: 80px;
    display: flex;
    justify-content: space-between;

    @include media('<=tablet') {
      padding: 40px;
    }

    @include media('<=phone') {
      flex-direction: column-reverse;
      padding: 5%;
    }
    &__container {
      padding-right: 40px;
      flex-shrink: 2;

      @include media('<=phone') {
        padding: 40px 0 0 0;
      }
      p {
        margin-bottom: 24px;
        max-width: 500px;
      }
    }
    &__logo {
      margin-bottom: 24px;
    }
  }
</style>
