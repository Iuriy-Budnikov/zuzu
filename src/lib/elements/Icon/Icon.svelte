<script>
  import facebook from './facebook';
  import telegram from './telegram';
  import instagram from './instagram';
  import whatsapp from './whatsapp';
  import viber from './viber';
  import tiktok from './tiktok';
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
  let icons = {
    facebook,
    telegram,
    instagram,
    whatsapp,
    viber,
    flag,
    city,
    arrow,
    reset,
    air,
    bus,
    foot,
    minus,
    plus,
    tiktok
  };
</script>

<svg class={$$props.class} {focusable} {width} {height} viewBox="0 0 {box}">
  {@html icons[name]}
</svg>
