<script>
  export let name = '';
  export let img = '';
  export let id = undefined;
  export let stars = 0;
  export let score = 0;
  export let rating = {};
  export let numberOfReviews = 0;
  export let features = [];
  export let slug = '';
</script>

<div class="tours-list-item">
  <div>
    {stars} | {name} | {score} - {numberOfReviews}
  </div>

  <div class="tours-list-item__img" style="background-image: url('/proxy/img/3/320x240/{img}')" />
</div>

<style lang="scss">
  .tours-list-item {
    &__img {
      background: no-repeat 50% / cover;
      position: relative;
      width: 376px;
      height: 100px;
    }
  }
</style>
