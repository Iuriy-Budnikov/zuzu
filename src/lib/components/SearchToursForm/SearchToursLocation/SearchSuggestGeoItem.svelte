<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form, updateField } = getContext(key);

  export let id;
  export let parent_id = '';
  export let category_id = '';
  export let name = '';

  function onCheck(e) {
    const combinedParentId = category_id || parent_id;

    const checked = e.currentTarget.checked;
    form.update((values) => {
      const { where_ids, where_category_id } = values;

      let new_where_ids = where_ids;

      updateField('where_category_id', combinedParentId);

      if (!!where_category_id && where_category_id != combinedParentId) {
        new_where_ids = [];
      }

      if (checked) {
        new_where_ids.push(id);
      } else {
        const index = new_where_ids.indexOf(id);
        if (index > -1) {
          new_where_ids.splice(index, 1);
        }
      }

      return {
        ...values,
        where_ids: new_where_ids,
      };
    });
  }
</script>

<div class="search-suggest-geo-item">
  <label class="search-suggest-geo-item__label" for={`checkbox-${id}`}>
    <span class="search-suggest-geo-item__checkbox">
      <input
        id={`checkbox-${id}`}
        type="checkbox"
        on:change={onCheck}
        checked={$form['where_ids']?.findIndex((c) => c === id) > -1}
        value={id}
      />
    </span>
    <span class="search-suggest-geo-item__name">{name}</span>
  </label>
</div>

<style lang="scss">
  .search-suggest-geo-item {
    display: flex;
    align-items: center;
    height: 54px;
    font-weight: 500;
    position: relative;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f8f9;
    }

    &__label {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
      cursor: pointer;
    }

    &__checkbox {
      width: auto;
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
      font-weight: 500;
      color: #404a51;
      cursor: pointer;
      margin-right: 10px;
    }
  }
</style>
