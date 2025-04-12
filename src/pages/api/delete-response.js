import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'IDが必要です' });
      }

      const deleted = await prisma.response.delete({
        where: { id: id },
      });

      return res.status(200).json({ message: '削除成功', deleted });
    } catch (error) {
      console.error('削除エラー:', error);
      return res.status(500).json({ error: 'サーバーエラー' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
