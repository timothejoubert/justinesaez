const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const myPage = await notion.databases.query({
    database_id: '9630213c155243d2833732cb91e63951',
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
