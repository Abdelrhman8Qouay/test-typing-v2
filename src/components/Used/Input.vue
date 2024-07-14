<script setup>
import { ref, defineProps, toRefs, shallowRef } from 'vue';
// get icons
import Account from 'vue-material-design-icons/Account.vue';
import Email from 'vue-material-design-icons/Email.vue';
import Phone from 'vue-material-design-icons/Phone.vue';
import Message from 'vue-material-design-icons/Message.vue';

// get props values
const props = defineProps({
    require: Boolean,
    type: String,
    title: String,
    name: String,
    limit: String || Number,
    ico: String,
})
const { require, type, title, name, limit, ico } = toRefs(props);

// handle the icons to work
// const Icons = shallowRef(null);
// if (ico.value === 'account') Icons.value = Account;
// else if (ico.value === 'email') Icons.value = Email;
// else if (ico.value === 'phone') Icons.value = Phone;
// else if (ico.value === 'message') Icons.value = Message;

const isFocus = ref(false);
const valueInput = ref('');
</script>


<template>
    <div class="inputBox" v-if="type !== 'textarea'" @focusin="isFocus = true" @focusout="isFocus = false">
        <input :type="type" :name="name" :maxlength="limit" :required="require" @invalid="isFocus = false"
            @input="$emit('inp', valueInput)" v-model="valueInput">
        <span class="snap">
            <span>{{ title
            }}</span>
        </span>
    </div>
    <div class="inputBox" v-else @focusin="isFocus = true" @focusout="isFocus = false">
        <textarea :name="name" :maxlength="limit" :required="require" @invalid="isFocus = false"
            @input="$emit('inp', valueInput)" v-model="valueInput"></textarea>
        <span class="snap">
            <span>{{ title
            }}</span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
.inputBox {
    width: 100%;
    position: relative;
}

.inputBox input,
.inputBox textarea {
    width: 100%;
    outline: none;
    padding: 10px;
    border: 1px solid rgb(53, 53, 53);
    background: var(--ground-color);
    border-radius: 5px;
    color: var(--white);
    font-size: 1em;
    transition: var(--hover-trans);
}

.inputBox .snap {
    position: absolute;
    left: 0;
    pointer-events: none;
    padding: 10px;
    color: var(--white);
    font-size: 1em;
    text-transform: uppercase;
    transition: var(--hover-trans);
}

.inputBox input:focus~.snap,
.inputBox input:valid~.snap,
.inputBox textarea:valid~.snap,
.inputBox textarea:focus~.snap {
    color: var(--main);
    transform: translateX(10px) translateY(-7px);
    font-size: 0.65em;
    padding: 0 10px;
    letter-spacing: 0.2em;
    border-radius: 5px;
    background-color: var(--ground-color);
}

.inputBox input:focus,
.inputBox textarea:focus {
    border: 1px solid var(--main);
}
</style>