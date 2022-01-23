<script>
  export let activeProject = '';
  export let onClickProject = () => {};
  export let project = {};
  const { id, title } = project;
  function onClick(e, options) {
    onClickProject(e, options);
  }
</script>

<div
  class="projects-item"
  class:projects-item--active={activeProject.id === id}
  on:click={(e) => onClick(e, { project })}
>
  {title}
</div>

<style lang="scss">
  .projects-item {
    background-color: #fff;
    border-radius: 100px;
    padding: 12px 24px;
    margin: 0 4px 4px 0;
    color: #9598a2;
    font-family: var(--type__secondary);
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      background-color: var(--color__bg--neutral);
    }

    &--active {
      background-color: var(--color__brand);
      color: #fff;
      cursor: default;
    }
  }
</style>
