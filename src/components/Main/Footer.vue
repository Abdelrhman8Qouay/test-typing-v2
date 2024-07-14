<script setup>
import { ref } from 'vue'

const madeIn = ref(new Date().getFullYear())
</script>

<template>
    <div class="parent w-full p-3 !mt-80">
        <div class="container h-full">
            <div class="flex justify-between items-center gap-5 w-full">
                <!-- Copyright -->
                <div class="text-start p-1 text-white font-light text-sm flex flex-col">
                    © {{ madeIn }} Copyright:
                    <a class="text-gray-400 hover:text-white text-base transition" href="https://www.facebook.com/profile.php?id=100090009622327">Abdelrhman Ashraf (Qouay)</a>
                </div>
                <!-- Copyright -->

                <div class="">
                    <a href="https://www.facebook.com/profile.php?id=100090009622327" target="_blank" class="text-white">
                        <img class="w-8 aspect-square object-cover hover:opacity-70 transition-all" src="@/assets/logo.png" alt="owner avatar" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>