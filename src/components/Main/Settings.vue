<template>
  <div class="SettingsComp z-[25000]">
    <!-- Head Settings -->
    <div
      class="head bg-white h-screen fixed left-0 top-0 max-sm:hidden"
      :class="open ? 'w-[300px]' : 'w-[50px]'"
    >
      <!-- <div class="logoOwn fixed left-1/2 -translate-x-1/2 top-2 z-[30000]">
                <div class="image p-2 w-[45px] h-[45px] rounded-full bg-transparent"
                    style="box-shadow: inset 0 0 7px #f7f7f7c2;">
                    <img src="@/assets/logo.png" class="w-full h-full object-cover" alt="">
                </div>
            </div> -->
      <input type="checkbox" v-model="cursor_magic_work" />
    </div>
  </div>

  <CursorMagic :work="cursor_magic_work" />
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'

// get components
import CursorMagic from '@/components/Used/CursorMagic.vue'

const open = ref(false)

// setting options
const cursor_magic_work = ref(true)
</script>

<style lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>