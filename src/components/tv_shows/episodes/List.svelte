<script>
  import { onMount } from "svelte";

  export let tv_id = null;
  export let episodes = [];

  onMount(() => {
    if (tv_id !== null) {
      fetch(`http://localhost:3005/shows/${tv_id}/episodes`)
        .then(res => res.json())
        .then(data => (episodes = data.map(d => d._source)));
    }
  });
</script>

<style>
  .bold {
    font-weight: bold;
  }
</style>

<div>
  <div>List of all episodes :</div>
  {#each episodes as episode}
    <div>
      <div class="bold">{episode.name}</div>
      <p>Season {episode.season} - Episode {episode.number} </p>
      <p>Release date : {episode.airdate}</p>
    </div>
  {/each}
</div>
