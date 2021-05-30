import { Message, User } from 'discord.js'
import { BOT_RANKING_MESSAGE_TITLE } from '../constants'

export function getBotRankingMessage(
  messages: Message[],
  author: User | null
): Message | undefined {
  return messages.find(
    (m) =>
      m.content.includes(BOT_RANKING_MESSAGE_TITLE) && (author ? m.author.id === author.id : true)
  )
}
