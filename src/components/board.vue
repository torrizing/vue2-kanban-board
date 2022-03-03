<template>
  <div class="m-4">
      <!-- <button type="button" class="btn btn-info"><span><font-awesome-icon icon="fa-solid fa-plus" /></span>New Board</button> -->
    <div class="d-flex">
        <span>
            <h2 class="boardNameClass" v-if="!isEditingBN"><strong>{{boardName}}</strong></h2>
            <input v-if="isEditingBN" v-model="boardName" type="text" class="form-control" style="display: inline-block;" @keydown.enter="stopEditBoardName">
            <span class="input" role="textbox"></span>
        </span>

        <span class="mt-2 ml-3">
            <span><font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBN" @click="editBoardName" class="editBoardClass" /></span>
            <font-awesome-icon icon="fa-solid fa-check"  v-if="isEditingBN" @click="stopEditBoardName" class="editBoardClass" style="color:green"/>
        </span>
    </div>

    <div class="d-flex mb-3">
      <span>
          <div class="boardNameClass" v-if="!isEditingBD">{{boardDesc}}</div>
          <textarea v-if="isEditingBD" v-model="boardDesc" class="form-control" @keydown.enter="stopEditBoardDesc"></textarea>
      </span>

      <span class="mt-2 ml-3">
            <span><font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBD" @click="editBoardDesc" class="editBoardClass" /></span>
            <font-awesome-icon icon="fa-solid fa-check" v-if="isEditingBD" @click="stopEditBoardDesc" class="editBoardClass" style="color:green"/>
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
      boardDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta odit molestiae nihil neque. Veniam quas esse alias ipsam minus soluta assumenda similique exercitationem quae! Pariatur unde odio consectetur nemo.",
      isEditingBN: false,
      isEditingBD: false,
      todoItems: [{title:'Cook', description:'2 pax dinner'},
      {title:'Clean', description:'Sweep the floor'}],
      progressItems: [],
      doneItems: []
    }
  },

  methods: {

    editBoardName() {
        this.isEditingBN = true
    },

    stopEditBoardName() {
        this.isEditingBN = false
    },

    editBoardDesc() {
        this.isEditingBD = true
    },

    stopEditBoardDesc() {
        this.isEditingBD = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.editBoardClass:hover {
    /* background-color: rgb(223, 243, 245); */
    cursor: pointer; 
}

</style>
