export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, age } = req.body;
  
      // For example, you can insert the user data into a database here
      // For now, we'll simply respond with the user data
      return res.status(201).json({ name, email, age });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  