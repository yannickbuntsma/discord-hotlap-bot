import { getLaptime, toSeconds } from './time'

type UserLaptimeRanking = {
  userId: UserId
  username: UserName
  laptime: { displayTime: string; seconds: Seconds; timeToNext: string; timeToFirst: string }
}[]

function getBestLaptime(prev: Laptime | undefined, curr: Laptime): Laptime {
  if (!prev) {
    return curr
  }

  const currSeconds = toSeconds(curr)
  const prevSeconds = toSeconds(prev)

  // If previous time is lower than current time, keep previous time.
  return prevSeconds < currSeconds ? prev : curr
}

export function generateRanking(userLaptimes: UserLaptime[]): UserLaptimeRanking {
  const ranking = userLaptimes.sort((a, b) => {
    const secondsA = toSeconds(a.laptime)
    const secondsB = toSeconds(b.laptime)

    return secondsA - secondsB
  })

  const processedUsers: UserId[] = []

  const results = ranking.reduce<UserLaptimeRanking>((acc, userLaptime, index) => {
    /**
     * We don't want to check the pinned standings message.
     */
    // if (m.id === pinnedMessageId) {
    //   return acc
    // }

    const { userId, username, laptime } = userLaptime
    const seconds = toSeconds(laptime)

    if (processedUsers.indexOf(userId) > -1) {
      console.log('Already processed user')
      return acc
    }

    return [
      ...acc,
      {
        userId,
        username,
        laptime: {
          displayTime: laptime,
          seconds,
          timeToNext: (seconds - (acc[index - 1]?.laptime.seconds || 0)).toFixed(3),
          timeToFirst: acc.reduce((sum, r) => sum + r.laptime.seconds, 0).toFixed(3),
        },
      },
    ]
  }, [])

  return results
}
