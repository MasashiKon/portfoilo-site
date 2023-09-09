export enum LocalStrageValue {
  is_started = "is_started",
  is_tutorial_done = "is_tutorial_done",
  is_puzzle1_done = "is_puzzle1_done",
  has_item = "has_item",
  found_total = "found_total",
}

export type LocalStrage = {
  isStarted: boolean | null;
  isTutorialDone: boolean | null;
  isPuzzle1Done: boolean | null;
  hasItem: boolean | null;
  foundTotal: number;
};
