<script>
  export let link = '';
  export let className = '';
</script>

<a href={link} class="social-contact {className}" rel="noopener noreferrer" target="_blank">
  <slot />
</a>

<style lang="scss">
  .social-contact {
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: background-color 0.2s;
    margin: 0 10px;

    &:hover {
      background-color: #dedfe1;
    }

    @include media('<=phone') {
      margin: 0 5px;
    }
  }
</style>
