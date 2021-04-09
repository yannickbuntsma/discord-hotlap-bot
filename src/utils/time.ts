export function getLaptime(messageContent: string): Laptime {
  const num = (a: number | number[]) =>
    Array.isArray(a) ? `[0-9]{${a[0]},${a[1]}}` : `[0-9]{${a}}`

    // Possible delimiters
  const del = `(:|,|\.)`

  // Regex created from number generators.
  const r = [num(1), del, num(2), del, num([1, 3])].join('')

  const [match] = messageContent.match(new RegExp(r)) || []

  if (!match) {
    return ''
  }

  // Replace all possible delimiters with a period.
  return match.replace(/(:|,)/g, '.')
}

// m.ss.nnn --> length is 8
export function toSeconds(laptime: Laptime): Seconds {
  const [min, sec, milli] = laptime.padEnd(8, '0').split('.')
  return Number(min) * 60 + Number(sec) + Number(milli) / 1000
}
