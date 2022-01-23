<script>
  import Line from '$lib/elements/Line/Line.svelte';
  import Section from '$lib/elements/Section/Section.svelte';
  import { dispatchEvent } from '$lib/utils/gaUtils';

  function onClickChat() {
    dispatchEvent('click', {
      section: 'contacts',
      target: 'facebook'
    });
  }
  function onClickEmail() {
    dispatchEvent('click', {
      section: 'contacts',
      target: 'email'
    });
  }
  function onClickPhone() {
    dispatchEvent('click', {
      section: 'contacts',
      target: 'phone'
    });
  }
</script>

<Line />
<Section id="contacts">
  <div class="contacts">
    <div class="contacts__box">
      <span>General inquiries —</span>
      <h4>
        <a href="https://www.messenger.com/t/100001920326669" target="_blank" on:click={onClickChat}
          >Quick chat</a
        >
      </h4>
      <a
        class="contacts__message"
        href="https://www.messenger.com/t/100001920326669"
        target="_blank"
        on:click={onClickChat}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 0C4.02944 0 0 3.72998 0 8.33117C0 10.9487 1.30408 13.2842 3.34354 14.8115V18L6.41493 16.3135C7.23372 16.5404 8.10147 16.6623 9 16.6623C13.9706 16.6623 18 12.9323 18 8.33115C18 3.72996 13.9706 0 9 0ZM9.94788 11.1719L7.62017 8.77812L3.13743 11.2322L8.05212 6.06931L10.3799 8.46314L14.8626 6.00903L9.94788 11.1719Z"
            fill=""
          />
        </svg>
        Message on facebook
      </a>
    </div>
    <div class="contacts__box">
      <span>New business —</span>
      <h4>
        <a href="mailto:artem@wearepush.co" target="_blank" on:click={onClickEmail}
          >artem@wearepush.co</a
        >
      </h4>
      <p><a href="tel:+380980584638" on:click={onClickPhone}>+380 980 584 638</a></p>
    </div>
    <div class="contacts__box">
      <span>Office —</span>
      <h4>Kharkiv</h4>
      <p>61052, Kharkiv, Poltavsky Shlyakh, 26, Ukraine</p>
    </div>
  </div>
</Section>

<style lang="scss">
  .contacts {
    display: flex;

    @include media('<=phone') {
      flex-direction: column;
    }

    @include media('<=phone') {
      flex-direction: column;
    }
    &__box {
      width: 33.333%;

      @include media('<=phone') {
        width: 100%;
        margin-bottom: 50px;

        &:last-child {
          margin-bottom: 0;
        }
      }
      & span {
        font-family: var(--type__secondary);
        color: #9598a2;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        margin-bottom: 25px;
        display: block;

        @include media('<=phone') {
          font-size: 11px;
          margin-bottom: 15px;
        }
        @media only screen and (min-width: 0) and (max-width: 320px) {
          margin-bottom: 13px;
        }
      }
      & p,
      & a {
        @include media('<=phone') {
          font-size: 14px;
        }
        &:hover {
          // color: $color-manatee;
        }
      }
      & p > a,
      & p {
        line-height: 24px;
        font-size: 16px;
        color: #9598a2;

        @include media('<=phone') {
          line-height: 22px;
          letter-spacing: -0.8px;
        }
        &:hover {
          // color: $color-manatee;
        }
      }
      & p > a {
        transition: color 0.2s;
        // @include button-transition;
        &:hover {
          // color: $color-manatee;
          color: var(--color__text--primary);
        }
      }
      & p {
        max-width: 240px;
      }
      & h4 {
        margin-bottom: 12px;
        font-size: 22px;
        line-height: 28px;
        font-weight: 700;
      }
      & h4 a {
        font-size: 22px;
        line-height: 28px;
        font-weight: 700;
        display: block;
        color: var(--color__text--primary);
        transition: color 0.2s;

        @include media('<=tablet') {
          font-size: 18px;
          line-height: 22px;
        }

        @include media('<=phone') {
          font-size: 22px;
          line-height: 32px;
          margin-bottom: 14px;
        }
        &:hover {
          color: #9598a2;
        }
      }
    }
    &__message {
      color: #0066cc;
      font-family: var(--type__secondary);
      font-size: 16px;
      line-height: 24px;
      position: relative;
      display: inline-flex;
      align-items: center;
      transition: color 0.2s;
      & > svg {
        fill: #0066cc;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        transition: fill 0.2s;
      }
      &:hover {
        color: var(--color__text--primary);

        svg {
          fill: #111;
          @media (prefers-color-scheme: dark) {
            fill: #fff;
          }
        }
      }
    }
  }
</style>
