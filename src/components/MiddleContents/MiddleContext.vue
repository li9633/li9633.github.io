<template>
    <div class="container font-mix">
        <div class="middle-container">
            <div class="middle-context-item" v-for="(item) in itemList" :key="item">
                <div class="header color-mix">
                    <img v-if="item.icon" :src="item.icon" alt="">
                    <img v-else src="/img/default.svg" alt="">
                    <span>{{ item.name }}</span>
                </div>
                <hr>
                <div class="content">
                    <p>{{ item.descEN }}</p>
                    <p>{{ item.descCN }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        itemList: {
            type: Array,
            required: true
        }
    }
}


</script>

<style scoped>
div.container {
    padding-left: 50px;
    padding-right: 50px;
}

div.header {
    display: flex;
    column-gap: 5px;
    align-items: center;
    font-size: large;
    font-weight: bold;
    margin-top: 5px;
    margin-left: 5px;
    text-shadow: 1px 1px 0.1px rgba(108, 179, 142, 0.2);
}

div.header img {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

div.content {
    padding: 10px;
    font-size: 14px;
}


div.middle-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 230px;
    gap: 15px;
    padding: 0 100px;
}

div.middle-context-item {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    transition-duration: 0.3s;
}

div.middle-context-item:hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
    transition-delay: 0.2ms;
}
</style>