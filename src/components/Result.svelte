<script>
  import { fade } from "svelte/transition";
  import EpisodesList from "./tv_shows/episodes/List.svelte";
  import TvShowSummary from "./tv_shows/Summary.svelte";

  export let item;
  let displayDetails = false;
</script>

<div transition:fade={{ duration: 1000 }}>
  <TvShowSummary tv_show={item} />
  <button on:click={() => (displayDetails = !displayDetails)}>
    List of episodes
  </button>

  {#if displayDetails}
    <EpisodesList tv_id={item.id} />
  {/if}
</div>
