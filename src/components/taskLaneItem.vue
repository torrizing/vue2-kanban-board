<template>
    <div>
        <div class="card task-lane-item mb-3">
            <div class="card-block">
                <div class="card-title p-3 mb-0">
                    <h6>{{item.title}}</h6>
                    <div>{{item.description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default ({
    name: 'taskLaneItem',
    props: ['item']
})
</script>

<style scoped>
.card.task-lane-item {
  background: #eaeef1;
}
</style>