import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

import { activities, plants, species, users } from '@/lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
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

async function seedSpecies() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

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

async function seedPlants() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS plants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      species_id UUID NOT NULL,
      owner_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      care_interval INT NOT NULL
    );
  `;

  const insertedPlants = await Promise.all(
    plants.map(
      (plant) => client.sql`
        INSERT INTO plants (id, species_id, owner_id, name, care_interval)
        VALUES (${plant.id}, ${plant.speciesId}, ${plant.ownerId}, ${plant.name}, ${plant.careInterval})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPlants;
}

async function seedActivities() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS activities (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      plant_id UUID NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedPlants = await Promise.all(
    activities.map(
      (activity) => client.sql`
        INSERT INTO activities (id, plant_id, date)
        VALUES (${activity.id}, ${activity.plantId}, ${activity.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPlants;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedSpecies();
    await seedPlants();
    await seedActivities();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
