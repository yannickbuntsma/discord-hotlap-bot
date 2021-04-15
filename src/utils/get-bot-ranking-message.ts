import { Message } from 'discord.js'
import { BOT_RANKING_MESSAGE_TITLE } from '../constants'

export function getBotRankingMessage(messages: Message[]): Message | undefined {
  return messages.find((m) => m.content.includes(BOT_RANKING_MESSAGE_TITLE))
}
