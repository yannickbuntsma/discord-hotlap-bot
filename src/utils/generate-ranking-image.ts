import nodeHtmlToImage from 'node-html-to-image'
import { Ranking } from '../types'

function createRows(ranking: Ranking) {
  return ranking.reduce((m, item, i) => {
    const rank = i + 1
    const { username, result } = item
    const { displayTime, timeToNext, timeToFirst } = result

    return (
      m +
      `
      <tr>
        <th>${rank}</th>
        <th>${username}</th>
        <td>${displayTime}</td>
        <td>${rank === 1 ? '' : timeToNext}</td>
        <td>${rank === 1 ? '' : timeToFirst}</td>
      </tr>
      `
    )
  })
}

const createHtml = (ranking: Ranking) => `
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Ranking</title>
  </head>
  <body>
    <table>
      <thead>
        <tr class="top">
          <th></th>
          <th>Naam</th>
          <th>Tijd</th>
          <th>Interval</th>
          <th>Leider</th>
        </tr>
      </thead>

      <tbody>
        ${createRows(ranking)}
      </tbody>
    </table>
  </body>
  <style>
    html {
      font-family: sans-serif;
    }

    th {
      text-align: left;
    }

    tbody td {
      text-align: right;
    }

    table {
      border-radius: 4px;
      border-collapse: collapse;
      background: dodgerblue;
      color: white;
    }

    th,
    td {
      padding: 0.5rem 0.75rem;
    }

    tr th:first-child {
      text-align: center;
    }

    tbody tr:nth-child(1) {
      background: goldenrod;
      border-left: 8px solid goldenrod;
      border-right: 8px solid goldenrod;
    }
    tbody tr:nth-child(2) {
      background: silver;
      border-left: 8px solid silver;
      border-right: 8px solid silver;
    }
    tbody tr:nth-child(3) {
      background: brown;
      border-left: 8px solid brown;
      border-right: 8px solid brown;
    }
  </style>
</html>
`

export async function generateRankingImage(ranking: Ranking) {
  return nodeHtmlToImage({
    html: createHtml(ranking),
    quality: 100,
    type: 'jpeg',
    puppeteerArgs: {
      args: ['--no-sandbox'],
    },
    // encoding: 'buffer',
  })
}
