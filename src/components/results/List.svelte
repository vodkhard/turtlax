<script>
  import { fade } from "svelte/transition";
  import { filters } from "../../stores/search";
  import Result from "./Item.svelte";
  import Aggregation from "./Aggregation.svelte";

  export let hits;
  export let aggregations;
</script>

<style>
  .container {
    display: flex;
  }
  .left {
    flex: 20%;
  }
</style>

<div class="container" transition:fade={{ duration: 500 }}>
  <div class="left">
    <button on:click={() => ($filters = [])}>Reset filters</button>
    {#each Object.entries(aggregations) as [type, { buckets }]}
      <Aggregation {type} {buckets} />
    {/each}
  </div>
  <div class="right">
    <div>{hits.total} series found !</div>
    {#each hits.hits as item}
      <Result item={item._source} />
      <hr />
    {/each}
  </div>
</div>
