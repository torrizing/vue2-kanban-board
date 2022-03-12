import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allBoards: [
        // {
        //   boardId: -1, 
        //   boardName:'', 
        //   boardDesc:'', 
        //   nextId: 0,
        //   allItems: {
        //     todo: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}, 
        //     progress: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}, 
        //     done: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}}
        // }
      ]
  },

  mutations: {
    addBoard(state, item){
      console.log(item.text)

      state.allBoards.push(
        {
          boardId: item.text.boardId, 
          boardName: item.text.boardName, 
          boardDesc: item.text.boardDesc,
          nextId: 0,
          allItems: {
            todo: {maxCard: 10, items: []}, 
            progress: {maxCard: 10, items: []}, 
            done: {maxCard: 10, items: []}}
        }
      )
      console.log(state)

      
    },
    
    addItem(state, item){
      console.log("Before:" , state)
      console.log(item)

      for(var eachBoard of state.allBoards){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.allItems[item.text.laneId].items.push({title: item.text.newCardTitle, description: item.text.newCardDesc, itemId: eachBoard.nextId})
          eachBoard.nextId += 1
          break;
        }
      }

      console.log("After:" , state)

    },

    editBoardName(state,item){
      for(var eachBoard of state.allBoards){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.boardName = item.text.boardName
          break;
        }
      }
    },

    editBoardDesc(state,item){
      for(var eachBoard of state.allBoards){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.boardDesc = item.text.boardDesc
          break;
        }
      }
    }
  }
})