import { Activity, Plant, Species, User } from './definitions';

export const users: User[] = [
  {
    id: '286593b0-a84c-44b4-99c1-53e560e085b5',
    name: 'Rip',
    email: 'kenziebottoms@gmail.com',
    password: 'password',
  },
];

export const species: Species[] = [
  {
    id: '4822ce3e-228c-429e-aadd-b8622ff7b4b3',
    name: 'autumn fern',
    scientificName: 'Dryopteris erythrosora',
  },
  {
    id: '464d44d5-f4f3-4653-a0c0-f6dc584b1e80',
    name: 'lucky bamboo',
    scientificName: 'Dracaena sanderiana',
  },
  {
    id: '774a5fb3-a491-49a6-9db3-d8821f039819',
    name: 'pancake plant',
    scientificName: 'Pilea peperomioides',
  },
];

export const plants: Plant[] = [
  {
    id: 'bc7375cd-c2d3-4fb6-90cc-c7050213fc8a',
    speciesId: '774a5fb3-a491-49a6-9db3-d8821f039819',
    name: 'pancake plant',
    careInterval: 7,
    ownerId: users[0].id,
  },
  {
    id: 'd0dfee9c-c8ed-4833-8554-fcd292f2b0f0',
    speciesId: '464d44d5-f4f3-4653-a0c0-f6dc584b1e80',
    name: 'lucky bamboo',
    careInterval: 21,
    ownerId: users[0].id,
  },
  {
    id: '3f628124-7e42-489e-9cc0-b0e0f28f0429',
    speciesId: '4822ce3e-228c-429e-aadd-b8622ff7b4b3',
    name: 'fern spores',
    careInterval: 7,
    ownerId: users[0].id,
  },
];

export const activities: Activity[] = [
  {
    id: 'd500a509-716a-40d5-9cdd-fbbda9d684dd',
    plantId: 'bc7375cd-c2d3-4fb6-90cc-c7050213fc8a',
    date: '2024-06-24',
  },
  {
    id: 'e9380018-8611-4c89-b673-c2e4ac3eba5e',
    plantId: 'd0dfee9c-c8ed-4833-8554-fcd292f2b0f0',
    date: '2024-06-24',
  },
  {
    id: '754c27a2-a398-4552-a29f-81e84390b198',
    plantId: '3f628124-7e42-489e-9cc0-b0e0f28f0429',
    date: '2024-06-24',
  },
];
