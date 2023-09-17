export type ItemPos = {
  pageY: number;
  pageX: number;
  height: number;
  width: number;
};

export type Puzzle = {
  isTutorialMet: boolean;
  isPuzzle1Met: boolean;
  isPuzzle2Met: boolean;
  isPuzzle4Met: boolean;
  cosmosPos: ItemPos | null;
};
