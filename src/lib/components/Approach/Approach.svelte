<script>
  import TileList from '$lib/elements/Tile/TileList.svelte';

  import Section from '../../elements/Section/Section.svelte';
  import Tile from '../../elements/Tile/Tile.svelte';
</script>

<Section title="Our approach">
  <TileList>
    <Tile
      description="We assist with or take charge of the software deployment into dedicated devices, controlling and overseeing the process until completion"
      image="🔌"
      title="Discovery Stage"
    />
    <Tile
      description="We assist with or take charge of the software deployment into dedicated devices, controlling and overseeing the process until completion"
      image="🚨"
      title="Development Stage"
    />

    <Tile
      description="We assist with or take charge of the software deployment into dedicated devices, controlling and overseeing the process until completion"
      image="🏔"
      title="Quality Assurance"
    />
    <Tile
      description="We assist with or take charge of the software deployment into dedicated devices, controlling and overseeing the process until completion"
      image="💬"
      title="Deployment Stage"
    />
  </TileList>
</Section>
