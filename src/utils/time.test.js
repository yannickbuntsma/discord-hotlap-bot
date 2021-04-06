import { getTime, toSeconds } from './time.js'

describe('Time utils', () => {
  describe('getTime', () => {
    const scenarios = [
      ['1.30.423, maar wil er nog wat afkrijgen.', '1.30.423'],
      ['Eerste poging 1.12,536, maar...', '1.12,536'],
      ['Eerste poging 1:12,536, maar...', '1:12,536'],
      ['Test 1:12.536. maar...', '1:12.536'],
    ]

    scenarios.forEach(([input, output]) => {
      it(input, () => {
        expect(getTime(input)).toEqual(output)
      })
    })
  })

  describe('toSeconds', () => {
    const scenarios = [
      ['0.42.123', 42.123],
      ['1.32.536', 92.536],
      ['4.01.1', 241.1],
      ['2.52.990', 172.99],
    ]

    scenarios.forEach(([input, output]) => {
      it(input, () => {
        expect(toSeconds(input)).toEqual(output)
      })
    })
  })
})
