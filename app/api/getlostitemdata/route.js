import db from '@/lib/db';

export async function GET(req) {
  try {
    const [rows] = await db.query('SELECT * FROM lost_items');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch lost items.' }), { status: 500 });
  }
}