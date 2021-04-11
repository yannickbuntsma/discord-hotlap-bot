import { isLaptime, Laptime, Seconds } from '../types'

export function getLaptime(messageContent: string): Laptime | undefined {
  const r = /[0-9]{1}(:|,|\.)[0-9]{2}(:|,|.)[0-9]{1,3}/

  const [match] = messageContent.match(new RegExp(r, 'gi')) || []


  if (!match) {
    return undefined
  }

  // Replace all possible delimiters with a period.
  const laptime = match.replace(/(:|,)/g, '.').padEnd(8, '0')

  return isLaptime(laptime) ? laptime : undefined
}

// m.ss.nnn --> length is 8
export function toSeconds(laptime: Laptime): Seconds {
  const [min, sec, milli] = laptime.split('.')
  return Number(min) * 60 + Number(sec) + Number(milli) / 1000
}
