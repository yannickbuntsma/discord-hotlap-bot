import dotenv from 'dotenv'
import Discord from 'discord.js'

dotenv.config()

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`I'm ready! ⏱`)
})

client.on('message', (m) => {
  if (m.content === '!ping') {
    m.channel.send('Pong!')
  }

  if (m.content === '!user-info') {
    m.channel.send(`Your username: ${m.author.username}\nYour ID: ${m.author.id}`)
  }
})

client.login(process.env.TOKEN)
