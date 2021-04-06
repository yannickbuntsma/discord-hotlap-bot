export function getTime(message: string): string {
  const num = (a: number | number[]) =>
    Array.isArray(a) ? `[0-9]{${a[0]},${a[1]}}` : `[0-9]{${a}}`

  const del = `(:|,|\.|s)`
  const r = [num(1), del, num(2), del, num([1, 3])].join('')

  const [match] = message.match(new RegExp(r)) || []

  if (!match) {
    return ''
  }

  return match.replace(del, '.')
}

// m.ss.nnn --> length is 8
export function toSeconds(time: string): number {
  const [min, sec, milli] = time.padEnd(8, '0').split('.')
  return Number(min) * 60 + Number(sec) + Number(milli) / 1000
}
