<script>
  import ProjectsItem from './ProjectsItem.svelte';
  export let projects = [];
  export let activeProject = {};
  export let onClickProject = () => {};
</script>

<div class="projects-list">
  {#each projects as project}
    <ProjectsItem {activeProject} {project} {onClickProject} />
  {/each}
</div>

<style lang="scss">
  .projects-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 80px;
  }
</style>
