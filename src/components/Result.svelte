<script>
  import { fade } from "svelte/transition";
  import superagent from "superagent";
  import ResultDetails from "./ResultDetails.svelte";

  export let item;
  let details = null;

  function loadDetails(params) {
    superagent
      .get(`https://api.themoviedb.org/3/tv/${item.id}`)
      .query({
        api_key: "",
        language: "fr-FR"
      })
      .then(data => {
        details = data.body;
      });
  }
</script>

<style>
  .bold {
    font-weight: bold;
  }
</style>

<div transition:fade={{ duration: 1000 }}>
  <img
    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
    alt="Poster"
    width="100" />
  <div class="bold">{item.name}</div>
  <p>{item.overview}</p>
  <button on:click={loadDetails}>See details</button>
</div>

{#if details}
  <ResultDetails {details} />
{/if}
