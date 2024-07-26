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

export function strToBool(str) {
    return str == 'on' || str == 'show' ? true : false
}

// check if the (caps lock) is active or not
export function isCapsLockActive(ev /* event from keydown on document */) {
    return ev.getModifierState('CapsLock')
}

// ==================== Function in DOM ====================
// scroll the container to active letter
export function scrollToActiveLetter(paraContainerEle) {
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

// for auto-import the fonts using only the names
import WebFont from 'webfontloader'
export function loadFont(fontName) {
    WebFont.load({
        google: {
            families: [fontName]
        }
    })
}
