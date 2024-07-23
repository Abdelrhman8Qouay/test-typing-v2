// ==================== Active functions ====================
// for sound -----------------
export function playAudio(aud, audioLoop = false) {
    if (!aud || aud == 'off' || aud == 'hide') return
    // Remove any existing 'ended' event listeners to prevent multiple loops
    aud.removeEventListener('ended', onAudioEnded)

    if (audioLoop) {
        aud.addEventListener('ended', onAudioEnded)
        aud.preload = 'auto' // Preload the audio
    }

    aud.volume = 0.4

    aud.play()
}
export function onAudioEnded() {
    this.currentTime = 0
    this.play().catch((error) => {
        console.error('Looped audio playback failed:', error)
    })
}
export function playClick(path, vol = 0.4) {
    if (!path || path == 'off' || path == 'hide') return

    let aud = new Audio(path)
    aud.volume = vol
    aud.play()
}
export function pauseEle(ele) {
    if (!ele) return
    ele.pause()
    ele.currentTime = 0 // Reset the audio to the start
}

// for characters handles -----------------
export function isSpaceChar(str) {
    return / [^ ]*$/.test(str)
}

export function capitalizeFirstChar(str) {
    if (str.length === 0) {
        return str // Return empty string if input is empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// for class handles -----------------
export function hasClass(el, className) {
    // if(!el) return false;

    if (el.classList) return el.classList.contains(className)
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export function addClass(el, className) {
    // if(!el) return false;

    if (el.classList) el.classList.add(className)
    else if (!hasClass(el, className)) el.className += ' ' + className
}

export function removeClass(el, className) {
    // if(!el) return false;

    if (el.classList) el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}

export function toggleClass(el, className) {
    if (el.classList) el.classList.toggle(className)
    else {
        if (hasClass(el, className)) {
            removeClass(el, className)
        } else addClass(el, className)
    }
}

// for fetch data -----------------
export async function fetchData(filePath) {
    try {
        const response = await fetch(filePath)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching the JSON file:', error)
    }
}

// ==================== functions for DOM ====================
// --------------- Input Process ---------------
// focus the input
export function focusInput(eleInput) {
    eleInput.focus()
}

export function makeNoScroll(ifTrue) {
    let body = document.body
    if (ifTrue) {
        // if true >> make No scroll
        addClass(body, 'noscroll')
    } else {
        removeClass(body, 'noscroll')
    }
}

// ==================== FUnctions for Vue ====================
export function getImageUrl(urlName) {
    return new URL(`../${urlName}`, import.meta.url)
}

export function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
