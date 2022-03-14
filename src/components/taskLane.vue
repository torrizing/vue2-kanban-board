<template>
    <div>
        <div class="card mb-3" :class="bgColor" style="min-height:250px">
            
            <div class="card-header d-flex">
                <h5 class="text-white mt-2">{{ title }}</h5>

                <!-- Edit Card Button -->
                <button type="button" class="btn editCardClass" style="margin-left:auto" data-bs-toggle="modal" data-bs-target="#editCardModal"><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
    
                <!-- Edit Card Dialog -->
                <div class="modal" id="editCardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Card ({{title}})</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="cancelEditCard()" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div>
                                    <label for="card-name" class="col-form-label">Max number of cards<span color="#ff7851">*</span></label>
                                    <input type="number" class="form-control" id="max-card" v-model="maxCardComputed">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <!--  @click="editCard()" -->
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelEditCard()">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="card-body">
                
                <!-- "Add a Card" button  -->
                <!-- data-bs-toggle="modal" data-bs-target="#addCardModal"  -->
                <button type="button" class="btn addCardBtn" :class="btnColor" data-bs-toggle="modal" data-bs-target="#addCardModal" @click="addNewCard()"><font-awesome-icon icon="fa-solid fa-plus" /><span class="ms-1">Add a Card</span></button>
                
                <!-- Each Card Item -->
                <draggable :options="{ group: 'default' }" v-model="draggableItems" :group="{put:ableToDrop}" @change="checkNumCards()">
                    <div v-for="item of items" :key="item.itemId">
                        <taskLaneItem :item="item" :laneId="laneId" :boardId="boardId" @deletedCard="checkNumCards()"></taskLaneItem>
                    </div>
                </draggable>
            </div>
        </div>

        <!-- Add a new card dialog -->
        <div class="modal" id="addCardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add a New Card ({{title}})</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeNewCard()">
                    <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    {{title}}
                    {{laneId}}
                    {{maxCard}}
                    <p class="text-danger" v-if="maxCardReached">Number of cards have reached the maximum. To add more cards in this lane, change the maximum number of cards it can hold.</p>
                    <form>
                        <div class="mb-3 form-group" :class="{ 'has-danger': isInvalid.cardTitle}">
                            <label for="card-name" class="col-form-label">Title<span style="color:#ff7851">*</span></label>
                            <input type="text" class="form-control" :class="{ 'has-danger': isInvalid.cardTitle, 'is-invalid': isInvalid.cardTitle}" id="board-name" @change="checkNewCardForm()" v-model="newCardTitle" :disabled="maxCardReached">
                            <div class="invalid-feedback">Card title is required.</div>
                        </div>
                        <div class="mb-3 form-group" :class="{ 'has-danger': isInvalid.cardDesc}">
                            <label for="card-description" class="col-form-label">Description<span style="color:#ff7851">*</span></label>
                            <textarea class="form-control" :class="{ 'has-danger': isInvalid.cardDesc, 'is-invalid': isInvalid.cardDesc}" id="card-description" @change="checkNewCardForm()" v-model="newCardDesc" :disabled="maxCardReached"></textarea>
                            <div class="invalid-feedback">Card description is required.</div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="createNewCard()" v-if="validForm==false" :disabled="maxCardReached">Add</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createNewCard()" v-else-if="validForm" :disabled="maxCardReached">Add</button>
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


    props: ['maxCard', 'items', 'title', 'laneId', 'bgColor', 'btnColor', 'boardId'],

    data() {
        return {
            newCardTitle: '',
            newCardDesc: '',
            ableToDrop: true,
            // showAddCard: false,
            isInvalid: {
                cardTitle: false,
                cardDesc: false
            },
            validForm: false,
            // child: {
            //     maxCard: this.maxCard
            // }
            oriMaxCard: this.maxCard,
            maxCardReached: false,
            maxCardInputValid: true
        }
    },

    computed: {
        draggableItems: {
            get() {
                return this.items;
            },
            set(items) {
                console.log(items)
                this.$store.commit('updateItems', {
                    items,
                    laneId: this.laneId,
                    boardId: this.boardId
                });
            }
        },

        maxCardComputed: {
            get() {
                console.log("get maxCard:", this.maxCard)
                return this.maxCard;
            },
            set(maxCard) {
                console.log("set maxCard:", maxCard)

                if(maxCard >= 0 && maxCard.length > 0 && maxCard.trim().length != 0){
                    console.log("im going to commit to store")
                    this.$store.commit('editCard', {
                    boardId: this.boardId,
                    laneId: this.laneId,
                    maxCard: maxCard
                    })
                }
                console.log("current maxCard:", this.maxCard)
                return this.maxCard
            }
        }
    },

    methods: {
        addNewCard(){
            console.log(this.laneId)
            if(this.items.length >= this.maxCard){
                this.maxCardReached = true
            }
            else{
                this.maxCardReached = false
            }
        },

        createNewCard() {
            this.newCardTitle = this.newCardTitle.trim()
            this.newCardDesc = this.newCardDesc.trim()

            if(this.newCardTitle.length == 0 && this.newCardDesc.length == 0){
                this.isInvalid.cardTitle = true
                this.isInvalid.cardDesc = true
            }
            else if (this.newCardTitle.length == 0){
                this.isInvalid.cardTitle = true
                this.isInvalid.cardDesc = false
            }
            else if (this.newCardDesc.length == 0){
                this.isInvalid.cardTitle = false
                this.isInvalid.cardDesc = true
            }
            else{
                this.isInvalid.cardTitle = false
                this.isInvalid.cardDesc = false

                console.log(this.boardId)
                console.log("createNewCard: ", this.laneId)

                this.$store.commit('addItem', {
                    text: {boardId: this.boardId, laneId: this.laneId, newCardTitle: this.newCardTitle, newCardDesc: this.newCardDesc},
                })
                this.newCardTitle = ''
                this.newCardDesc = ''
                this.validForm = false
            }

            // if (this.newCardTitle && this.newCardDesc) {
            //     console.log(this.boardId)
            //     console.log("createNewCard: ", this.laneId)

            //     this.$store.commit('addItem', {
            //         text: {boardId: this.boardId, laneId: this.laneId, newCardTitle: this.newCardTitle, newCardDesc: this.newCardDesc},
            //     })
            // }
            // this.newCardTitle = ''
            // this.newCardDesc = ''
        
        },

        closeNewCard(){
            this.newCardTitle = ''
            this.newCardDesc = ''
            this.validForm = false
            this.isInvalid.cardTitle = false
            this.isInvalid.cardDesc = false
        },

        // editCard(){
        //     this.$store.commit('editCard', {
        //         boardId: this.boardId,
        //         laneId: this.laneId,
        //         maxCard: this.child.maxCard
        //     })
        // },

        checkNumCards(){
            console.log(this.laneId + ": " + this.items.length)
            if(this.items.length >= this.maxCard){
                this.ableToDrop = false;
                this.maxCardReached = true;
            }
            else{
                this.ableToDrop = true;
                this.maxCardReached = false;
            }
        },

        checkNewCardForm(){
            this.newCardTitle = this.newCardTitle.trim()
            this.newCardDesc = this.newCardDesc.trim()

            if(this.newCardTitle.length == 0 || this.newCardDesc.length == 0){
                this.validForm = false
            }
            else{
                this.validForm = true

            }
        },

        cancelEditCard(){
            console.log(this.maxCardComputed)
        }
    }
})
</script>

<style scoped>
.addCardBtn:hover{
    cursor: pointer;
}

.editCardClass:hover{
    cursor:pointer;
    background: rgba(0,0,0,0.1);
}
</style>
