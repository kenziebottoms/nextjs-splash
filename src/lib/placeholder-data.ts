import { parse } from 'date-fns';

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
  {
    id: 'cbc6715d-a6a8-494c-8fc2-f3a4c503e638',
    name: 'Heartleaf philodendron',
    scientificName: 'Philodendron hederaceum',
  },
];

export const plants: Plant[] = [
  {
    id: 'bc7375cd-c2d3-4fb6-90cc-c7050213fc8a',
    speciesId: '774a5fb3-a491-49a6-9db3-d8821f039819',
    name: 'pancake plant',
    careInterval: 7,
    ownerId: users[0].id,
    image:
      'https://images.immediate.co.uk/production/volatile/sites/10/2021/03/2048x1365-Pilea-Peperomioides-SEO-GettyImages-1225860485-79b134d.jpg?quality=90&webp=true&resize=1880,1254',
  },
  {
    id: 'd0dfee9c-c8ed-4833-8554-fcd292f2b0f0',
    speciesId: '464d44d5-f4f3-4653-a0c0-f6dc584b1e80',
    name: 'lucky bamboo',
    careInterval: 21,
    ownerId: users[0].id,
    image:
      'https://cdn.shopify.com/s/files/1/2101/0999/files/elton-sipp-xKEvndpS4I0-unsplash_large.jpg?v=1579872837',
  },
  {
    id: '3f628124-7e42-489e-9cc0-b0e0f28f0429',
    speciesId: '4822ce3e-228c-429e-aadd-b8622ff7b4b3',
    name: 'fern spores',
    careInterval: 7,
    ownerId: users[0].id,
    image:
      'https://images.immediate.co.uk/production/volatile/sites/10/2018/08/58ae417d-c9e7-431b-9f85-efb522459e87-4ba5f9b.jpg?quality=90&webp=true&resize=900,600',
  },
  {
    id: '3956dfa6-0d46-4463-b3ac-a8c47288b820',
    name: '1-heartleaf philodendron',
    speciesId: 'cbc6715d-a6a8-494c-8fc2-f3a4c503e638',
    careInterval: 7,
    ownerId: users[0].id,
    image:
      'https://www.publicgoods.com/cdn/shop/products/philodendron_brasil_4in_PDP_02_1000x.jpg?v=1682606394',
  },
  {
    id: '71cd6dc6-68c1-4af0-b0d8-e83db652ca16',
    name: '2-heartleaf philodendron',
    speciesId: 'cbc6715d-a6a8-494c-8fc2-f3a4c503e638',
    careInterval: 7,
    ownerId: users[0].id,
    image:
      'https://www.publicgoods.com/cdn/shop/products/philodendron_brasil_4in_PDP_01_1000x.jpg?v=1682606394',
  },
];

export const activities: Activity[] = [
  {
    id: 'd500a509-716a-40d5-9cdd-fbbda9d684dd',
    plantId: 'bc7375cd-c2d3-4fb6-90cc-c7050213fc8a',
    date: parse('2024-06-24', 'yyyy-MM-dd', new Date()),
  },
  {
    id: 'e9380018-8611-4c89-b673-c2e4ac3eba5e',
    plantId: 'd0dfee9c-c8ed-4833-8554-fcd292f2b0f0',
    date: parse('2024-06-24', 'yyyy-MM-dd', new Date()),
  },
  {
    id: '754c27a2-a398-4552-a29f-81e84390b198',
    plantId: '3f628124-7e42-489e-9cc0-b0e0f28f0429',
    date: parse('2024-06-24', 'yyyy-MM-dd', new Date()),
  },
  {
    id: '2b72a926-cd0b-40c9-a788-d5e9e87f602d',
    plantId: '3956dfa6-0d46-4463-b3ac-a8c47288b820',
    date: parse('2024-08-04', 'yyyy-MM-dd', new Date()),
  },
  {
    id: '0160d165-ae7c-4c20-9ae3-a9e415c24643',
    plantId: '71cd6dc6-68c1-4af0-b0d8-e83db652ca16',
    date: parse('2024-08-04', 'yyyy-MM-dd', new Date()),
  },
];
