<template>
  <div class="m-4">

    <!-- Board Name -->
    <div class="d-flex">
        <span>
            <h2 class="boardNameClass" v-if="!isEditingBN"><strong>{{boardName}}</strong></h2>
            <input v-if="isEditingBN" v-model="boardName" type="text" class="form-control" style="display: inline-block;" @keydown.enter="stopEditBoardName">
            <span class="input" role="textbox"></span>
        </span>

        <span class="mt-2 ms-3">
            <font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBN" @click="editBoardName()" class="editBoardClass" />
            <font-awesome-icon icon="fa-solid fa-check"  v-if="isEditingBN" @click="stopEditBoardName()" class="editBoardClass" style="color:#78c2ad"/>
        </span>
    </div>

    <!-- Board Description -->
    <div class="d-flex mb-3">
      <span>
          <div class="boardNameClass" v-if="!isEditingBD">{{boardDesc}}</div>
          <textarea v-if="isEditingBD" v-model="boardDesc" class="form-control" @keydown.enter="stopEditBoardDesc()"></textarea>
      </span>

      <span class="ms-3">
            <span><font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBD" @click="editBoardDesc()" class="editBoardClass" /></span>
            <font-awesome-icon icon="fa-solid fa-check" v-if="isEditingBD" @click="stopEditBoardDesc()" class="editBoardClass" style="color:#78c2ad"/>
        </span>
    </div>
    
    <!-- Tasklanes -->
    <div class="row">
    
        <div class="col">
            <taskLane laneId="todo" title="To-Do" bgColor="bg-info" btnColor="btn-info" :items="allItems.todo.items" :maxCard="allItems.todo.maxCard" :boardId="boardId"></taskLane>
        </div>

        <div class="col">
            <taskLane laneId="progress" title="In Progress" bgColor="bg-warning" btnColor="btn-warning" :items="allItems.progress.items" :maxCard="allItems.progress.maxCard" :boardId="boardId"></taskLane>
        </div>

        <div class="col">
            <taskLane laneId="done" title="Done" bgColor="bg-primary" btnColor="btn-primary" :items="allItems.done.items" :maxCard="allItems.done.maxCard" :boardId="boardId"></taskLane>
        </div>

    </div>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import taskLane from './taskLane.vue'

export default {
  name: 'home',

  components: {
    // draggable,
    taskLane
  },
  props: ['boardName', 'boardDesc', 'boardId', 'allItems'],
  data () {
    return {
      isEditingBN: false,
      isEditingBD: false,
      // todoItems: [{title:'Cook', description:'2 pax dinner'},
      // {title:'Clean', description:'Sweep the floor'}],
      // todoItems: [],
      // progressItems: [],
      // doneItems: []
    }
  },

  // computed: {
  //   boardName: {
  //     get(){
  //       this.boardName
  //     },
  //     set(boardName) {
  //       console.log(boardName)
  //       this.$store.commit('editBoardName', {
  //           text: {boardId: this.boardId, boardName: this.boardName}
  //       });
  //     }
  //   }

  // },

  methods: {

    editBoardName() {
        this.isEditingBN = true
    },

    stopEditBoardName() {
      this.isEditingBN = false
      this.$store.commit('editBoardName', {
          text: {boardId: this.boardId, boardName: this.boardName}
      })
    },

    editBoardDesc() {
        this.isEditingBD = true
    },

    stopEditBoardDesc() {
      this.isEditingBD = false
      this.$store.commit('editBoardDesc', {
        text: {boardId: this.boardId, boardDesc: this.boardDesc}
      })
    }
  }
}
</script>

<style>

.editBoardClass:hover {
    /* background-color: rgb(223, 243, 245); */
    cursor: pointer; 
}

</style>
