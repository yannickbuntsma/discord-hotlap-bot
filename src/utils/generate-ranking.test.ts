import { generateRanking } from './generate-ranking'

const testData: UserLaptime[] = [
  { userId: '__F', username: 'FOO', laptime: '1.42.494' },
  { userId: '__B', username: 'BAR', laptime: '1.43.334' },
  { userId: '__A', username: 'AAP', laptime: '1.47.647' },
  { userId: '__F', username: 'FOO', laptime: '1.45.683' },
  { userId: '__F', username: 'FOO', laptime: '1.45.793' },
  { userId: '__F', username: 'FOO', laptime: '1.42.646' },
  { userId: '__C', username: 'CES', laptime: '1.45.486' },
  { userId: '__C', username: 'CES', laptime: '1.43.209' },
  { userId: '__F', username: 'FOO', laptime: '1.43.026' },
]

describe('generateRanking', () => {
  it('should ___', () => {
    expect(generateRanking(testData)).toMatchInlineSnapshot(`
      Array [
        Object {
          "laptime": Object {
            "displayTime": "1.42.494",
            "seconds": 102.494,
            "timeToFirst": "0.000",
            "timeToNext": "102.494",
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.42.646",
            "seconds": 102.646,
            "timeToFirst": "102.494",
            "timeToNext": "0.152",
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.43.026",
            "seconds": 103.026,
            "timeToFirst": "205.140",
            "timeToNext": "0.380",
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.43.209",
            "seconds": 103.209,
            "timeToFirst": "308.166",
            "timeToNext": "0.183",
          },
          "userId": "__C",
          "username": "CES",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.43.334",
            "seconds": 103.334,
            "timeToFirst": "411.375",
            "timeToNext": "0.125",
          },
          "userId": "__B",
          "username": "BAR",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.45.486",
            "seconds": 105.486,
            "timeToFirst": "514.709",
            "timeToNext": "2.152",
          },
          "userId": "__C",
          "username": "CES",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.45.683",
            "seconds": 105.683,
            "timeToFirst": "620.195",
            "timeToNext": "0.197",
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.45.793",
            "seconds": 105.793,
            "timeToFirst": "725.878",
            "timeToNext": "0.110",
          },
          "userId": "__F",
          "username": "FOO",
        },
        Object {
          "laptime": Object {
            "displayTime": "1.47.647",
            "seconds": 107.647,
            "timeToFirst": "831.671",
            "timeToNext": "1.854",
          },
          "userId": "__A",
          "username": "AAP",
        },
      ]
    `)
  })
})
