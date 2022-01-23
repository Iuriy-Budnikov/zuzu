<script>
  import Link from '$lib/elements/Link/Link.svelte';
  import { scrollToSectionWithGaEvent } from '$lib/utils/scrollUtils';
  import Section from '$lib/elements/Section/Section.svelte';
  import TagList from '$lib/elements/Tag/TagList.svelte';
  import Tag from '$lib/elements/Tag/Tag.svelte';
</script>

<Section>
  <div class="get-in-touch">
    <h2>Reasons to join our team, and become the best version of yourself 💣</h2>
    <Link class="link" href="#contact-form" onClick={scrollToSectionWithGaEvent}>Get In Touch</Link>
  </div>
  <TagList>
    <Tag title="Training" />
    <Tag title="Career development" />
    <Tag title="Cookie" />
    <Tag title="Luxury office" />
    <Tag title="Comfortable chair" />
    <Tag title="High income" />
    <Tag title="Valuable experience" />
    <Tag title="Recreation room" />
    <Tag title="KingsleyRowe" />
    <Tag title="Coat Zone" />
    <Tag title="Graphene" />
  </TagList>
</Section>

<style lang="scss">
  .get-in-touch {
    text-align: center;
    margin-bottom: 40px;
    h2 {
      max-width: 750px;
      margin: 0 auto 24px;
      text-align: center;
    }
  }
</style>
