import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { activities, plants, species, users } from '@/lib/placeholder-data';

const client = await db.connect();

async function seedUsers(overwrite: boolean) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  if (overwrite) {
    await client.sql`
      DROP TABLE IF EXISTS users;
    `;
  }
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedSpecies(overwrite: boolean) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  if (overwrite) {
    await client.sql`
      DROP TABLE IF EXISTS species;
    `;
  }
  await client.sql`
    CREATE TABLE IF NOT EXISTS species (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      scientific_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedSpecies = await Promise.all(
    species.map(
      (specie) => client.sql`
        INSERT INTO species (id, name, scientific_name)
        VALUES (${specie.id}, ${specie.name}, ${specie.scientificName})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSpecies;
}

async function seedPlants(overwrite: boolean) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  if (overwrite) {
    await client.sql`
      DROP TABLE IF EXISTS plants;
    `;
  }
  await client.sql`
    CREATE TABLE IF NOT EXISTS plants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      species_id UUID NOT NULL,
      owner_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      care_interval INT NOT NULL,
      image VARCHAR(255)
    );
  `;

  const insertedPlants = await Promise.all(
    plants.map(
      (plant) => client.sql`
        INSERT INTO plants (id, species_id, owner_id, name, care_interval, image)
        VALUES (${plant.id}, ${plant.speciesId}, ${plant.ownerId}, ${plant.name}, ${plant.careInterval}, ${plant.image})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPlants;
}

async function seedActivities(overwrite: boolean) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  if (overwrite) {
    await client.sql`
      DROP TABLE IF EXISTS activities;
    `;
  }
  await client.sql`
    CREATE TABLE IF NOT EXISTS activities (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      plant_id UUID NOT NULL,
      date DATE NOT NULL DEFAULT NOW()
    );
  `;

  const insertedPlants = await Promise.all(
    activities.map(
      (activity) => client.sql`
        INSERT INTO activities (id, plant_id, date)
        VALUES (${activity.id}, ${activity.plantId}, ${format(activity.date, 'yyyy-MM-dd')})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPlants;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const overwrite = searchParams.get('overwrite') === 'true';

  try {
    await client.sql`BEGIN`;
    await seedUsers(overwrite);
    await seedSpecies(overwrite);
    await seedPlants(overwrite);
    await seedActivities(overwrite);
    await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return NextResponse.json({ error }, { status: 500 });
  }
}
