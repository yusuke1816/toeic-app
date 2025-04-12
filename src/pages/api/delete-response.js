// pages/api/delete-response.js
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    try {
      await db.collection('responses').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: '削除成功' });
    } catch (error) {
      res.status(500).json({ message: '削除失敗', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
