<template>
  <div class="m-4">

    <!-- Board Name -->
    <div class="d-flex mb-3">
        <span>
            <h2 class="boardNameClass" v-if="!isEditingBN"><strong>{{boardNameComputed}}</strong></h2>
            <form>
              <div class="form-group" :class="{ 'has-danger': boardNameInvalid}">
                <input v-if="isEditingBN" v-model="boardNameComputed" type="text" class="form-control" :class="{ 'has-danger': boardNameInvalid, 'is-invalid': boardNameInvalid}" style="display: inline-block;" @keydown.enter="stopEditBoardName()">
                <div class="invalid-feedback">Board name cannot be empty.</div>
              </div>
            </form>
            <!-- <span class="input" role="textbox"></span> -->
        </span>

        <span>
            <font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBN" @click="editBoardName()" class="editBoardClass mt-2 ms-3" />

            <button type="button" class="btn btn-primary ms-1" v-if="isEditingBN" @click="stopEditBoardName()"><font-awesome-icon icon="fa-solid fa-check" class="editBoardClass" /></button>
            <!-- <font-awesome-icon icon="fa-solid fa-check"  v-if="isEditingBN" @click="stopEditBoardName()" class="editBoardClass" style="color:#78c2ad"/> -->
        </span>
    </div>

    <!-- Board Description -->
    <div class="d-flex mb-3">
      <span class="flex-grow-1">
          <div class="boardNameClass" v-if="!isEditingBD">{{boardDescComputed}}</div>

          <form>
            <div class="form-group" :class="{ 'has-danger': boardDescInvalid}">
              <!-- <textarea v-if="isEditingBD" v-model="boardDescComputed" class="form-control" :class="{ 'has-danger': boardDescInvalid, 'is-invalid': boardDescInvalid}" @keydown.enter="stopEditBoardDesc()"></textarea> -->
              <input type="text" v-if="isEditingBD" v-model="boardDescComputed" class="form-control" :class="{ 'has-danger': boardDescInvalid, 'is-invalid': boardDescInvalid}" @keydown.enter="stopEditBoardDesc()">
              <div class="invalid-feedback">Board description cannot be empty.</div>
            </div>
          </form>
      </span>

      <span>
            <span><font-awesome-icon icon="fa-solid fa-pen" v-if="!isEditingBD" @click="editBoardDesc()" class="editBoardClass" /></span>

            <button type="button" class="btn btn-primary ms-1" v-if="isEditingBD" @click="stopEditBoardDesc()"><font-awesome-icon icon="fa-solid fa-check" class="editBoardClass" /></button>
          
        </span>
    </div>
    
    <!-- Tasklanes -->
    <div class="row">
    
        <div class="col-lg-4 col-md-6 col-xs-12">
            <taskLane laneId="todo" title="To-Do" bgColor="bg-info" btnColor="btn-info" :items="allItems.todo.items" :maxCard="allItems.todo.maxCard" :boardId="boardId"></taskLane>
        </div>

        <div class="col-lg-4 col-md-6 col-xs-12">
            <taskLane laneId="progress" title="In Progress" bgColor="bg-warning" btnColor="btn-warning" :items="allItems.progress.items" :maxCard="allItems.progress.maxCard" :boardId="boardId"></taskLane>
        </div>

        <div class="col-lg-4 col-md-12 col-xs-12">
            <taskLane laneId="done" title="Done" bgColor="bg-primary" btnColor="btn-primary" :items="allItems.done.items" :maxCard="allItems.done.maxCard" :boardId="boardId"></taskLane>
        </div>

        <!-- <div class="col" v-for="(value, key) in allItems" :key="key">
            <taskLane :laneId="key" :title="value.cardTitle" bgColor="bg-primary" btnColor="btn-primary" :items="allItems[key].items" :maxCard="allItems.done.maxCard" :boardId="boardId"></taskLane>
        </div> -->

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
      isEditingBD: false
    }
  },

  computed: {
    boardNameComputed: {
      get(){
        return this.boardName
      },
      set(boardName) {
        // console.log(boardName)
        if(boardName.length > 0){
          this.$store.commit('editBoardName', {
              text: {boardId: this.boardId, boardName: boardName}
          });
        }
        else{
          this.boardNameInvalid = true
        }
      }
    },

    boardDescComputed: {
      get(){
        return this.boardDesc
      },
      set(boardDesc) {
        // console.log(boardName)
        if(boardDesc.length > 0){
          this.$store.commit('editBoardDesc', {
              text: {boardId: this.boardId, boardDesc: boardDesc}
          });
        }
        else{
          this.boardDescInvalid = true
        }
      }
    }

  },

  methods: {

    editBoardName() {
        this.isEditingBN = true
    },

    stopEditBoardName() {
      this.isEditingBN = false
      // this.$store.commit('editBoardName', {
      //     text: {boardId: this.boardId, boardName: this.boardNameComputed}
      // })
    },

    editBoardDesc() {
        this.isEditingBD = true
    },

    stopEditBoardDesc() {
      this.isEditingBD = false
      // this.$store.commit('editBoardDesc', {
      //   text: {boardId: this.boardId, boardDesc: this.boardDesc}
      // })
    }
  }
}
</script>

<style>

.editBoardClass:hover {
    /* background-color: rgb(223, 243, 245); */
    cursor: pointer; 
}

.boardNameClass{
  /* word-wrap: break-word; */
  /* text-overflow: ellipsis; */
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
}

</style>
