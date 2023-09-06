export enum LocalStrageValue {
  is_started = "is_started",
  is_tutorial_done = "is_tutorial_done",
}

export type LocalStrage = {
  isStarted: boolean | null;
  isTutorialDone: boolean;
};
