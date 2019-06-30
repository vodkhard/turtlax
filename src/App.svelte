<script>
  import { debounce } from "lodash";
  import Results from "./components/results/List.svelte";
  import { query, page, results } from "./stores/search";

  let handleChange = debounce(function(e) {
    $query = e.target.value;
  }, 200);
</script>

<h1>Welcome on Turtlax!</h1>
<form>
  <input
    type="text"
    on:input={handleChange}
    placeholder="Search a TV Show by name" />
  <button type="submit">Search</button>
</form>

{#if $results.hits}
  <Results hits={$results.hits} aggregations={$results.aggregations} />
{/if}

<div>
  <button on:click={() => ($page -= 1)}>Prev</button>
  <span>{$page}</span>
  <button on:click={() => ($page += 1)}>Next</button>
</div>
