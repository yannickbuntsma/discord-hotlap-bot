import { Message } from 'discord.js'
import { isLaptime, LaptimeWithUserData } from '../types'
import { getLaptime } from './time'

export function getChannelResults(messages: Message[]): LaptimeWithUserData[] {
  return messages.reduce<LaptimeWithUserData[]>((acc, m) => {
    // Filter out all bot messages
    if (m.author.bot) {
      return acc
    }

    const laptime = getLaptime(m.content)

    if (!laptime || !isLaptime(laptime)) {
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
