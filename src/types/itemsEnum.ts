export enum Items {
  wateringCan = "wateringCan",
}

export enum ItemsPath {
  wateringCan = "/images/watering-can.svg",
}

export type Item = {
  name: Items;
  path: string;
};
