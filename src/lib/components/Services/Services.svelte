<script>
	import Section from '../../elements/Section/Section.svelte';
	import TileList from '$lib/elements/Tile/TileList.svelte';
	import Tile from '../../elements/Tile/Tile.svelte';
</script>

<Section
	description="<b>What are we doing?</b> Layout and frontend-from simple pages to large services. We select the optimal team for the complexity of the task."
	id="services"
	isServices={true}
	title="Services"
>
	<TileList>
		<Tile
			description="We build a team of professional engineers around your project. We work only with you, take part in scrum meetings, consult and share our expertise with the rest of your team. In other words, we work as your employees, but from our office."
			image="🔌"
			title="Dedicated teams for long term projects"
		/>
		<Tile
			description="Best fit for the marketing websites and any other projects with a quick turn around. In this case, you need to send us your idea, wireframes or ready-to-go designs and we can start it from there. Project management, QA, deploys, domain buys, SSL-certs on us. "
			image="🚨"
			title="Teams for short term projects"
		/>
		<Tile
			description="We support all the projects we participated in. We do this on a request basis. No annual fees"
			image="🏔"
			title="Maintenance"
		/>
		<Tile
			description="We have a great dedicated devops team with 24/7 support. We can configure alerts, tests, reports for your servers and make sure they are always up and running."
			image="💬"
			title="DevOPS"
		/>
		<Tile
			description="We have experienced engineers who can make a performance review for your projects. We can advise or implement the latest solutions to make your applications fast and furious 😉"
			image="👁"
			title="Performance review"
		/>
	</TileList>
</Section>
