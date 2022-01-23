<script>
  export let isSecondary = undefined;
  export let isThird = undefined;
  export let isNeutral = undefined;
</script>

<div
  class="section-background"
  class:section-background--secondary={isSecondary}
  class:section-background--third={isThird}
  class:section-background--neutral={isNeutral}
>
  <slot />
</div>

<style lang="scss">
  .section-background {
    background-color: var(--color__bg--primary);

    &--secondary {
      background: var(--color__bg--secondary);
    }
    &--third {
      background: var(--color__bg--third);
    }
    &--neutral {
      background: var(--color__bg--neutral);
    }
  }
</style>
