<template>
  <component :is="layout">
    <router-view :layout="layout" />
  </component>
</template>

<script>
const defaultLayout = 'default'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    },
  },
}
</script>