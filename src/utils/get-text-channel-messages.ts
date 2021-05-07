import { Channel, ChannelLogsQueryOptions, Message } from 'discord.js'
import { isTextChannel } from '../guards/is-text-channel'

export async function getMessages(channel: Channel): Promise<Message[]> {
  if (!isTextChannel(channel)) {
    console.error(`Can only fetch messages for TextChannel. Channel type received: ${channel.type}`)
    return []
  }

  let lastId: string | undefined
  const options: ChannelLogsQueryOptions = { limit: 100 }

  const collatedMessages: Message[] = []

  while (true) {
    if (lastId) {
      options.before = lastId
    }

    /**
     * Get messages before the last fetched message, or just the last X
     * messages in the channel. The Discord API will automatically return
     * the last 100 messages (or less) of we don't provide a message ID.
     */
    const messages = await channel.messages.fetch(options)
    const messagesArray = messages.array()

    collatedMessages.push(...messagesArray)

    lastId = messages.last()?.id

    /**
     * If list of fetched messages is 100, the API could be capping us.
     * In that case, we need to check if there's more messages.
     */
    if (messagesArray.length < 100) {
      break
    }
  }

  return collatedMessages
}
