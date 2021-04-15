export type Seconds = number
type N = number
type ZTF = 0 | 1 | 2 | 3 | 4 | 5 // zero-to-five

export type Interval = Seconds
export type Laptime = `${N}.${ZTF}${N}.${N}${N}${N}` // e.g. "2.45.678"

export function isLaptime(string?: string): string is Laptime {
  if (!string) {
    return false
  }

  // "2.45.678"
  const numbers = string
    .split('')
    .filter((c) => c !== '.')
    .map((n) => parseInt(n))

  const [_, deciseconds] = numbers

  if (numbers.some((n) => isNaN(n))) {
    return false
  }

  if (deciseconds > 5) {
    return false
  }

  return true
}

export type UserId = string
export type UserName = string

export type LaptimeWithUserData = { userId: UserId; username: UserName; laptime: Laptime }

type User = {
  userId: UserId
  username: UserName
}

export type Result = {
  displayTime: Laptime
  seconds: Seconds
}

type ResultWithIntervals = Result & {
  timeToNext: Interval
  timeToFirst: Interval
}

export type RankingItem = User & {
  result: ResultWithIntervals
}

export type UserWithResults = {
  userId: UserId
  username: UserName
  results: Result[]
}

export type Ranking = RankingItem[]
