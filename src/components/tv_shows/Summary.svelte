<script>
  export let background = "";
</script>

<style>
  .overlay {
    transition: opacity 100ms;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    height: 100%;
  }
  .overlay__content {
    padding: 20px 25px;
  }
  .overlay:hover {
    opacity: 1;
  }
  .summary {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

<div class="summary" style={`background-image: url(${background})`}>
  <div class="overlay">
    <div class="overlay__content">
      <slot />
    </div>
  </div>
</div>
