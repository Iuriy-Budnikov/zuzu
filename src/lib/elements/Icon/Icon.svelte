<script>
  import facebook from './facebook';
  import telegram from './telegram';
  import instagram from './instagram';
  import whatsapp from './whatsapp';
  import viber from './viber';
  export let name;
  export let box = 48;
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
  ];
  let displayIcon = icons.find((e) => e.name === name);
</script>

<svg class={$$props.class} {focusable} {width} {height} viewBox="0 0 {box} {box}"
  >{@html displayIcon.svg}</svg
>

<style lang="scss">
  .icon {
  }
</style>
