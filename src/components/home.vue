<template>
  <div>
    <!-- Side nav bar -->
    <!-- <div id="sideNav" v-show="showSideNav">
      <div class="mb-2" style="text-align:right;">
        <font-awesome-icon class="closebtn" color="#ff7851" @click="closeSideNav()" icon="fa-solid fa-xmark" />
      </div>
      
      <div style="display:flex;" class="mb-3">
        <span><strong>My Boards</strong></span>
        
        <span style="margin-left:auto;"> <font-awesome-icon class="addNewBoardIcon" icon="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#newBoardModal"/></span>
      </div>

      <div>
        <div v-for="eachBoard of allBoardsList" :key="eachBoard.boardId" class="eachBoardClass mb-2" @click="accessBoard(eachBoard)">{{eachBoard.boardName}}</div>
      </div>
    </div> -->

    <!-- Side Nav Bar (Bootstrap) -->

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel"><strong>My Boards</strong></h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>
          <!-- <span style="margin-left:auto;"> <font-awesome-icon class="addNewBoardIcon" icon="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#newBoardModal"/></span> Create a New Board -->
        
          <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#newBoardModal"><font-awesome-icon icon="fa-solid fa-plus" /><span class="ms-1">Create a New Board</span></button>
        </p>

        <div>
          <div v-for="eachBoard of allBoardsList" :key="eachBoard.boardId" data-bs-dismiss="offcanvas" class="eachBoardClass mb-2" @click="accessBoard(eachBoard)">{{eachBoard.boardName}}</div>
      </div>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <div class="container-fluid d-flex">
      <!-- <button class="btn btn-info" type="submit" @click="openSideNav()"><font-awesome-icon icon="fa-solid fa-bars" /></button> -->

      <button class="btn btn-info" type="submit" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop"><font-awesome-icon icon="fa-solid fa-bars" /></button>

      
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <span class="navbar-brand">Vue-Board</span>

      </div>
    </nav>  

     <!-- Create New Board Dialog -->
    <div class="modal" id="newBoardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a New Board</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeNewBoard()">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3 form-group" :class="{ 'has-danger': isInvalid.boardName}">
                <label for="board-name" class="col-form-label">Name<span style="color:#ff7851">*</span></label>
                <input type="text" class="form-control" id="board-name" v-model="newBoardName"  :class="{ 'has-danger': isInvalid.boardName, 'is-invalid': isInvalid.boardName}" @change="checkNewBoardForm()">
                <div class="invalid-feedback">Board name is required.</div>
              </div>

              <div class="mb-3 form-group" :class="{'has-danger': isInvalid.boardDesc}">
                <label for="board-description" class="col-form-label">Description<span style="color:#ff7851">*</span></label>
                <textarea class="form-control" :class="{'has-danger': isInvalid.boardDesc, 'is-invalid': isInvalid.boardDesc}" id="board-description" v-model="newBoardDesc" @change="checkNewBoardForm()"></textarea>
                <div class="invalid-feedback">Board description is required.</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <!-- :data-bs-dismiss="modalName" -->
            <button type="button" class="btn btn-primary" @click="createNewBoard()" v-if="validForm==false">Create</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createNewBoard()" v-else-if="validForm">Create</button>

            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeNewBoard()">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="allBoardsList.length == 0" class="text-center mt-5">
      <h3>Welcome!<br><br> You currently do not have any boards, go ahead and <span class="createFirstBoard" data-bs-toggle="modal" data-bs-target="#newBoardModal">create your first board</span> :)</h3>
    </div>

    <div v-else>
      <board :boardName="currBoard.boardName" :boardDesc="currBoard.boardDesc" :boardId="currBoard.boardId" :allItems="currBoard.allItems"></board>
      <!-- {boardName: 'First Board', boardDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta odit molestiae nihil neque. Veniam quas esse alias ipsam minus soluta assumenda similique exercitationem quae! Pariatur unde odio consectetur nemo.', boardId: -1} -->
    </div>
    
  </div>
</template>

<script>
import board from './board.vue'
import { mapState } from 'vuex'; 

export default {
  name: 'home',

  components: {
      board
  },

  data () {
    return {
      newBoardName: '',
      newBoardDesc: '',
      showSideNav: false,
      currBoardId: -1,
      currBoard: {},
      isInvalid: {
        boardName: false,
        boardDesc: false
      },
      // modalName: "modal",
      // showModal: true,
      validForm: false
    }
  },

  computed: mapState({
    allBoardsList: s => s.allBoards.allBoardsList
  }),

  methods: {
    openSideNav(){
      this.showSideNav = true;
    },

    closeSideNav(){
      this.showSideNav = false;
    },

    checkNewBoardForm(){
      this.newBoardName = this.newBoardName.trim()
      this.newBoardDesc = this.newBoardDesc.trim()

      if(this.newBoardName.length == 0 || this.newBoardDesc.length == 0){
        this.validForm = false
      }
      else{
        this.validForm = true

      }
    },

    createNewBoard(){
      console.log(this.newBoardName)
      console.log(this.newBoardDesc)

      // var current = new Date();
      // console.log(current)
      // var newBoardId = current.getFullYear() + "/" + current.getMonth() + "/" + current.getDate() + ","
      // this.allBoardsList.push({boardName: this.newBoardName, boardDesc: this.newBoardDesc, boardId: this.currBoardId})
      // console.log(this.allBoardsList)
      this.newBoardName = this.newBoardName.trim()
      this.newBoardDesc = this.newBoardDesc.trim()

      if(this.newBoardName.length == 0 && this.newBoardDesc.length == 0){
        // this.modalName = ""
        this.isInvalid.boardName = true
        this.isInvalid.boardDesc = true
      }
      else if (this.newBoardName.length == 0){
        this.isInvalid.boardName = true
        this.isInvalid.boardDesc = false
      }
      else if (this.newBoardDesc.length == 0){
        this.isInvalid.boardName = false
        this.isInvalid.boardDesc = true
      }
      else{
        // this.modalName = "modal"
        this.isInvalid.boardName = false
        this.isInvalid.boardDesc = false

        this.currBoardId += 1
        this.$store.commit('addBoard', {
            text: {boardId: this.currBoardId, boardName: this.newBoardName, boardDesc: this.newBoardDesc},
        })
        this.newBoardName = ''
        this.newBoardDesc = ''

        for(var board of this.allBoardsList){
          if(board.boardId == this.currBoardId){
            this.currBoard = board
            break
          } 
        }
        this.showSideNav = false
        this.validForm = false

      }
      console.log(this.isInvalid.boardName)
      console.log(this.isInvalid.boardDesc)

    },

    closeNewBoard(){
      this.newBoardName = ''
      this.newBoardDesc = ''
      this.validForm = false
      this.isInvalid.boardName = false
      this.isInvalid.boardDesc = false
    },

    accessBoard(eachBoard){
      console.log(eachBoard)
      this.currBoard = eachBoard
      this.closeSideNav()
    }
  }
}
</script>

<style scoped>
.createFirstBoard {
  text-decoration: underline;
}

.createFirstBoard:hover {
  cursor: pointer;
  color:#6cc3d5;
}

.addNewBoardIcon:hover, .closebtn:hover{
  cursor: pointer;
}

#sideNav {
  height: 100%;
  width: 20%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(243, 232, 232);
  /* overflow-x: hidden; */
  transition: 0.5s;
  padding: 20px;
}

.eachBoardClass:hover{
  cursor: pointer;
  color: #6cc3d5;
}
</style>
