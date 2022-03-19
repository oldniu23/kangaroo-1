<template>
  <div>
    <button class="button" @click="$emit('click', $event)">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  padding: 0 16px;
  height: 40px;
  border: none;
  border-radius: 4px;
  &-wrapper {
    padding: 16px;
    margin-top: 44-16px;
    text-align: center;
  }
}
</style>