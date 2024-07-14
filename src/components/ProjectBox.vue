<template>
    <div
        class="box_card p-1 bg-white shadow-sm shadow-black hover:!scale-110 transition-transform relative overflow-hidden">
        <!-- Image -->
        <div class="w-full h-4/5">
            <img class="w-full h-full object-cover" :src="list.image == ''
                ? getImageUrl('assets/projects/undifBack.png')
                : getImageUrl(list.image)
                " loading="lazy" :alt="list.name">
        </div>

        <!-- Name -->
        <div class="w-full h-max flex flex-col gap-1 p-2">
            <div class="text-black text-center text-sm font-extralight truncate">{{ list.name }}</div>
            <div v-if="list.status" :class="statusColors[list.status]" style="font-family: cursive;"
                class="absolute -right-20 top-10 rotate-45 w-[300px] h-max py-2 flex justify-center items-center text-white font-bold">
                {{ list.status }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue';
import Button from '@/components/Button.vue';
import { getImageUrl } from '@/models/work.js';
// get props values
const props = defineProps({
    list: [Array, Object],
})
const { list } = toRefs(props);

// Projects Status Colors
const statusColors = ref({
    pending: "bg-yellow-500 hover:bg-yellow-600", // orange yellow
    done: "bg-red-500 hover:bg-red-600", // red
    updated: "bg-blue-500 hover:bg-blue-600", // blue
});


</script>

<style lang="scss"></style>