import { Message } from 'discord.js'
import { getLaptime } from './time'

export function getChannelResults(messages: Message[]): UserLaptime[] {
  return messages.reduce<UserLaptime[]>((acc, m) => {
    const laptime = getLaptime(m.content)
    if (!laptime) {
      return acc
    }

    const userId = m.author.id
    const userName = m.author.username

    return [
      ...acc,
      {
        userId,
        username: userName,
        laptime,
      },
    ]
  }, [])
}
