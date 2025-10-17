import type { NextApiRequest, NextApiResponse } from "next";

const TOKEN = process.env.CLASH_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerTag } = req.query;

  if (!playerTag) return res.status(400).json({ error: "playerTag es obligatorio" });

  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag as string)}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
