const data: Season[] = [
  {
    musicSrc: './assets/sounds/summer.mp3',
    iconSrc: './assets/icons/sun.svg',
    bgImg: './assets/summer-bg.jpg',
  },
  {
    musicSrc: './assets/sounds/winter.mp3',
    iconSrc: './assets/icons/cloud-rain.svg',
    bgImg: './assets/winter-bg.jpg',
  },
  {
    musicSrc: './assets/sounds/rain.mp3',
    iconSrc: './assets/icons/cloud-snow.svg',
    bgImg: './assets/rainy-bg.jpg',
  },
]

export interface Season {
  musicSrc: string
  iconSrc: string
  bgImg: string
}

export { data }
