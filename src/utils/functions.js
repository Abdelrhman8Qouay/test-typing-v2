// ==================== Active functions ====================
// ----------------- for sound -----------------
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

// ----------------- for characters handles -----------------
export function isSpaceChar(str) {
    return / [^ ]*$/.test(str)
}

export function capitalizeFirstChar(str) {
    if (str.length === 0) {
        return str // Return empty string if input is empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// ----------------- for class handles -----------------
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

// ----------------- for fetch data -----------------
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

export function getCssColorVar(var_name /* '--main-color' */) {
    const body = document.body
    let rootStyles = getComputedStyle(document.documentElement)
    if (body) {
        rootStyles = getComputedStyle(body)
    }
    return rootStyles.getPropertyValue(var_name).trim()
}

// scroll the container to active letter
export function scrollToActiveLetter(paraContainerEle) {
    if (!paraContainerEle) return
    const activeLetter = paraContainerEle.querySelector('.letter-active')

    if (activeLetter) {
        // Calculate the position to scroll to
        const containerRect = paraContainerEle.getBoundingClientRect()
        const activeLetterRect = activeLetter.getBoundingClientRect()

        // Calculate the horizontal scroll position to center the active letter
        const scrollLeft = activeLetterRect.left - containerRect.left + paraContainerEle.scrollLeft - containerRect.width / 2 + activeLetterRect.width / 2

        // Smoothly scroll the container to the calculated position
        paraContainerEle.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        })
    }
}

// ==================== FUnctions for Vue ====================
export function getImageUrl(urlName) {
    return new URL(`../${urlName}`, import.meta.url)
}

export function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// ==================== Function as Dependents ====================

// ==================== Function in Game ====================
// calculate {wpm, cpm, wps, cps} | use: func().wpm
export function calculateTypingMetrics(charactersTyped, timeInSeconds) {
    const timeInMinutes = timeInSeconds / 60
    const wordsTyped = charactersTyped / 5 // use the standard definition that one word is equal to 5 characters

    const wpm = wordsTyped / timeInMinutes
    const cpm = charactersTyped / timeInMinutes
    const wps = wordsTyped / timeInSeconds
    const cps = charactersTyped / timeInSeconds

    return {
        wpm: Math.round(wpm),
        cpm: Math.round(cpm),
        wps: Math.round(wps),
        cps: Math.round(cps)
    }
}

// accuracy calculation (return the percentage of the user typing accuracy)
export function accCalc(correct_letters, total_letters) {
    let accuracy = (correct_letters / total_letters) * 100 // (correctCharactersTyped / totalCharactersTyped) * 100;
    return Math.floor(accuracy) || 0
}

export function strToBool(str, restIsTrue = false /* if [off, item, item] {off >> false} or {item >> restIsTrue >> true or false} */) {
    const map = {
        show: true,
        on: true,
        visible: true,
        true: true,
        appear: true,
        appears: true,
        invisible: false,
        hide: false,
        off: false,
        false: false,
        disappear: false,
        disappears: false
    }
    return map[str] || (restIsTrue ? true : false)
}

// check if the (caps lock) is active or not
export function isCapsLockActive(ev /* event from keydown on document */) {
    return ev.getModifierState('CapsLock')
}

// for auto-import the fonts using only the names
import WebFont from 'webfontloader'
export function loadFont(fontName) {
    WebFont.load({
        google: {
            families: [fontName]
        }
    })
}

import { remove as removeDiacritics } from 'diacritics'
export function replaceSpecialCharacters(textParagraph) {
    const normalizedText = removeDiacritics(textParagraph)
    console.log(normalizedText)
    return normalizedText
}
