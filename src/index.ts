import './style.scss'
import { data } from './js/data'
import { setRangeColor } from './js/rangeInput'
import type { Season } from './js/data'
const COLOR_RANGE_INPUT: [string, string, string] = ['#34badb', '#ddd', '#34badb']
const PAUSE_ICON_CLASS: string = 'button-menu__icon-paused'
const PAUSE_ICON_SRC: string = './assets/icons/pause.svg'
const audioMap = new Map<string, HTMLAudioElement>()

let currentAudio: HTMLAudioElement | null = null
let volumeInput: VolumeInput | null = null

const getOrCreateAudio = (src: string): HTMLAudioElement => {
  if (!audioMap.has(src)) {
    audioMap.set(src, new Audio(src))
  }
  return audioMap.get(src)!
}

interface VolumeInput extends HTMLInputElement {
  getVolume: () => number
}

const createVolumeInput = (): VolumeInput => {
  const input = document.createElement('input') as VolumeInput
  Object.assign(input, {
    type: 'range',
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    className: 'volume__input',
  })

  setRangeColor(input, ...COLOR_RANGE_INPUT)

  input.addEventListener('input', () => {
    setRangeColor(input, ...COLOR_RANGE_INPUT)

    const volume: number = +input.value / 100
    if (currentAudio) {
      currentAudio.volume = volume
    }
  })
  input.getVolume = () => +input.value / 100

  return input
}

const createButtonMenu = (data: Season[]): HTMLElement => {
  const buttonMenu = document.createElement('div')
  buttonMenu.className = 'button-menu'

  data.forEach((item: Season) => {
    const button = document.createElement('button')
    button.className = 'button-menu__play'

    if (item.bgImg) {
      button.style.backgroundImage = `url('${item.bgImg}')`
    }

    if (item.iconSrc) {
      const img = Object.assign(document.createElement('img'), {
        className: 'button-menu__icon',
        src: item.iconSrc,
        alt: 'icon',
      })
      button.appendChild(img)
    }

    const iconPause = Object.assign(document.createElement('img'), {
      className: PAUSE_ICON_CLASS,
      src: PAUSE_ICON_SRC,
      alt: 'pause',
    })
    button.appendChild(iconPause)

    button.addEventListener('click', () => {
      const container = document.querySelector('.container') as HTMLElement
      container.style.setProperty('--before-bg', `url('${item.bgImg}')`)

      const audio = getOrCreateAudio(item.musicSrc)

      document.querySelectorAll<HTMLElement>(`.${PAUSE_ICON_CLASS}`).forEach((icon) => {
        icon.style.setProperty('--opacity-btn', '0')
      })

      if (currentAudio === audio && !audio.paused) {
        audio.pause()
        iconPause.style.setProperty('--opacity-btn', '1')
        return
      }

      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      currentAudio = audio
      if (volumeInput) {
        audio.volume = volumeInput.getVolume()
      }
      audio.play()
      iconPause.style.setProperty('--opacity-btn', '0') // активна
    })

    buttonMenu.appendChild(button)
  })

  return buttonMenu
}

// App
const initApp = (): HTMLElement => {
  const container = document.createElement('div')
  container.className = 'container'

  const title = document.createElement('h1')
  title.className = 'title'
  title.textContent = 'Whether sound'

  volumeInput = createVolumeInput()

  container.append(title, createButtonMenu(data), volumeInput)
  return container
}

document.getElementById('app')?.append(initApp())
