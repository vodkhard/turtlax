<script>
  export let details;
</script>

<style>
  .bold {
    font-weight: bold;
  }
</style>

<div>
  <div class="bold">Last episode</div>
  <p>
    Season {details.last_episode_to_air.season_number} - Episode {details.last_episode_to_air.episode_number}
    -
    <i>{details.last_episode_to_air.name}</i>
  </p>
  <p>Release date : {details.last_episode_to_air.air_date}</p>
</div>
