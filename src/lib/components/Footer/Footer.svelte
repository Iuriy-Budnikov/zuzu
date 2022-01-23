<script>
  let year = new Date().getFullYear();
  import PushLogo from '$lib/elements/Logos/PushLogo.svelte';
  import { dispatchEvent } from '$lib/utils/gaUtils';

  function onClickPartner() {
    dispatchEvent('click', {
      section: 'footer',
      target: 'flatstudio'
    });
  }
</script>

<div class="footer-substrate" />
<footer class="footer">
  <div class="footer__wrapper footer-color">
    <div class="footer__shadow shadow-color" />
    <div class="footer__container">
      <div class="footer__left">
        <PushLogo />
        <p>Are a team of award-winning developers | <span>{year}</span></p>
      </div>
    </div>
    <div class="footer__bg" />
  </div>
</footer>

<style lang="scss">
  .footer-substrate {
    height: 107px;

    @include media('<=phone') {
      height: 164px;
    }
  }
  .footer {
    overflow: hidden;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 107px;

    @include media('<=phone') {
      height: 164px;
    }
    &__wrapper {
      position: relative;
      background-color: var(--color__bg--primary);
      height: 100%;
    }

    &__shadow {
      position: absolute;
      left: 0;
      top: -108px;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 108px;
      box-shadow: 0 40px 80px 0 rgb(10 10 10 / 20%);
    }
    &__bg {
      background-color: rgba(210, 220, 223, 0.18);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        background-color: rgba(44, 44, 46, 0.18);
      }
    }
    &__container {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 16px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 107px;
      z-index: 1;

      @include media('<=phone') {
        padding: 39px 5%;
        flex-direction: column;
        height: 164px;
      }
      p {
        color: #9598a2;
        font-size: 14px;
        line-height: 21px;
      }
    }
    &__left {
      display: flex;
      align-items: center;

      @include media('<=phone') {
        flex-direction: column;
      }
      p {
        padding-left: 17px;

        @include media('<=phone') {
          padding-left: 0;
        }
      }
    }
  }
</style>
