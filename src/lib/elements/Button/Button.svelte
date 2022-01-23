<script>
  export let className = '';
  export let disabled = false;
  export let type = 'button';
  export let onClick = undefined;
</script>

<button class="button {className}" {type} {disabled} on:click={onClick}>
  <span class="button__text"><slot /></span>
  <span class="button__circle">
    <i class="button__icon">
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
</button>

<style lang="scss">
  .button {
    font-family: var(--type__primary);
    display: inline-flex;
    border-radius: 30px;
    border: 0;
    padding: 0 36px;
    padding: 0 40px;
    margin: 0;
    outline: none;
    text-decoration: none;
    height: 48px;
    position: relative;
    z-index: 1;
    pointer-events: all;
    background: none;
    backface-visibility: hidden;
    cursor: pointer;
    font-weight: 600;
    .button__circle {
      transition: width 200ms;
      backface-visibility: hidden;
    }
    .button__text {
      transition: transform 0.2s;
      backface-visibility: hidden;
    }
    .button__icon {
      transition: transform 0.2s;
      backface-visibility: hidden;
    }
    &__text {
      color: var(--color__text--primary);
      display: inline-block;
      position: relative;
      z-index: 2;
      font-size: 13px;
      line-height: 14px;
      text-transform: uppercase;
      white-space: nowrap;
      left: 0;
      padding: 17px 0 0;
    }
    &__icon {
      position: absolute;
      left: 20px;
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
      left: 0;
      backface-visibility: hidden;
    }
    &:hover {
      .button__circle {
        width: 100%;
      }
      .button__icon {
        transform: translateX(9px);
      }
      .button__text {
        transform: translateX(9px);
      }
    }
  }
</style>
