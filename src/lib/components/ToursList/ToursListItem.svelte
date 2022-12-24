<script>
  import Icon from '$lib/elements/Icon/Icon.svelte';

  export let name = '';
  export let img = '';
  export let id = undefined;
  export let stars = 0;
  export let score = 0;
  export let rating = {};
  export let numberOfReviews = 0;
  export let features = [];
  export let slug = '';
  export let geo = {};
</script>

<div class="tours-list-item">
  <div class="tours-list-item__gallery">
    <div class="tours-list-item__img" style="background-image: url('/proxy/img/3/320x240/{img}')" />
  </div>
  <div class="tours-list-item__body">
    <a href={`/tours/${id}-${slug}`} class="tours-list-item__body-link">
      <div class="tours-list-item__header">
        <div class="tours-list-item__name">
          <div class="tours-list-item__stars">
            {stars}
            <Icon name="star" width={15} height={15} box="15 15" />
          </div>
          <div class="tours-list-item__title">
            {name}
          </div>
        </div>
        <div class="tours-list-item__rating">
          {score} - {numberOfReviews}
        </div>
      </div>
      <div class="tours-list-item__geo">{geo.n}</div>
    </a>
  </div>
</div>

<style lang="scss">
  .tours-list-item {
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    margin: 0 0 16px;
    display: flex;
    color: #535c62;
    position: relative;
    z-index: 1;

    &:hover {
      box-shadow: 0 4px 16px 0 rgb(0 0 0 / 9%);
    }

    &__gallery {
      position: relative;
      width: 376px;
      height: 284px;
    }

    &__body {
      width: calc(100% - 376px);
      position: relative;
      border-radius: 0 5px 5px 0;
    }

    &__body-link {
      display: block;
      padding: 4px 20px 0 24px;
      height: calc(100% - 83px);
      text-decoration: none;
      color: inherit;
      border: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      min-height: 48px;
      justify-content: space-between;
    }

    &__name {
      display: flex;
      align-items: center;
    }

    &__stars {
      display: flex;
      margin-right: 16px;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: var(--color__text--neutral);
      line-height: 1;
      position: relative;

      :global(svg) {
        margin-left: 2px;
      }

      &:after {
        content: '';
        position: absolute;
        right: -8px;
        top: 0;
        display: block;
        width: 1px;
        height: 22px;
        background-color: #ededee;
      }
    }

    &__stars,
    &__title {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
    }

    &__img {
      background: no-repeat 50% / cover;
      position: relative;
      width: 376px;
      height: 100px;
    }
  }
</style>
