import dotenv from 'dotenv'
import Discord from 'discord.js'

import { getTime } from './utils/time'
import { generateRanking } from './utils/generate-ranking'

dotenv.config()

const client = new Discord.Client()

let pinnedMessageId: string | undefined = undefined

client.once('ready', () => {
  console.log(`I'm ready! ⏱`)
})

client.on('message', async (m) => {
  console.log('Received message:', m.content)
  const purgeCommand = '!purge'
  if (m.content.startsWith(purgeCommand)) {
    const [a] = m.content.slice(purgeCommand.length).trim().split(/ +/)
    const amount = parseInt(a)

    if (typeof amount !== 'number') {
      return m.reply('Amount should be a number.')
    }

    await m.channel.messages.fetch({ limit: amount }).then((messages) => {
      // Fetches the messages
      if (m.channel.type !== 'text') {
        return m.reply('Cannot bulk delete messages from a DM channel.')
      }
      m.channel.bulkDelete(
        messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      )
    })

    return m.reply(`Deleted ${amount} messages from this channel.`)
  }

  if (m.content.startsWith('!user-info')) {
    return m.reply(`Your username: ${m.author.username}\nYour ID: ${m.author.id}`)
  }

  if (m.content.startsWith('!start')) {
    return m.reply(`I'll be tracking your times from now on. Good luck!`).then((m) => {
      console.log(m.id)
      pinnedMessageId = m.id
      m.pin()
    })
  }

  if (m.content.startsWith('!stand')) {
    console.log('Stand ophalen...')
    /**
     * Get all messages, except for the bot message.
     * Get all users that posted times and all the times they posted, take the lowest one.
     * Create an ordered list of these names and times, based on time.
     */

    // m.channel.messages.fetch("701574160211771462")
    const cm = await m.channel.messages.fetch()
    const messages = Array.from(cm.values())

    const ranking = generateRanking(messages)
  }
})

client.login(process.env.TOKEN)
