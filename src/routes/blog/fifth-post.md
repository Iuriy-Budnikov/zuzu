---
title: Fifth
description: Fifth
tags:
  - tech
date: 2021-07-01
---

<script context="module">
  export const prerender = true;
</script>

<svelte:head>
  <title>ZuZu Travel | {title}</title>
  <meta name="description" content="ZuZu Travel | {description}" />
</svelte:head>

# {title}

<small>{new Date(date).toDateString()}</small>

This is fifth post!!!!!!

<style>
small {
    color: gray
}
</style>
