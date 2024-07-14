<template>
    <button
        v-if="isButton"
        class="btn hover:shadow-md hover:shadow-black px-4 py-1 max-md:!text-xs max-md:!font-extralight border-none transition flex justify-center items-center uppercase"
        :class="txtColor ? txtColor : 'main_clear-text'"
    >
        <component v-if="ico" class="mx-1 inline-block" :fillColor="icoColor ? icoColor : '#fff'" :size="icoSize" :is="Icons"> </component>{{ txt }}<slot></slot>
    </button>
    <a
        v-else
        target="_blank"
        class="btn hover:shadow-md hover:shadow-black px-4 py-1 max-md:!text-xs max-md:!font-extralight border-none transition flex justify-center items-center"
        :class="txtColor ? txtColor : 'main_clear-text'"
        :href="url"
    >
        <component v-if="ico" class="mx-1 inline-block" :fillColor="icoColor ? icoColor : '#fff'" :size="icoSize ? icoSize : 24" :is="Icons"> </component> {{ txt }}<slot></slot>
    </a>
</template>

<script setup>
import { ref, defineProps, toRefs, shallowRef } from 'vue'
// get icons
import Account from 'vue-material-design-icons/Account.vue'
import Email from 'vue-material-design-icons/Email.vue'
import Message from 'vue-material-design-icons/Message.vue'
import Phone from 'vue-material-design-icons/Phone.vue'
import Disc from 'vue-material-design-icons/Disc.vue'
import Map from 'vue-material-design-icons/Map.vue'
import Eye from 'vue-material-design-icons/Eye.vue'
import Code from 'vue-material-design-icons/Xml.vue'
import KeyboardVariant from 'vue-material-design-icons/KeyboardVariant.vue'

import Facebook from 'vue-material-design-icons/Facebook.vue'
import Twitter from 'vue-material-design-icons/Twitter.vue'
import Github from 'vue-material-design-icons/Github.vue'
import Linkedin from 'vue-material-design-icons/Linkedin.vue'

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

// handle the icons to work
const Icons = shallowRef(null)
if (ico.value === 'account') Icons.value = Account
else if (ico.value === 'email') Icons.value = Email
else if (ico.value === 'phone') Icons.value = Phone
else if (ico.value === 'message') Icons.value = Message
else if (ico.value === 'disc') Icons.value = Disc
else if (ico.value === 'map') Icons.value = Map
else if (ico.value === 'eye') Icons.value = Eye
else if (ico.value === 'code') Icons.value = Code
else if (ico.value === 'keyboard-variant') Icons.value = KeyboardVariant
else if (ico.value === 'facebook') Icons.value = Facebook
else if (ico.value === 'twitter') Icons.value = Twitter
else if (ico.value === 'github') Icons.value = Github
else if (ico.value === 'linkedin') Icons.value = Linkedin
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