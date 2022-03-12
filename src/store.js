import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allBoards: {
        
        allBoardsList: [
          // {
          //   boardId: -1, 
          //   boardName:'', 
          //   boardDesc:'', 
          //   allItems: {
          //     todo: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}, 
          //     progress: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}, 
          //     done: {maxCard: 5, items: [{title: '', description: '', itemId: -1}]}}
          // }
        ],
        nextId: 0
    }
  },

  mutations: {
    addBoard(state, item){
      console.log(item.text)

      state.allBoards.allBoardsList.push(
        {
          boardId: item.text.boardId, 
          boardName: item.text.boardName, 
          boardDesc: item.text.boardDesc,
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
      for(var eachBoard of state.allBoards.allBoardsList){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.allItems[item.text.laneId].items.push({title: item.text.newCardTitle, description: item.text.newCardDesc, itemId: state.allBoards.nextId})
          state.allBoards.nextId += 1
          break; 
        }
      }
      console.log("After:" , state)
    },

    updateItems(state, details){
      console.log("laneId:", details.laneId)
      console.log("updateItems:", details.items)

      for(var eachBoard of state.allBoards.allBoardsList){
        if(eachBoard.boardId == details.boardId){
          
          console.log(eachBoard.allItems[details.laneId].items)
          eachBoard.allItems[details.laneId].items = details.items;
          break; 
        }
      }
    },

    deleteItem(state, item){
      console.log(item)
      for(var eachBoard of state.allBoards.allBoardsList){
        if(eachBoard.boardId == item.boardId){
          var laneItems = eachBoard.allItems[item.laneId].items
          for(var eachItem of laneItems){
            if(eachItem.itemId == item.itemId){
              // console.log(eachItem)
              console.log('Before deleteItem:', laneItems)
              var itemIndex = laneItems.indexOf(eachItem)
              // console.log(itemIndex)
              laneItems.splice(itemIndex, 1)
              console.log('After deleteItem:', laneItems)
            }
          }
        }
      }
    },

    editBoardName(state,item){
      for(var eachBoard of state.allBoards.allBoardsList){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.boardName = item.text.boardName
          break;
        }
      }
    },

    editBoardDesc(state,item){
      for(var eachBoard of state.allBoards.allBoardsList){
        if(eachBoard.boardId == item.text.boardId){
          eachBoard.boardDesc = item.text.boardDesc
          break;
        }
      }
    }
  }
})