export enum LocalStrageValue {
  is_started = "is_started",
  is_tutorial_done = "is_tutorial_done",
  is_puzzle1_done = "is_puzzle1_done",
  is_puzzle2_done = "is_puzzle2_done",
  is_puzzle3_done = "is_puzzle3_done",
  is_puzzle4_done = "is_puzzle4_done",
  is_puzzle5_done = "is_puzzle5_done",
  is_puzzle6_done = "is_puzzle6_done",
  has_item = "has_item",
  has_watering_can = "has_watering_can",
  has_greeting = "has_greeting",
  found_total = "found_total",
  is_mute = "is_mute",
  theme = "theme",
}

export enum Theme {
  light = "light",
  dark = "dark",
}

export type LocalStrage = {
  isMute: boolean | null;
  isStarted: boolean | null;
  isTutorialDone: boolean | null;
  isPuzzle1Done: boolean | null;
  isPuzzle2Done: boolean | null;
  isPuzzle3Done: boolean | null;
  isPuzzle4Done: boolean | null;
  isPuzzle5Done: boolean | null;
  isPuzzle6Done: boolean | null;
  hasItem: boolean | null;
  hasWateringCan: boolean | null;
  hasGreeting: boolean | null;
  foundTotal: number;
  theme: Theme | null;
};
