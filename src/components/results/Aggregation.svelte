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

<div transition:fade={{ duration: 100 }}>
  <label>{type}</label>
  <select on:change={e => handleFilter(e.target.value)}>
    {#each buckets as { key, doc_count }}
      <option value={key}>{key} [{doc_count}]</option>
    {/each}
  </select>
</div>
