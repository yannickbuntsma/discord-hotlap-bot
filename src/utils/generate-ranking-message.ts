import { BOT_RANKING_MESSAGE_TITLE } from '../constants'
import { Ranking } from '../types'

const bold = (string: string) => `**${string}**`
const code = (string: string) => `\`${string}\``
const line = (string: string) => `${string}\n`

const addMedal = (string: string, rank: number) => {
  const medals = [':first_place:', ':second_place:', ':third_place:']

  return rank < 4 ? `${string} ${medals[rank - 1]}` : string
}

export function generateLeaderboardMessage(ranking: Ranking): string {
  return ranking.reduce((m, r, idx) => {
    const rank = idx + 1
    const {
      result: { displayTime, timeToNext, timeToFirst },
    } = r
    const NO_INTERVAL = '------'
    const intervalToNext = timeToNext ? '+' + timeToNext.toFixed(3) : NO_INTERVAL
    const intervalToFirst = timeToNext ? '+' + timeToFirst.toFixed(3) : NO_INTERVAL

    const l =
      line('') +
      line(addMedal(bold(`${rank}. ${r.username}`), rank)) +
      line(`${code(displayTime)} | ${code(intervalToNext)} | ${code(intervalToFirst)}`)

    return m + l
  }, line(bold(BOT_RANKING_MESSAGE_TITLE)))
  // **1. GTJ-102938** :first_place:
  // `1.12.536 | +1.222 | +4.342`
  // **2. Bowhunt Bert** :second_place:
  // `4.42.536 | +1.222 | +11.132`
  // **3. asd asd alsdj akljd alskd** :third_place:
  // `1.33.116 | +1.222 | +34.342`
  // **20. asd asd alsdj akljd alskd**
  // `5.35.116 | +1.222 | +34.342`
}
