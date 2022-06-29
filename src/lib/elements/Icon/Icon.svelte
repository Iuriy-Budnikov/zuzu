<script>
  import facebook from './facebook';
  import telegram from './telegram';
  import instagram from './instagram';
  import whatsapp from './whatsapp';
  import viber from './viber';
  import flag from './flag';
  import city from './city';
  import arrow from './arrow';
  import reset from './reset';
  import air from './air';
  import bus from './bus';
  import foot from './foot';
  import minus from './minus';
  import plus from './plus';
  export let name;
  export let box = '48 48';
  export let width = '48px';
  export let height = '48px';
  export let focusable = false;
  let icons = [
    {
      name: 'facebook',
      svg: facebook
    },
    {
      name: 'telegram',
      svg: telegram
    },
    {
      name: 'instagram',
      svg: instagram
    },
    {
      name: 'whatsapp',
      svg: whatsapp
    },
    {
      name: 'viber',
      svg: viber
    },
    {
      name: 'flag',
      svg: flag
    },
    {
      name: 'city',
      svg: city
    },
    {
      name: 'arrow',
      svg: arrow
    },
    {
      name: 'reset',
      svg: reset
    },
    {
      name: 'air',
      svg: air
    },
    {
      name: 'bus',
      svg: bus
    },
    {
      name: 'foot',
      svg: foot
    },
    {
      name: 'minus',
      svg: minus
    },
    {
      name: 'plus',
      svg: plus
    }
  ];
  let displayIcon = icons.find((e) => e.name === name);
</script>

<svg class={$$props.class} {focusable} {width} {height} viewBox="0 0 {box}"
  >{@html displayIcon.svg}</svg
>

<style lang="scss">
  .icon {
  }
</style>
