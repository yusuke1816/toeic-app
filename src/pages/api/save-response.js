import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const jsonData = req.body

      // 📌 ここで受け取ったデータを確認
      console.log('📥 受け取ったデータ:', jsonData)

      const saved = await prisma.response.create({
        data: {
          content: jsonData,
        },
      })

      // 📌 保存後のデータを確認
      console.log('✅ DBに保存されたデータ:', saved)

      res.status(200).json({ message: 'Saved successfully', data: saved })
    } catch (error) {
      console.error('❌ 保存エラー:', error)
      res.status(500).json({ error: 'Failed to save data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
