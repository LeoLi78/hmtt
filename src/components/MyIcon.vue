<template>
<!-- 不能div 不然样式出不来 -->
  <i class="toutiao" :class="'toutiao-' + name"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
