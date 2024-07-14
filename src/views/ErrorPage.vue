
<template>
    <div class="PageNotFound">
        <div class="containing m-5 mt-20">
            <!-- <div class="loading__container glitch">
                <img src="@/assets/logo.png" alt="">
                <div class="glitch__layers">
                    <div class="glitch__layer"></div>
                    <div class="glitch__layer"></div>
                    <div class="glitch__layer"></div>
                </div>
            </div> -->

            <div class="hero-container">
                <h2 class="hero glitch layers" data-text="404 Page Not Found"><span>404 Page Not Found</span></h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// onMounted(() => {
//     var root = document.querySelector(':root');
//     setTimeout(() => {
//         root.style.setProperty('--pg', 40);
//         setTimeout(() => {
//             root.style.setProperty('--pg', 60);
//             setTimeout(() => root.style.setProperty('--pg', 100), 1500); // after 2s make progress loader 100
//         }, 1000); // after 2s make progress loader 60
//     }, 2000); // after 2s make progress loader 40
// })
</script>

<style lang="scss">
body {
    background: #333 !important;
}

#app.animate {
    opacity: 0;
}

.containing {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 45px;
    width: 100%;
    height: 100%;
}

.glitch {
    position: relative;
    overflow: hidden;
}

.glitch img {
    position: relative;
    z-index: 1;
    display: block;
}

.glitch__layers {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.glitch__layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(@/assets/logo.png);
    background-repeat: no-repeat;
    background-position: 0 0;
}

.glitch__layer:nth-child(1) {
    transform: translateX(-5%);
    animation: glitch-anim-1 2s infinite linear alternate;
}

.glitch__layer:nth-child(2) {
    transform: translateX(3%) translateY(3%);
    animation: glitch-anim-2 2.3s -0.8s infinite linear alternate;
}

.glitch__layer:nth-child(3) {
    transform: translateX(5%);
    animation: glitch-anim-flash 1s infinite linear;
}

@keyframes glitch-anim-1 {
    0% {
        clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%);
    }

    10% {
        clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }

    20% {
        clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }

    30% {
        clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }

    40% {
        clip-path: polygon(0 35%, 100% 35%, 100% 35%, 0 35%);
    }

    50% {
        clip-path: polygon(0 45%, 100% 45%, 100% 46%, 0 46%);
    }

    60% {
        clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%);
    }

    70% {
        clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }

    80% {
        clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }

    90% {
        clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }

    100% {
        clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
    }
}

@keyframes glitch-anim-2 {
    0% {
        clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
    }

    15% {
        clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    }

    25% {
        clip-path: polygon(0 8%, 100% 8%, 100% 20%, 0 20%);
    }

    30% {
        clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }

    45% {
        clip-path: polygon(0 45%, 100% 45%, 100% 45%, 0 45%);
    }

    50% {
        clip-path: polygon(0 50%, 100% 50%, 100% 57%, 0 57%);
    }

    65% {
        clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }

    75% {
        clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }

    80% {
        clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
    }

    95% {
        clip-path: polygon(0 45%, 100% 45%, 100% 60%, 0 60%);
    }

    100% {
        clip-path: polygon(0 11%, 100% 11%, 100% 15%, 0 15%);
    }
}

@keyframes glitch-anim-flash {
    0% {
        opacity: 0.2;
    }

    30%,
    100% {
        opacity: 0;
    }
}

// Text Glitch

.hero {
    font-size: clamp(20px, 5vw, 50px);
    line-height: 1;
    display: inline-block;
    color: #fff;
    z-index: 2;
    letter-spacing: 10px;

    /* Bright things in dark environments usually cast that light, giving off a glow */
    filter: drop-shadow(0 1px 3px);
}

.glitch span {
    animation: paths 5s step-end infinite;
}

.glitch::before {
    animation: paths 5s step-end infinite, opacity 5s step-end infinite, font 8s step-end infinite, movement 10s step-end infinite;
}

.glitch::after {
    animation: paths 5s step-end infinite, opacity 5s step-end infinite, font 7s step-end infinite, movement 8s step-end infinite;
}

.hero-container {
    position: relative;
    padding: 50px 0;
    text-align: center;
}

.paths {
    animation: paths 5s step-end infinite;
}

