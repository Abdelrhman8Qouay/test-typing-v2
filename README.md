# My testType Game | v2

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

---

# Project Commands Used

```sh
npm create vue@latest
```

[create the new vue project]

```sh
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

[install tailwind to the project]

```sh
npx tailwindcss init -p
```

[generate your tailwind.config.js and postcss.config.js files:]

```sh
npm install sass
```

[to use scss language of (css language) style with vue style]

```sh
npm i aos
```

[install aos library, that make fade animation with scrolling & loading ( to show doc: https://michalsnik.github.io/aos/ ) ]

## Vite Commands Used

```sh
npm i vite-plugin-compression -D
```

[install vite-plugin-compression to compress the site ]

### Install Iconify >> for all icons with various of libs

```sh
npm install @iconify/vue
```

[to install and use the icons with vue (iconify)]

```vue
<template>
    <div>
        <Icon icon="ic:outline-arrow-right" color="red" height="60" />
        you can use more of libs with iconify not only (ic)
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
</script>
```

### Install webfontloader >> for various of fonts used as auto-import

```sh
npm install webfontloader
```

[to install and use it]

1. make the function that is loading the font as auto-import:
   // in 'src/utils/functions.js' js file
   import WebFont from 'webfontloader'

```vue
export function loadFont(fontName) { WebFont.load({ google: { families: [fontName] } }) } 2. use it in the app (use the var of the css to read it):
<template>
    <div :style="'--f-fam: ' + fontName"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { loadFont } from '@/utils/'

const fontName = ref('Roboto')

onMounted(() => {
    loadFont(fontName.value)
})

function showFont(font) {
    fontName.value = font
    loadFont(fontName.value)
}
</script>

<style>
* {
    font-family: var(--f-fam);
}
</style>
```

```sh
npm install diacritics
```

[To replace accents, diacritics, and special characters with their normal letter equivalents]

```javascript
import { remove as removeDiacritics } from 'diacritics'

async function replaceSpecialCharacters() {
    const text = await getParagraph()
    const normalizedText = removeDiacritics(text)
    console.log(normalizedText)
}

replaceSpecialCharacters()
```

```sh
npm install pinia-plugin-persistedstate
```

[to persist state of the setting or any else for the stores of the project]
