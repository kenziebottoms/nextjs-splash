export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Plant = {
  id: string;
  speciesId: string;
  ownerId: string;
  name: string;
  careInterval: number;
  image: string;
};

export type Species = {
  id: string;
  name: string;
  scientificName: string;
};

export type Activity = {
  id: string;
  plantId: string;
  date: string;
};
