<template>
    <div>
        <div class="card task-lane-item mb-3">
            <div class="card-block">
                <div class="card-title p-3 mb-0">
                    <div class="d-flex" style="justify-content:space-between">
                        <h6>{{item.title}}</h6>
                        <span><font-awesome-icon @click="deleteCard()" class="pb-2 deleteCardIcon" icon="fa-solid fa-trash" color="lightcoral"/></span>
                    </div>
                    <div>{{item.description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default ({
    name: 'taskLaneItem',
    props: ['item'],

    methods: {
        deleteCard(){
            
        }
    }
})
</script>

<style scoped>
.card.task-lane-item {
  background: #eaeef1;
}

.deleteCardIcon:hover{
    cursor: pointer;
}
</style>