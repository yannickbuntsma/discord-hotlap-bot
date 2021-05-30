import dotenv from 'dotenv'
import Discord from 'discord.js'

import { generateRanking } from './utils/generate-ranking'
import { getChannelResults } from './utils/get-channel-results'
import { generateLeaderboardMessage } from './utils/generate-ranking-message'
import { BOT_RANKING_MESSAGE_TITLE } from './constants'
import { getBotRankingMessage } from './utils/get-bot-ranking-message'
import { getMessages } from './utils/get-text-channel-messages'

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development' })

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`I'm ready! ⏱`)
})

client.on('message', async (m) => {
  console.log('Received message:', m.content)

  const purgeCommand = '!purge'
  if (m.content.startsWith(purgeCommand)) {
    const [a] = m.content.slice(purgeCommand.length).trim().split(/ +/)
    const amount = parseInt(a + 1) // include purge command message in messages to delete

    if (typeof amount !== 'number') {
      return m.reply('Amount should be a number.')
    }

    await m.channel.messages.fetch({ limit: amount }).then((messages) => {
      // Fetches the messages
      if (m.channel.type !== 'text') {
        return m.reply('Cannot bulk delete messages from a DM channel.')
      }

      // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      m.channel.bulkDelete(messages)
    })
  }

  if (m.content.startsWith('!user-info')) {
    return m.reply(`Your username: ${m.author.username}\nYour ID: ${m.author.id}`)
  }

  if (m.content.startsWith('!clean')) {
    const messages = await getMessages(m.channel)

    while (getBotRankingMessage(messages)) {
      getBotRankingMessage(messages)?.delete()
    }
  }

  if (m.content.startsWith('!start')) {
    const requestor = m.author
    const messages = await getMessages(m.channel)

    const botRankingMessage = getBotRankingMessage(messages, requestor)

    if (botRankingMessage) {
      return m.reply(
        `Er bestaat al een ranglijst-bericht in dit kanaal. Stuur \`!stand\` naar dit kanaal om het bestaande ranglijst-bericht bij te werken.`
      )
    }

    const rankingMessage =
      BOT_RANKING_MESSAGE_TITLE +
      `\n\n` +
      `Alle tijden in dit channel zullen worden bijgehouden en dit bericht wordt "gepind". De snelste tijd van iedere rijder wordt deze ranglijst gezet, zodat je weet hoeveel tijd je nog moet vinden om een plekje hoger op de ranglijst te komen.
    Dit gebeurt automatisch wanneer een nieuw bericht wordt geplaatst.

    Wil je handmatig de stand laten bijwerken of zoek je de link naar dit bericht, stuur dan een bericht met \`!stand\` in dit kanaal.
    `

    return m.channel.send(rankingMessage).then((m) => {
      m.pin()
      m.edit(
        rankingMessage + '\n\n' + `Je kunt bij dit bericht komen via deze link:` + '\n' + m.url
      )
    })
  }

  if (m.content.startsWith('!count')) {
    const messages = await getMessages(m.channel)
    return m.reply(`Amount of messages in this channel: ${messages.length}`)
  }

  if (m.content.startsWith('!stand')) {
    const botUser = client.user
    const messages = await getMessages(m.channel)
    const botRankingMessage = getBotRankingMessage(messages, botUser)

    if (!botRankingMessage) {
      return m.reply(
        `Kon geen ranglijst-bericht vinden om bij te werken. Stuur \`!start\` naar dit kanaal om een ranglijst te creëren.`
      )
    }
    console.log({
      'botUser.id': botUser?.id,
      'botRankingMessage.author.id': botRankingMessage.author.id,
    })

    const results = getChannelResults(messages)

    const ranking = generateRanking(results)
    const rankingMessage = generateLeaderboardMessage(ranking)

    return botRankingMessage
      .edit(rankingMessage)
      .then((m) => m.channel.send(`Ranglijst bijgewerkt. Je kunt 'm hier vinden: ${m.url}`))
      .catch(console.error)
  }
})

client.login(process.env.TOKEN)
