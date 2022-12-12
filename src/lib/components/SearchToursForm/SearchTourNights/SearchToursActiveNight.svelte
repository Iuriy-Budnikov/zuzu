<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import { getNights } from './nigths';

  const nights = getNights();

  $: night = nights.find((c) => $form.nights === c.nights && $form.nightsTo === c.nightsTo);
</script>

<div class="search-tours-active-night">
  <div class="search-tours-active-night__name">
    <span class="search-tours-active-night__night">
      {night.night}
    </span>
  </div>
</div>

<style lang="scss">
  .search-tours-active-night {
    color: #404a51;
    font-size: 19px;
    font-weight: 400;
    display: block;
    width: 100%;
    padding: 22px 16px 0 16px;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;

    &__name {
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__night {
      color: #474f55;
    }
  }
</style>
