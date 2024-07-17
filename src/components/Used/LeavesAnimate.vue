
<template>
    <div id="leaves">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '../../assets/css/mixins';

/* leaf animations Start */
#leaves {
    @include wh-custom(100vw, 120vh);
    position: fixed;
    top: -50px;
    left: 0;
    text-align: right;
    z-index: 1;

    i {
        display: inline-block;
        width: 200px;
        height: 150px;
        background: linear-gradient(to bottom right, #309900, #005600);
        transform: skew(20deg);
        @include rounded-custom(5% 40% 70%);
        box-shadow: inset 0px 0px 1px #222;
        border: 1px solid #333;
        -webkit-animation: falling 5s 0s infinite;
        z-index: 500;
        &:nth-of-type(2n) {
            -webkit-animation: falling2 5s 0s infinite;
        }
        &:nth-of-type(3n) {
            -webkit-animation: falling3 5s 0s infinite;
        }
        &:before {
            position: absolute;
            content: '';
            top: 117px;
            right: 9px;
            height: 27px;
            width: 32px;
            transform: rotate(49deg);
            @include rounded-custom(0% 15% 15% 0%);
            border-top: 1px solid #222;
            border-bottom: 1px solid #222;
            border-left: 0px solid #222;
            border-right: 1px solid #222;
            background: linear-gradient(to right, rgba(0, 100, 0, 1), #005600);
            z-index: 500;
        }
        &:after {
            content: '';
            height: 125px;
            width: 10px;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
            display: block;
            transform: rotate(125deg);
            position: absolute;
            left: 85px;
            border-radius: 50%;
        }

        &:nth-of-type(n) {
            height: 23px;
            width: 30px;
        }
        &:nth-of-type(n):before {
            width: 7px;
            height: 5px;
            top: 17px;
            right: 1px;
        }
        &:nth-of-type(n):after {
            width: 2px;
            height: 17px;
            left: 12px;
            top: 0px;
        }

        &:nth-of-type(2n + 1) {
            height: 11px;
            width: 16px;
        }
        &:nth-of-type(2n + 1):before {
            width: 4px;
            height: 3px;
            top: 7px;
            right: 0px;
        }
        &:nth-of-type(2n + 1):after {
            width: 2px;
            height: 6px;
            left: 5px;
            top: 1px;
        }

        &:nth-of-type(3n + 2) {
            height: 17px;
            width: 23px;
        }
        &:nth-of-type(3n + 2):before {
            height: 4px;
            width: 4px;
            top: 12px;
            right: 1px;
        }
        &:nth-of-type(3n + 2):after {
            height: 10px;
            width: 2px;
            top: 1px;
            left: 8px;
        }

        &:nth-of-type(n) {
            -webkit-animation-delay: 1.9s;
        }
        &:nth-of-type(2n) {
            -webkit-animation-delay: 3.9s;
        }
        &:nth-of-type(3n) {
            -webkit-animation-delay: 2.3s;
        }
        &:nth-of-type(4n) {
            -webkit-animation-delay: 4.4s;
        }
        &:nth-of-type(5n) {
            -webkit-animation-delay: 5s;
        }
        &:nth-of-type(6n) {
            -webkit-animation-delay: 3.5s;
        }
        &:nth-of-type(7n) {
            -webkit-animation-delay: 2.8s;
        }
        &:nth-of-type(8n) {
            -webkit-animation-delay: 1.5s;
        }
        &:nth-of-type(9n) {
            -webkit-animation-delay: 3.3s;
        }
        &:nth-of-type(10n) {
            -webkit-animation-delay: 2.5s;
        }
        &:nth-of-type(11n) {
            -webkit-animation-delay: 1.2s;
        }
        &:nth-of-type(12n) {
            -webkit-animation-delay: 4.1s;
        }
        &:nth-of-type(13n) {
            -webkit-animation-delay: 1s;
        }
        &:nth-of-type(14n) {
            -webkit-animation-delay: 4.7s;
        }
        &:nth-of-type(15n) {
            -webkit-animation-delay: 3s;
        }

        &:nth-of-type(n) {
            background: linear-gradient(to bottom right, #309900, #005600);
        }
        &:nth-of-type(2n + 2) {
            background: linear-gradient(to bottom right, #5e9900, #2b5600);
        }
        &:nth-of-type(4n + 1) {
            background: linear-gradient(to bottom right, #990, #564500);
        }

        &:nth-of-type(n) {
            opacity: 0.7;
        }
        &:nth-of-type(3n + 1) {
            opacity: 0.5;
        }
        &:nth-of-type(3n + 2) {
            opacity: 0.3;
        }

        &:nth-of-type(n) {
            transform: rotate(180deg);
        }

        &:nth-of-type(n) {
            -webkit-animation-timing-function: ease-in-out;
        }
    }
}

@keyframes falling {
    0% {
        -webkit-transform: translate3d(300, 0, 0) rotate(0deg);
    }

    100% {
        -webkit-transform: translate3d(-350px, 700px, 0) rotate(90deg);
        opacity: 0;
    }
}

@keyframes falling3 {
    0% {
        -webkit-transform: translate3d(0, 0, 0) rotate(-20deg);
    }

    100% {
        -webkit-transform: translate3d(-230px, 640px, 0) rotate(-70deg);
        opacity: 0;
    }
}

@keyframes falling2 {
    0% {
        -webkit-transform: translate3d(0, 0, 0) rotate(90deg);
    }

    100% {
        -webkit-transform: translate3d(-400px, 680px, 0) rotate(0deg);
        opacity: 0;
    }
}
/* leaf animations End */
</style>
