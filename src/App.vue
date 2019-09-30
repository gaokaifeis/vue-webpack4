<template>
  <div>
    <g-button disabled>click</g-button>
    <jsx-example></jsx-example>
    <hello-world></hello-world>
    <ha-ha></ha-ha>
  </div>
</template>

<script>
import GButton from '../package/button'
import HelloWorld from './HelloWorld'
import HaHa from './HaHa'
export default {
  name: 'App',
  components: {
    GButton,
    HelloWorld,
    HaHa
  }
}
</script>
