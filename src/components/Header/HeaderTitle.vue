<template>
    <div class="container">
        <h1 class="title font-mix">
            <slot name="title-en"></slot>
        </h1>
        <h1 class="title font-mix">
            <slot name="title-cn"></slot>
        </h1>
    </div>
</template>

<style scoped>
h1.title {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #63b3ed 0%, #48bb78 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}
</style>