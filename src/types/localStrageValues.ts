export enum LocalStrageValue {
  is_started = "is_started",
  is_tutorial_done = "is_tutorial_done",
  is_puzzle1_done = "is_puzzle1_done",
  is_puzzle2_done = "is_puzzle2_done",
  is_puzzle3_done = "is_puzzle3_done",
  is_puzzle4_done = "is_puzzle4_done",
  has_item = "has_item",
  has_watering_can = "has_watering_can",
  found_total = "found_total",
}

export type LocalStrage = {
  isStarted: boolean | null;
  isTutorialDone: boolean | null;
  isPuzzle1Done: boolean | null;
  isPuzzle2Done: boolean | null;
  isPuzzle3Done: boolean | null;
  isPuzzle4Done: boolean | null;
  hasItem: boolean | null;
  hasWateringCan: boolean | null;
  foundTotal: number;
};
