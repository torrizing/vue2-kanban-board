<template>
  <div id="app">
    <!-- Side nav bar -->
    <!-- <div id="sideNav" v-show="showSideNav">
      <div class="mb-2" style="text-align:right;">
        <font-awesome-icon class="closebtn" color="#ff7851" @click="closeSideNav()" icon="fa-solid fa-xmark" />
      </div>
      
      <div style="display:flex;" class="mb-3">
        <span><strong>My Boards</strong></span>
        
        <span style="margin-left:auto;"> <font-awesome-icon class="addNewBoardIcon" icon="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="addNewBoard()"/></span>
      </div>

      <div>
        <div v-for="eachBoard in allBoardsList" :key="eachBoard.boardI" class="eachBoardClass mb-2" @click="accessBoard(eachBoard)">{{eachBoard.boardName}}</div>
      </div>

    </div> -->
<!-- 
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <div class="container-fluid d-flex">
      <button class="btn btn-info" type="submit" @click="openSideNav()"><font-awesome-icon icon="fa-solid fa-bars" /></button> -->

      
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <a class="navbar-brand" href="#">Vue-Board</a> -->

        <!-- <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#">Home
                <span class="visually-hidden">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div> -->
      <!-- </div>
    </nav> -->
    
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button> -->

    <!-- Create New Board Dialog -->
    <!-- <div class="modal" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a New Board</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="board-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="board-name" v-model="newBoardName">
              </div>
              <div class="mb-3">
                <label for="board-description" class="col-form-label">Description:</label>
                <textarea class="form-control" id="board-description" v-model="newBoardDesc"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createNewBoard()">Create</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      // newBoardName: '',
      // newBoardDesc: '',
      // showSideNav: false,
      // allBoardsList: [{boardName: 'First Board', boardDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta odit molestiae nihil neque. Veniam quas esse alias ipsam minus soluta assumenda similique exercitationem quae! Pariatur unde odio consectetur nemo.', boardId: 0}]
    }
  },
  methods: {
    // openSideNav(){
    //   this.showSideNav = true;
    // },

    // closeSideNav(){

    //   this.showSideNav = false;
    // },

    // addNewBoard() {
    //   // A dialog pops up asking for board name and description
    //   // Emit an event to home.vue
    // },

    // createNewBoard(){
    //   // Create New Board
    // },

    // accessBoard(eachBoard){
    //   console.log(eachBoard)
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

/* .addNewBoardIcon:hover, .closebtn:hover{
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
  overflow-x: hidden;
  transition: 0.5s;
  padding: 20px;
}

.eachBoardClass:hover{
  cursor: pointer;
  color: #6cc3d5;
} */
</style>
