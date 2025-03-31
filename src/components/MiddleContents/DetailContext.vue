<template>
    <div class="container font-mix">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="action">
            <slot name="action"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
        <div class="copyright">
            <slot name="copyright"></slot>
        </div>
        <div class="author">
            <slot name="author"></slot>
        </div>
        <div class="license">
            <slot name="license"></slot>
        </div>
        <div class="version">
            <slot name="version"></slot>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
div.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

div.title {
    font-size: xx-large;
    font-weight: bold;
    color: #2a2a2a;
}

div.content {
    font-size: large;
    color: #5a5959;
    margin: 0 20px 20px 20px;
    white-space: pre-line;
    text-align: left;
    max-width: 70%;
    line-height: 1.5;
}

div.action {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    max-width: 0px;
    max-height: 40px;
}

div.action:hover {
    transform: scale(1.03);
    transition-duration: 0.3s;
}

div.footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #767676;
    font-size: 12px;
}
</style>