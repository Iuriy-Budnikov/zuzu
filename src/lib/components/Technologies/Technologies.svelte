<script>
  import Section from '../../elements/Section/Section.svelte';
  import Technology from './Technology.svelte';
  import TechnologyList from './TechnologyList.svelte';
  import Icon from '../../elements/Icon/Icon.svelte';
</script>

<Section
  description="<b>What are we doing?</b> Layout and frontend-from simple pages to large services. We select the optimal team for the complexity of the task."
  id="technologies"
  title="Technologies"
  isTechnologies={true}
>
  <TechnologyList>
    <Technology title="Backend development">
      Push is a polyglot team with an opinionated language and framework stack—we use
      <strong><Icon name="ruby" />Ruby</strong> and
      <strong><Icon name="rails" />Rails</strong>,
      <strong><Icon name="elixir" />Elixir</strong> and
      <strong><Icon name="phoenix" />Phoenix</strong>,
      <strong><Icon name="node" />Node.js</strong>.
    </Technology>
    <Technology title="Frontend development">
      For frontend development and building rich web applications, Push use
      <strong><Icon name="js" />JavaScript</strong>,
      <strong><Icon name="ts" />TypeScript</strong>, and a set of open source technologies.
      <strong><Icon name="svelte" />Svelte</strong>,
      <strong><Icon name="vue" />Vue</strong>,
      <strong><Icon name="react" />React</strong>
      with
      <strong><Icon name="redux" />Redux</strong>
      is our framework of choice.
    </Technology>
    <Technology title="Mobile development">
      Push excel at developing
      <strong><Icon name="android" />Android</strong>
      and
      <strong><Icon name="apple" />iOS</strong>
      apps with multi-platform mobile apps with
      <strong><Icon name="react" />React Native</strong>.
    </Technology>
    <Technology title="Audit and optimization">
      Push can review an existing project, look for all possible bottlenecks on all stages of
      product life, from specifications to development to deployment, and come up with a clear set
      of recommendations that will help you to optimize your codebase.
    </Technology>
  </TechnologyList>
</Section>
