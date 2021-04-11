import { Laptime } from '../types'
import { getLaptime, toSeconds } from './time'

describe('Time utils', () => {
  describe('getLaptime', () => {
    const scenarios:   [string, string | undefined][] = [
      ['1.30.423, maar wil er nog wat afkrijgen.', '1.30.423'],
      ['Eerste poging 1.12,536, maar...', '1.12.536'],
      ['Eerste poging 1:12,536, maar...', '1.12.536'],
      ['Test 1:12.536. maar...', '1.12.536'],
      ['Test 1:12.5. maar...', '1.12.500'],
      ['Eerste poging 1:91,536, maar...', undefined],
      ['<@540290060885557269>, Deleted 10 messages from this channel.', undefined],
    ]

    scenarios.forEach(([input, output]) => {
      it(`${input}`, () => {
        expect(getLaptime(input)).toEqual(output)
      })
    })
  })

  describe('toSeconds', () => {
    const scenarios: [Laptime, number][] = [
      ['0.42.123', 42.123],
      ['1.32.536', 92.536],
      ['4.01.100', 241.1],
      ['2.52.990', 172.99],
    ]

    scenarios.forEach(([input, output]) => {
      it(input, () => {
        expect(toSeconds(input)).toEqual(output)
      })
    })
  })
})