@keyframes paths {
    0% {
        clip-path: polygon(
            0% 43%,
            83% 43%,
            83% 22%,
            23% 22%,
            23% 24%,
            91% 24%,
            91% 26%,
            18% 26%,
            18% 83%,
            29% 83%,
            29% 17%,
            41% 17%,
            41% 39%,
            18% 39%,
            18% 82%,
            54% 82%,
            54% 88%,
            19% 88%,
            19% 4%,
            39% 4%,
            39% 14%,
            76% 14%,
            76% 52%,
            23% 52%,
            23% 35%,
            19% 35%,
            19% 8%,
            36% 8%,
            36% 31%,
            73% 31%,
            73% 16%,
            1% 16%,
            1% 56%,
            50% 56%,
            50% 8%
        );
    }

    5% {
        clip-path: polygon(
            0% 29%,
            44% 29%,
            44% 83%,
            94% 83%,
            94% 56%,
            11% 56%,
            11% 64%,
            94% 64%,
            94% 70%,
            88% 70%,
            88% 32%,
            18% 32%,
            18% 96%,
            10% 96%,
            10% 62%,
            9% 62%,
            9% 84%,
            68% 84%,
            68% 50%,
            52% 50%,
            52% 55%,
            35% 55%,
            35% 87%,
            25% 87%,
            25% 39%,
            15% 39%,
            15% 88%,
            52% 88%
        );
    }

    30% {
        clip-path: polygon(
            0% 53%,
            93% 53%,
            93% 62%,
            68% 62%,
            68% 37%,
            97% 37%,
            97% 89%,
            13% 89%,
            13% 45%,
            51% 45%,
            51% 88%,
            17% 88%,
            17% 54%,
            81% 54%,
            81% 75%,
            79% 75%,
            79% 76%,
            38% 76%,
            38% 28%,
            61% 28%,
            61% 12%,
            55% 12%,
            55% 62%,
            68% 62%,
            68% 51%,
            0% 51%,
            0% 92%,
            63% 92%,
            63% 4%,
            65% 4%
        );
    }

    45% {
        clip-path: polygon(
            0% 33%,
            2% 33%,
            2% 69%,
            58% 69%,
            58% 94%,
            55% 94%,
            55% 25%,
            33% 25%,
            33% 85%,
            16% 85%,
            16% 19%,
            5% 19%,
            5% 20%,
            79% 20%,
            79% 96%,
            93% 96%,
            93% 50%,
            5% 50%,
            5% 74%,
            55% 74%,
            55% 57%,
            96% 57%,
            96% 59%,
            87% 59%,
            87% 65%,
            82% 65%,
            82% 39%,
            63% 39%,
            63% 92%,
            4% 92%,
            4% 36%,
            24% 36%,
            24% 70%,
            1% 70%,
            1% 43%,
            15% 43%,
            15% 28%,
            23% 28%,
            23% 71%,
            90% 71%,
            90% 86%,
            97% 86%,
            97% 1%,
            60% 1%,
            60% 67%,
            71% 67%,
            71% 91%,
            17% 91%,
            17% 14%,
            39% 14%,
            39% 30%,
            58% 30%,
            58% 11%,
            52% 11%,
            52% 83%,
            68% 83%
        );
    }

    76% {
        clip-path: polygon(
            0% 26%,
            15% 26%,
            15% 73%,
            72% 73%,
            72% 70%,
            77% 70%,
            77% 75%,
            8% 75%,
            8% 42%,
            4% 42%,
            4% 61%,
            17% 61%,
            17% 12%,
            26% 12%,
            26% 63%,
            73% 63%,
            73% 43%,
            90% 43%,
            90% 67%,
            50% 67%,
            50% 41%,
            42% 41%,
            42% 46%,
            50% 46%,
            50% 84%,
            96% 84%,
            96% 78%,
            49% 78%,
            49% 25%,
            63% 25%,
            63% 14%
        );
    }

    90% {
        clip-path: polygon(
            0% 41%,
            13% 41%,
            13% 6%,
            87% 6%,
            87% 93%,
            10% 93%,
            10% 13%,
            89% 13%,
            89% 6%,
            3% 6%,
            3% 8%,
            16% 8%,
            16% 79%,
            0% 79%,
            0% 99%,
            92% 99%,
            92% 90%,
            5% 90%,
            5% 60%,
            0% 60%,
            0% 48%,
            89% 48%,
            89% 13%,
            80% 13%,
            80% 43%,
            95% 43%,
            95% 19%,
            80% 19%,
            80% 85%,
            38% 85%,
            38% 62%
        );
    }

    1%,
    7%,
    33%,
    47%,
    78%,
    93% {
        clip-path: none;
    }
}

@keyframes movement {
    0% {
        top: 0px;
        left: -20px;
    }

    15% {
        top: 10px;
        left: 10px;
    }

    60% {
        top: 5px;
        left: -10px;
    }

    75% {
        top: -5px;
        left: 20px;
    }

    100% {
        top: 10px;
        left: 5px;
    }
}
</style>