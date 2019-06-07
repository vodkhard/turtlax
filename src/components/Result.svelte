<script>
  import { fade } from "svelte/transition";
  import ResultDetails from "./ResultDetails.svelte";

  export let item;
</script>

<style>
  .bold {
    font-weight: bold;
  }
</style>

<div transition:fade={{ duration: 1000 }}>
  {#if item.image}
    <img src={item.image.medium} alt="Poster" width="100" />
  {/if}
  <div class="bold">{item.name}</div>
  {#if item.summary}
    {@html item.summary}
  {/if}
</div>
