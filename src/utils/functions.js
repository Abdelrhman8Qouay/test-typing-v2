// ==================== Active functions ====================
export function playAudio(aud, audioLoop) {
    // Remove any existing 'ended' event listeners to prevent multiple loops
    aud.removeEventListener('ended', onAudioEnded)

    if (audioLoop) {
        aud.addEventListener('ended', onAudioEnded)
        aud.preload = 'auto' // Preload the audio
    }

    aud.volume = 0.4

    aud.play().catch(() => {
        aud.pause()
        aud.play()
    })
}
export function onAudioEnded() {
    this.currentTime = 0
    this.play().catch((error) => {
        console.error('Looped audio playback failed:', error)
    })
}

export function pauseEle(ele) {
    ele.pause()
    ele.currentTime = 0 // Reset the audio to the start
}

export function isSpaceChar(str) {
    return / [^ ]*$/.test(str)
}

export function capitalizeFirstChar(str) {
    if (str.length === 0) {
        return str // Return empty string if input is empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

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
// scroll the container to active letter
export function scrollToActiveLetter(paraContainerEle) {
    const activeLetter = paraContainerEle.querySelector('.letter-active')
    console.log('scroll here')

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
    /*Use like so*/
    // async function timeSensativeAction() { // must be async func
    //     // do something here
    //      await sleep(5000) // wait 5 seconds
    //     // continue on...
    //   }
}
