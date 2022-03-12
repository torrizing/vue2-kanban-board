import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allBoards: {
      board: [{boardId: -1, boardName:'', boardDesc:'', allItems: {todoItems: [], progressItems: [], doneItems: []}}],
    },
    nextId: 1
  },
})