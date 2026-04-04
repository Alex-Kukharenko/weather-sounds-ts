function setRangeColor(
  input: HTMLInputElement,
  fillColor: string,
  trackColor: string,
  thumbColor?: string,
): void {
  const min = input.min || 0
  const max = input.max || 100
  const value = input.value

  const percent = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100

  input.style.background = `linear-gradient(
    to right,
    ${fillColor} ${percent}%,
    ${trackColor} ${percent}%
  )`

  if (thumbColor) {
    input.style.setProperty('--thumb-color', thumbColor)
  }
}

export { setRangeColor }
