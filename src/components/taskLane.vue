<template>
    <div>
        <div class="card mb-3" :class="bgColor" style="min-height:250px">
            <h5 class="card-header text-white text-center">{{ title }}</h5>
            <div class="card-body">
                <button type="button" @click="addCard()" class="btn addCardBtn" :class="btnColor"><font-awesome-icon icon="fa-solid fa-plus" /><span class="ml-1">Add a Card</span></button>
                <draggable :options="{ group: 'default' }">
                    <div v-for="item in items" :key="item.id">
                        <taskLaneItem :item="item"></taskLaneItem>
                    </div>
                </draggable>
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

    props: ['items', 'title', 'id', 'bgColor', 'btnColor'],

    methods: {
        addCard() {
            console.log(this.title)
        }
    }
})
</script>

<style scoped>
.addCardBtn:hover{
    cursor: pointer;
}
</style>
