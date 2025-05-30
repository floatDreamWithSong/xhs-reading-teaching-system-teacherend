<script setup lang="ts">
interface Props {
  imageSrc: string
  text: string
}

defineProps<Props>()
</script>
<template>
  <div class="action-card">
    <div class="image-container">
      <img :src="imageSrc" :alt="text" class="card-image" />
    </div>
    <span class="card-text">
      {{ text }}
    </span>
    <div class="radial-background">

    </div>
  </div>
</template>
<style scoped>
.action-card {
  display: flex;
  flex-direction: row;
  position: relative;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all ease 0.3s;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    padding: 11px;

    .card-image {
      width: 77px;
      height: 82px;
    }
  }

  .card-text {
    position: relative;
    z-index: 2;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.06em;

    background: linear-gradient(360deg, #2447F9 26.92%, #8FA2FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

  }

  .radial-background {
    position: absolute;
    height: 200%;
    width: 70%;
    left: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(224, 229, 254, 0.48) 0%, rgba(248, 249, 254, 0.8) 100%);
    filter: blur(12.2px);
    border-radius: 11px;
  }
}
</style>