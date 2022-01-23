<script context="module">
	export const prerender = true;
</script>
<script>
  import Services from '$lib/components/Services/Services.svelte';
  import Team from '$lib/components/Team/Team.svelte';
  import Technologies from '$lib/components/Technologies/Technologies.svelte';
  import Projects from '$lib/components/Projects/Projects.svelte';
  import About from '$lib/components/About/About.svelte';
  import Approach from '$lib/components/Approach/Approach.svelte';
  import GetInTouch from '$lib/components/GetInTouch/GetInTouch.svelte';
  import Partner from '$lib/components/Partner/Partner.svelte';
  import ContactForm from '$lib/components/ContactForm/ContactForm.svelte';
  import Contacts from '$lib/components/Contacts/Contacts.svelte';
  import Company from '$lib/components/Company/Company.svelte';
  import Project from '$lib/components/Project/Project.svelte';
  import SectionBackground from '$lib/elements/Section/SectionBackground.svelte';
  import Line from '$lib/elements/Line/Line.svelte';
</script>

<svelte:head>
  <title>Zuzu | Travel Agency</title>
  <meta name="description" content="" />
</svelte:head>

<Company />
<Project />
<SectionBackground isSecondary>
  <Team />
  <Services />
  <Technologies />
</SectionBackground>
<SectionBackground isSecondary>
  <Projects />
  <About />
  <Approach />
  <Line />
  <GetInTouch />
</SectionBackground>
<SectionBackground isSecondary>
  <Partner />
  <ContactForm />
</SectionBackground>
<SectionBackground isThird>
  <Contacts />
</SectionBackground>
