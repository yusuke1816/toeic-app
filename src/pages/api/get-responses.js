// /pages/api/get-responses.js
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const responses = await prisma.response.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
      res.status(200).json(responses)
    } catch (error) {
      console.error('❌ データ取得失敗:', error)
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
