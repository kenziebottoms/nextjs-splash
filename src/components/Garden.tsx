import { sql } from '@vercel/postgres';
import { format } from 'date-fns';
import * as React from 'react';
import '@/lib/env';

import { Plant, PlantActivity } from '@/lib/definitions';

export default async function Garden() {
  const { rows: alphabeticalPlants }: { rows: Plant[] } = await sql`
    SELECT *
    FROM plants
    WHERE owner_id='286593b0-a84c-44b4-99c1-53e560e085b5'
    ORDER BY name;
  `;
  const { rows: recentlyWateredPlants }: { rows: PlantActivity[] } = await sql`
    SELECT *
    FROM plants
    RIGHT JOIN activities ON activities.plant_id = plants.id
    WHERE owner_id='286593b0-a84c-44b4-99c1-53e560e085b5'
    ORDER BY activities.date DESC;
  `;

  return (
    <>
      <div className='bg-white p-4 text-black col-span-2 row-span-2'>
        <h2>All Plants</h2>
        <ul className='list-disc ml-6 pt-2'>
          {alphabeticalPlants.map((plant) => (
            <li key={plant.id}>{plant.name}</li>
          ))}
        </ul>
      </div>

      {alphabeticalPlants.map((plant) => (
        <div
          key={plant.id}
          style={{
            backgroundImage: `url(${plant.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      ))}

      <div className='bg-white p-4 text-black col-start-3 row-start-2 col-span-2 row-span-2'>
        <h2>Recently Watered</h2>
        <ul className='list-disc ml-6 pt-2'>
          {recentlyWateredPlants.map((plantActivity) => (
            <li key={plantActivity.id}>
              {plantActivity.name} ({format(plantActivity.date, 'M/d/y')})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
