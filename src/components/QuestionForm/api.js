import axios from 'axios';

// APIへのリクエストを切り出す
export const fetchApiResponse = async (question) => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        max_tokens: 150,
        temperature: 0.5,
        top_p: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return 'エラーが発生しました。APIキーを確認してください。';
  }
};
