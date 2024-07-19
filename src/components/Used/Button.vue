<template>
    <button
        v-if="isButton"
        class="btn hover:shadow-md hover:shadow-black px-4 py-1 max-md:!text-xs max-md:!font-extralight border-none transition flex justify-center items-center uppercase"
        :class="txtColor ? txtColor : 'main_clear-text'"
    >
        <Icon v-if="ico" :icon="ico" :color="icoColor ? icoColor : '#fff'" :height="icoSize ? icoSize : 24" /> {{ txt }}<slot></slot>
    </button>
    <a
        v-else
        target="_blank"
        class="btn hover:shadow-md hover:shadow-black px-4 py-1 max-md:!text-xs max-md:!font-extralight border-none transition flex justify-center items-center"
        :class="txtColor ? txtColor : 'main_clear-text'"
        :href="url"
    >
        <Icon v-if="ico" :icon="ico" :color="icoColor ? icoColor : '#fff'" :height="icoSize ? icoSize : 24" /> {{ txt }}<slot></slot>
    </a>
</template>

<script setup>
import { ref, toRefs, shallowRef } from 'vue'
// get icons
import { Icon } from '@iconify/vue'

// get props values
const props = defineProps({
    isButton: Boolean,
    url: [URL, String],
    txt: String,
    ico: String,
    icoColor: String, // colors same like this: #fff [for fill color of icons]
    txtColor: String,
    icoSize: Number // accept only numbers for (icon px)
})
const { isButton, url, txt, ico, icoColor, txtColor, icoSize } = toRefs(props)
</script>

<style lang="scss" scoped>
@mixin center($extend: true) {
    @if $extend {
        @extend %center;
    } @else {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}

%center {
    @include center($extend: false);
}

.btn {
    position: relative;
    background: #1f1f1f;
    color: #fff;
    font-size: small;
    font-family: 'Raleway', sans-serif;
    transition: 0.6s;
    overflow: hidden;

    &:focus {
        outline: 0;
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        background: rgba(255, 255, 255, 0.72);
        width: 60px;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.5;
        filter: blur(30px);
        transform: translateX(-100px) skewX(-15deg);
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        background: rgba(255, 255, 255, 0.2);
        width: 30px;
        height: 100%;
        left: 30px;
        top: 0;
        opacity: 0;
        filter: blur(5px);
        transform: translateX(-100px) skewX(-15deg);
    }

    &:hover {
        background: #41464b;
        color: #d0d0d0;
        cursor: pointer;

        &:before {
            transform: translateX(300px) skewX(-15deg);
            opacity: 0.6;
            transition: 0.7s;
        }

        &:after {
            transform: translateX(300px) skewX(-15deg);
            opacity: 1;
            transition: 0.7s;
        }
    }
}
</style>