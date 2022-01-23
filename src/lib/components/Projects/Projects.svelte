<script>
  import Section from '../../elements/Section/Section.svelte';
  import ProjectsList from './ProjectsList.svelte';
  import ActiveProject from './ActiveProject.svelte';
  import projects from './projects';
  let activeProject = projects[0];
  function onClickProject(e, { project }) {
    activeProject = project;
  }
</script>

<Section
  description="<b>What are we doing?</b> Layout and frontend-from simple pages to large services. We select the optimal team for the complexity of the task."
  isProjects={true}
  id="projects"
  title="Projects"
>
  <ProjectsList {activeProject} {projects} {onClickProject} />
  <ActiveProject {activeProject} />
</Section>
