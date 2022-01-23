<script>
  import ruby from './ruby';
  import rails from './rails';
  import elixir from './elixir';
  import phoenix from './phoenix';
  import node from './node';
  import js from './js';
  import ts from './ts';
  import apple from './apple';
  import redux from './redux';
  import svelte from './svelte';
  import react from './react';
  import android from './android';
  import vue from './vue';
  export let name;
  export let box = 48;
  export let width = '48px';
  export let height = '48px';
  export let focusable = false;
  let icons = [
    {
      name: 'ruby',
      svg: ruby
    },
    {
      name: 'rails',
      svg: rails
    },
    {
      name: 'elixir',
      svg: elixir
    },
    {
      name: 'phoenix',
      svg: phoenix
    },
    {
      name: 'node',
      svg: node
    },
    {
      name: 'js',
      svg: js
    },
    {
      name: 'ts',
      svg: ts
    },
    {
      name: 'apple',
      svg: apple
    },
    {
      name: 'redux',
      svg: redux
    },
    {
      name: 'svelte',
      svg: svelte
    },
    {
      name: 'react',
      svg: react
    },
    {
      name: 'android',
      svg: android
    },
    {
      name: 'vue',
      svg: vue
    }
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
