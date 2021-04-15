import { LaptimeWithUserData, UserId } from '../types'
import { generateRanking } from './generate-ranking'

const testData: LaptimeWithUserData[] = [
  { userId: '__F', username: 'FOO', laptime: '1.42.494' },
  { userId: '__B', username: 'BAR', laptime: '1.43.334' },
  { userId: '__A', username: 'AAP', laptime: '1.47.647' },
  { userId: '__F', username: 'FOO', laptime: '1.45.683' },
  { userId: '__F', username: 'FOO', laptime: '1.45.793' },
  { userId: '__F', username: 'FOO', laptime: '1.42.646' },
  { userId: '__f', username: 'FAY', laptime: '1.45.486' },
  { userId: '__f', username: 'FAY', laptime: '1.43.209' },
  { userId: '__F', username: 'FOO', laptime: '1.43.026' },
]

const result = generateRanking(testData)

describe('generateRanking', () => {
  it('should only have every user in the ranking once', () => {
    const assertSingleUserOccurence = (userId: UserId) =>
      expect(result.filter((i) => i.userId === userId)).toHaveLength(1)

    assertSingleUserOccurence('__F')
    assertSingleUserOccurence('__B')
    assertSingleUserOccurence('__A')
    assertSingleUserOccurence('__f')

    expect(result).toHaveLength(4)
  })

  it('should sort the results from fastest to slowest lap time', () => {
    const order = result.map((r) => r.result.displayTime)
    expect(order).toEqual(['1.42.494', '1.43.209', '1.43.334', '1.47.647'])
  })

  it('should match a snaphot of the output', () => {
    expect(generateRanking(testData)).toMatchInlineSnapshot(`
      Array [
        Object {
          "result": Object {
            "displayTime": "1.42.494",
            "seconds": 102.494,
            "timeToFirst": 0,
            "timeToNext": 0,
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "result": Object {
            "displayTime": "1.43.209",
            "seconds": 103.209,
            "timeToFirst": 0.7150000000000034,
            "timeToNext": 0.7150000000000034,
          },
          "userId": "__f",
          "username": "FAY",
        },
        Object {
          "result": Object {
            "displayTime": "1.43.334",
            "seconds": 103.334,
            "timeToFirst": 0.8400000000000034,
            "timeToNext": 0.125,
          },
          "userId": "__B",
          "username": "BAR",
        },
        Object {
          "result": Object {
            "displayTime": "1.47.647",
            "seconds": 107.647,
            "timeToFirst": 5.153000000000006,
            "timeToNext": 4.313000000000002,
          },
          "userId": "__A",
          "username": "AAP",
        },
      ]
    `)
  })
})
