export enum Items {
  wateringCan = "wateringCan",
  greeting = "greeting",
}

export enum ItemsPath {
  wateringCan = "/images/watering-can.svg",
  greeting = "/images/greeting.svg",
}

export type Item = {
  name: Items;
  path: string;
};
