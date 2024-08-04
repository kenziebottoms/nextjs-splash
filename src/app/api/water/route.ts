import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

const client = await db.connect();

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const plantId = searchParams.get('plantId');

  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO activities (plant_id)
      VALUES (${plantId});
    `;
    await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Plant watered successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return NextResponse.json({ error }, { status: 500 });
  }
}
