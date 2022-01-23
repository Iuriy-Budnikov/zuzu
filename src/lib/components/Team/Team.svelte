<script>
	import Section from '../../elements/Section/Section.svelte';
</script>

<Section isTeam={true}>
	<div class="team">
		<div class="team__item">
			<div class="team__box">
				<h3>Remote team</h3>
				<p>We have a great dedicated devops team with 24/7 support. We can configure alerts, tests, reports for your servers and make sure they are always up and running.</p>
				<ul>
					<li>Key tag</li>
					<li>Key tag</li>
					<li>Key tag</li>
				</ul>
			</div>
		</div>
		<div class="team__item">
			<div class="team__box">
				<h3>R&D Office</h3>
				<p>We have a great dedicated devops team with 24/7 support. We can configure alerts, tests, reports for your servers and make sure they are always up and running.</p>
				<ul>
					<li>Key tag</li>
					<li>Key tag</li>
					<li>Key tag</li>
				</ul>
			</div>
		</div>
	</div>
</Section>

<style lang="scss">
	.team{
		display: flex;
		justify-content: space-between;
		margin: -208px -60px 0;

		@include media('<=phone') {
			flex-direction: column;
			margin: -208px 0 0;
		}

		&__item{
			width: 50%;
			padding: 0 20px;

			@include media('<=phone') {
				width: 100%;
				margin-bottom: 20px;
				padding: 0;
			}
		}
		&__box{
			padding: 40px;
			background: var(--color__bg--primary);
			
			@include media('<=phone') {
				padding: 5%;
			}
			h3{
				font-size: 28px;
				line-height: 36px;
				font-weight: 700;
				margin-bottom: 12px;

				@include media('<=phone') {
					font-size: 22px;
					line-height: 31px;
				}
			}
			p{
				margin-bottom: 20px;
			}
		}
		ul{
			display: flex;
			flex-wrap: wrap;
			li{
				background: var(--color__bg--neutral);
				border-radius: 100px;
				padding: 8px 12px;
				font-size: 13px;
				line-height: 20px;
				font-weight: 600;
				text-transform: uppercase;
				color: var(--color__text--neutral);
				margin: 4px 4px 0 0;
			}
		}
	}
</style>
