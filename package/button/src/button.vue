<template>
  <button
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GButton',
  props: {
    disabled: Boolean
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>
