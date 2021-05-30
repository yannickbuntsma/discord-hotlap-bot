import { Ranking, UserId, LaptimeWithUserData } from '../types'
import { toSeconds } from './time'

export function generateRanking(userWithResults: LaptimeWithUserData[]): Ranking {
  /**
   * Get all messages, except for the bot message.
   * Get all users that posted times and all the times they posted, take the fastest one.
   * Create an ordered list of these names and times, based on time.
   */
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
    const timeToNext = nextRankedUser ? seconds - nextRankedUser?.result.seconds : 0
    const timeToFirst = nextRankedUser ? nextRankedUser.result.timeToFirst + timeToNext : 0

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
