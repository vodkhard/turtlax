<script>
  import { onMount } from "svelte";

  export let tv_id = null;
  export let tv_show = {};

  onMount(() => {
    if (tv_id !== null) {
      fetch(`http://localhost:3005/shows/${tv_id}`)
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
  {#if tv_show.image}
    <img src={tv_show.image.medium} alt="Poster" width="100" />
  {/if}
  <div class="bold">{tv_show.name}</div>
  {#if tv_show.summary}
    {@html tv_show.summary}
  {/if}
</div>
