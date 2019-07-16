<script>
  import { fade } from "svelte/transition";
  import { filters } from "../../stores/search";
  import Result from "./Item.svelte";
  import Aggregation from "./Aggregation.svelte";

  export let hits;
  export let aggregations = {};
</script>

<style>
  .container {
    display: flex;
    width: 100vw;
  }

  .shows_container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .shows_container--item {
    max-width: 20%;
    width: 100%;
    max-height: 550px;
  }
</style>

<div class="container" transition:fade={{ duration: 500 }}>
  <div class="left">
    <button on:click={() => ($filters = [])}>Reset filters</button>
    {#each Object.entries(aggregations) as [type, { buckets }]}
      <Aggregation {type} {buckets} />
    {/each}
  </div>
  <div class="shows_container">
    {#each hits.hits as item}
      <div class="shows_container--item">
        <Result item={item._source} />
      </div>
    {/each}
  </div>
</div>
