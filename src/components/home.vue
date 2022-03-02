<template>
  <div class="m-4">
      <!-- <button type="button" class="btn btn-info"><span><font-awesome-icon icon="fa-solid fa-plus" /></span>New Board</button> -->
    <board></board>
  </div>
</template>

<script>
import board from './board.vue'

export default {
  name: 'home',

  components: {
      board
  },

  data () {
    return {
      msg: 'hi'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
