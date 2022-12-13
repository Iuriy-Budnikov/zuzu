<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { parse, format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';
  const { form } = getContext(key);

  let currentDate;
  let start;
  let end;
  let startDate = '';
  let startMonth = '';
  let startDay = '';
  let startYear = '';
  let endDate = '';
  let endMonth = '';
  let endDay = '';
  let endYear = '';

  $: {
    try {
      currentDate = new Date();
      start = parse($form.checkIn, DATE_FORMAT, currentDate);
      end = parse($form.checkTo, DATE_FORMAT, currentDate);

      startDate = format(start, 'd', { locale: uk });
      startMonth = format(start, 'MMM', { locale: uk }).slice(0, 3);
      startDay = format(start, 'EEEEEE', { locale: uk });
      startYear = format(start, 'yyyy', { locale: uk });

      endDate = format(end, 'd', { locale: uk });
      endMonth = format(end, 'MMM', { locale: uk }).slice(0, 3);
      endDay = format(end, 'EEEEEE', { locale: uk });
      endYear = format(end, 'yyyy', { locale: uk });
    } catch (error) {}
  }
</script>

<div class="search-tours-active-date">
  <div class="search-tours-active-date__name">
    {startDate}
    {startMonth}, <span class="search-tours-active-date__date">{startDay}</span>
    {#if $form.checkRange || !$form.checkDate}
      &nbsp;—&nbsp;{endDate}
      {endMonth},&nbsp;
      <span class="search-tours-active-date__date">
        {#if startYear !== endYear}
          {endYear}
        {:else}
          {endDay}
        {/if}
      </span>
    {:else}
      {startYear}
    {/if}
  </div>
</div>

<style lang="scss">
  .search-tours-active-date {
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

    &__date {
      color: rgb(143, 147, 151);
    }
  }
</style>
