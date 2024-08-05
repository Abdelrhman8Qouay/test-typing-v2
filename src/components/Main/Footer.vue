<script setup>
import { ref } from 'vue'

import { useSettingStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { compo_game_setting } = storeToRefs(useSettingStore())
</script>

<template>
    <div class="footer w-full">
        <div class="container">
            <!-- Keys Used -->
            <div class="w-full h-max flex justify-center items-center mt-10">
                <div class="flex flex-col gap-2">
                    <div class="text-[var(--text)] text-sm flex justify-center items-center gap-1">
                        <div class="bg-[var(--sub)] rounded px-2 py-1 text-[var(--text)]">{{ compo_game_setting.behavior['quick restart'].as }}</div>
                        key - restart test
                    </div>
                    <!-- <div class="text-[var(--text)] text-sm">
                            <div class="bg-[var(--sub)] rounded-md px-2 py-1 text-[var(--text)]">{{ compo_game_setting.behavior['quick restart'].as }}</div>
                            restart test
                        </div> -->
                </div>
            </div>

            <!-- About Owner -->
            <div class="w-full h-full flex justify-center items-center p-3 mt-10">
                <p class="text-[var(--text)]">
                    Created By <a class="text-[var(--highlight)] font-semibold" target="_blank" href="https://abdelrhmanqouayportfolio.netlify.app/"> -Abdelrhman Ashraf- </a> With 💖
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>