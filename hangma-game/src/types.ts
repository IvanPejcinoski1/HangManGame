export interface Item {
  name: string;
  selected: boolean;
}
export interface Categories {
  movies: Item[];
  tvShows: Item[];
  countries: Item[];
  capitalCities: Item[];
  animals: Item[];
  sports: Item[];
}
export interface Data {
  categories: Categories;
}

export type CategoryKey = keyof Categories;
