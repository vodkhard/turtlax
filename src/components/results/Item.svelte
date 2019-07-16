<script>
  import { fade } from "svelte/transition";
  import EpisodesList from "../tv_shows/episodes/List.svelte";
  import Summary from "../tv_shows/Summary.svelte";

  export let item;
  let displayDetails = false;
</script>

<style>
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .item {
    height: 100%;
  }
</style>

<div class="item" transition:fade={{ duration: 500 }}>
  <Summary background={item.image.medium}>
    <div class="title bold">{item.name}</div>
    {#if item.summary}
      {@html item.summary}
    {/if}
    <button on:click={() => (displayDetails = !displayDetails)}>
      List of episodes
    </button>
  </Summary>

  <!-- {#if displayDetails}
    <EpisodesList tv_id={item.id} />
  {/if} -->
</div>
