import { messages } from './__test-data__/messages'
import { getBotRankingMessage } from './get-bot-ranking-message'

const BOT_USER = {
  id: '_SPECIAL_BOT_ID_',
  username: 'Mr. Robot',
  avatar: '0000023d0b28f698c8a4b7eebc1ca033',
  discriminator: '7224',
  public_flags: 0,
}

const botMessage = {
  id: '828649930964205648',
  type: 0,
  content: `**### RANKING ###**

  **1. BUN_NL** :first_place:
  \`1.30.054\` | \`------\` | \`------\`

  **2. YB** :second_place:
  \`1.32.140\` | \`+2.086\` | \`+2.086\``,
  channel_id: '824257306971471882',
  author: BOT_USER,
  attachments: [
    {
      id: '828649927563018250',
      filename: 'PS_App_20210405_031528.jpeg',
      size: 993009,
      url:
        'https://cdn.discordapp.com/attachments/824257306971471882/828649927563018250/PS_App_20210405_031528.jpeg',
      proxy_url:
        'https://media.discordapp.net/attachments/824257306971471882/828649927563018250/PS_App_20210405_031528.jpeg',
      width: 1920,
      height: 1080,
      content_type: 'image/jpeg',
    },
  ],
  embeds: [],
  mentions: [],
  mention_roles: [],
  pinned: false,
  mention_everyone: false,
  tts: false,
  timestamp: '2021-04-05T15:18:59.113000+00:00',
  edited_timestamp: '2021-04-05T15:19:20.138000+00:00',
  flags: 0,
}

messages.splice(15, 0, botMessage as any)

describe('getBotRankingMessage', () => {
  it('should find the first bot message that contains the ranking', () => {
    expect(getBotRankingMessage(messages as any)).toEqual(botMessage)
  })

  it('should find the first bot message that contains the ranking and is written by the requestor', () => {
    expect(getBotRankingMessage(messages as any, BOT_USER as any)).toEqual(botMessage)
  })

  it(`should return undefined if author of found message doesn't match requestor`, () => {
    const otherUser = { id: 'will_not_math' }
    expect(getBotRankingMessage(messages as any, otherUser as any)).not.toEqual(botMessage)
  })
})
