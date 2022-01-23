<script>
  export let description = undefined;
  export let id = undefined;
  export let title = undefined;
  export let isSecondary = undefined;
  export let isProjects = undefined;
  export let isAbout = undefined;
  export let isPartner = undefined;
  export let isTeam = undefined;
  export let isTechnologies = undefined;
  export let isServices = undefined;
  export let isContactForm = undefined;
</script>

<section
  class="section"
  class:section--secondary={isSecondary}
  class:section--is-projects={isProjects}
  class:section--is-about={isAbout}
  class:section--is-partner={isPartner}
  class:section--is-team={isTeam}
  class:section--is-technologies={isTechnologies}
  class:section--is-services={isServices}
  class:section--is-contact={isContactForm}
  {id}
>
  {#if title || description}
    <div class="section__header">
      {#if title}
        <h2>{title}</h2>
      {/if}
      {#if description}
        <p>{@html description}</p>
      {/if}
    </div>
  {/if}
  <slot />
</section>

<style lang="scss">
  .section {
    margin: 0 auto;
    max-width: 1200px;
    padding: 80px 40px;
    position: relative;
    width: 100%;
    &--secondary {
      max-width: 1320px;
    }
    &--is-projects,
    &--is-about,
    &--is-services {
      padding-top: 160px;
      padding-bottom: 0;
    }
    &--is-technologies {
      padding-top: 160px;
    }
    &--is-team {
      padding-bottom: 0;
    }

    &--is-partner {
      padding-top: 160px;
      max-width: 1280px;
      .section__header{
        padding-left: 40px;
        padding-right: 40px;

        @include media('<=phone') {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 0 0 80px;

      @include media('<=phone') {
        flex-direction: column;
        padding: 0 0 40px;
      }
      h2 {
        padding-right: 20px;

        @include media('<=phone') {
          padding-right: 0;
          font-size: 22px;
          margin-bottom: 12px;
        }
      }
      p {
        padding-left: 20px;

        @include media('<=phone') {
          padding-left: 0;
          font-size: 16px;
        }
      }
      p,
      h2 {
        width: 50%;
        @include media('<=phone') {
          width: 100%;
        }
      }
    }

    @include media('<=tablet') {
      padding: 80px 30px;
    }

    @include media('<=phone') {
      padding: 60px 5%;
    }
    &--is-services, &--is-team{
      @include media('<=phone') {
        padding-bottom: 0;
      }
    }
  }
</style>
