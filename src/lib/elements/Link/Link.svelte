<svelte:options accessors />

<script>
  export let className = '';
  export let href = '';
  export let onClick = undefined;
  export let rel = undefined;
  export let target = undefined;
  export let linkElement;
</script>

<a class="link {className}" {href} {target} on:click={onClick} {rel} bind:this={linkElement}>
  <span class="link__text text"><slot /></span>
  <span class="link__circle circle">
    <i class="link__icon">
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.626145 13.0401C0.235621 12.6496 0.235621 12.0164 0.626145 11.6259L5.25237 6.99967L0.626145 2.37345C0.23562 1.98292 0.23562 1.34976 0.626145 0.959234C1.01667 0.568709 1.64983 0.568709 2.04036 0.959234L7.37369 6.29257C7.76422 6.68309 7.76422 7.31626 7.37369 7.70678L2.04036 13.0401C1.64983 13.4306 1.01667 13.4306 0.626145 13.0401Z"
          fill="#111111"
        />
      </svg>
    </i>
  </span>
</a>

<style lang="scss">
  .link {
    display: inline-flex;
    border-radius: 30px;
    border: 0;
    padding: 0 40px;
    margin: 0 0 0 -40px;
    outline: none;
    text-decoration: none;
    color: var(--color__text--primary);
    height: 48px;
    position: relative;
    z-index: 1;
    pointer-events: all;
    background: none;
    backface-visibility: hidden;
    cursor: pointer;
    font-weight: 600;
    .link__circle {
      transition: width 200ms;
      backface-visibility: hidden;
    }
    .link__text {
      transition: transform 0.2s;
      backface-visibility: hidden;
    }
    .link__icon {
      transition: transform 0.2s;
      backface-visibility: hidden;
    }
    &__text {
      display: inline-block;
      position: relative;
      z-index: 2;
      font-size: 13px;
      line-height: 14px;
      text-transform: uppercase;
      white-space: nowrap;
      right: 0;
      padding: 17px 0 0;
    }
    &__icon {
      position: absolute;
      right: 20px;
      top: 17px;
      z-index: 2;
      font-size: 0;
      line-height: 0;
      svg {
        display: block;
        @media (prefers-color-scheme: dark) {
          path {
            fill: #fff;
          }
        }
      }
    }
    &__circle {
      display: inline-block;
      text-align: center;
      background: var(--color__bg--neutral);
      width: 48px;
      height: 48px;
      border-radius: 30px;
      position: absolute;
      top: 0;
      right: 0;
      backface-visibility: hidden;
    }
    &:hover {
      .link__circle {
        width: 100%;
      }
      .link__icon {
        transform: translateX(-9px) !important;
      }
      .link__text {
        transform: translateX(-9px) !important;
      }
    }
  }
</style>
