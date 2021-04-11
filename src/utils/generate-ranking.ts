import { Ranking, UserId, LaptimeWithUserData } from '../types'
import { toSeconds } from './time'

export function generateRanking(userWithResults: LaptimeWithUserData[]): Ranking {
  const sortedResults = userWithResults.sort((a, b) => toSeconds(a.laptime) - toSeconds(b.laptime))

  const usersWithTime: UserId[] = []
  const bestUserLaptimes: Ranking = []

  for (const result of sortedResults) {
    if (usersWithTime.includes(result.userId)) {
      continue
    }

    const nextRankedUser = bestUserLaptimes[bestUserLaptimes.length - 1]

    const { userId, username, laptime } = result
    const seconds = toSeconds(laptime)
    const timeToNext = (seconds - (nextRankedUser?.result.seconds || 0)).toFixed(3)
    const timeToFirst = bestUserLaptimes.reduce((s, r) => s + r.result.seconds, 0).toFixed(3)

    bestUserLaptimes.push({
      userId,
      username,
      result: {
        displayTime: laptime,
        seconds,
        timeToNext,
        timeToFirst,
      },
    })
    usersWithTime.push(result.userId)
  }

  return bestUserLaptimes
}
