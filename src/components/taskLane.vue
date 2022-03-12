<template>
    <div>
        <div class="card mb-3" :class="bgColor" style="min-height:250px">

            <div class="card-header d-flex">
                <h5 class="text-white mt-2">{{ title }}</h5>
                <!-- <span style="margin-left:auto" class="text-white mt-2 editCardIcon"><font-awesome-icon icon="fa-solid fa-ellipsis" /></span> -->
                <button type="button" class="btn editCard" style="margin-left:auto"><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
            </div>
            
            <div class="card-body">
                <!-- "Add a Card" button -->
                <button type="button" class="btn addCardBtn" :class="btnColor" data-bs-toggle="modal" data-bs-target="#addCardModal" @click="addNewCard(laneId)"><font-awesome-icon icon="fa-solid fa-plus" /><span class="ms-1">Add a Card</span></button>
                
                <!-- Each Card Item -->
                <draggable :options="{ group: 'default' }">
                    <div v-for="item in items" :key="item.id">
                        <taskLaneItem :item="item"></taskLaneItem>
                    </div>
                </draggable>
            </div>
            
        </div>

        <div :data-bs-whatever="laneId" class="modal" id="addCardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add a New Card</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeNewCard()">
                    <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="mb-3">
                        <label for="card-name" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="board-name" v-model="newCardTitle">
                    </div>
                    <div class="mb-3">
                        <label for="card-description" class="col-form-label">Description:</label>
                        <textarea class="form-control" id="card-description" v-model="newCardDesc"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createNewCard()">Add</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeNewCard()">Cancel</button>
                </div>
                </div>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import taskLaneItem from './taskLaneItem.vue'

export default ({
    name: 'taskLane',

    components: {
        draggable,
        taskLaneItem
    },

    props: ['items', 'title', 'laneId', 'bgColor', 'btnColor', 'boardId'],

    data() {
        return {
            newCardTitle: '',
            newCardDesc: ''
        }
    },

    methods: {
        addNewCard(laneId){
            console.log(laneId)
        },

        createNewCard() {
            if (this.newCardTitle && this.newCardDesc) {
                console.log(this.boardId)
                this.$store.commit('addItem', {
                    text: {boardId: this.boardId, laneId: this.laneId, newCardTitle: this.newCardTitle, newCardDesc: this.newCardDesc},
                })
            }
            this.newCardTitle = ''
            this.newCardDesc = ''
        
        },

        closeNewCard(){
            this.newCardTitle = ''
            this.newCardDesc = ''

        }


    }
})
</script>

<style scoped>
.addCardBtn:hover{
    cursor: pointer;
}

.editCard:hover{
    cursor:pointer;
    background: rgba(0,0,0,0.1);
}
</style>
