<script>
  import { fade } from "svelte/transition";
  import { filters } from "../../stores/search";
  import Result from "./Item.svelte";

  export let type;
  export let buckets;

  let handleFilter = val => {
    $filters = [
      ...$filters,
      {
        name: type,
        value: val
      }
    ];
  };
</script>

<style>
  .bucket {
    display: flex;
    flex-direction: column;
  }
</style>

<div transition:fade={{ duration: 500 }}>
  <div>{type}</div>
  <div class="bucket">
    {#each buckets as { key, doc_count }}
      <button on:click={() => handleFilter(key)}>{key} [{doc_count}]</button>
    {/each}
  </div>
</div>
