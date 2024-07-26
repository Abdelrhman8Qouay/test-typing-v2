
<template>
    <div class="modal modalBox">
        <div class="box">
            <!-- Content here... -->
            <slot />
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss">
.modal {
    background: rgba(0, 0, 0, 0.5);
    // .box {

    // }
}
</style>