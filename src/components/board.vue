<template>
  <div class="m-4">
      <!-- <button type="button" class="btn btn-info"><span><font-awesome-icon icon="fa-solid fa-plus" /></span>New Board</button> -->
    <div>
        <span class="mb-2">
            <h2 class="boardNameClass" v-if="!isEditing"><strong>{{boardName}}</strong></h2>
            <input v-if="isEditing" v-model="boardName" type="text" class="form-control" style="display: inline-block;" @keydown.enter="stopEditBoardName">
        </span>

        <span class="align-middle">
            <span><font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditing" @click="editBoardName" class="editBoardNameClass" /></span>
            <font-awesome-icon icon="fa-solid fa-check"  v-if="isEditing" @click="stopEditBoardName" class="editBoardNameClass" style="color:green"/>
        </span>
    </div>
    
    <div class="row">
    
        <div class="col">
            <taskLane id="todo" title="To-Do" bgColor="bg-info" btnColor="btn-info" :items="todoItems"></taskLane>
        </div>

        <div class="col">
            <taskLane id="progress" title="In Progress" bgColor="bg-warning" btnColor="btn-warning" :items="progressItems"></taskLane>
        </div>

        <div class="col">
            <taskLane id="done" title="Done" bgColor="bg-primary" btnColor="btn-primary" :items="doneItems"></taskLane>
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

  data () {
    return {
      boardName: 'First Board',
      isEditing: false,
      todoItems: [{title:'Cook', description:'2 pax dinner'},
      {title:'Clean', description:'Sweep the floor'}],
      progressItems: [],
      doneItems: []
    }
  },

  methods: {

    editBoardName() {
        this.isEditing = true
    },

    stopEditBoardName() {
        this.isEditing = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.editBoardNameClass:hover {
    /* background-color: rgb(223, 243, 245); */
    cursor: pointer; 
}

</style>
