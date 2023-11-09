type Area = {
  x: number;
  y: number;
  height: number;
  width: number;
};

const dungenSize = 50;

export const generateDungen = (isGameStart: boolean, isGameOver:boolean, level: number) => {
  if (!isGameStart || isGameOver) return { dungeon: [[]], playerPosition: [null, null] };

  const dungeon: number[][] = new Array(dungenSize);
  for (let i = 0; i < dungeon.length; i++) {
    dungeon[i] = new Array(dungenSize).fill(0);
  }
  const horizontal = Boolean(Math.floor(Math.random() * 2));

  let availableCellsForPlayer: [number, number][] = [];
  const availableCellsForRoom: [number, number][] = [];

  const generateRoom = (area: Area, horizontal: boolean) => {
    const { x, y, height, width } = area;

    if (height < 7 || width < 7) return;

    if (horizontal) {
      let devideLine;
      let availableHeight;
      do {
        devideLine =
          Math.floor(Math.random() * Math.floor((height / 5) * 4)) +
          Math.floor(height / 10) +
          y;
        availableHeight = height - (dungenSize - devideLine);
      } while (availableHeight < 5);

      let x1, x2, y1, y2;
      do {
        x1 = Math.floor(Math.random() * (width - 2)) + x + 1;
        x2 = Math.floor(Math.random() * (width - 2)) + x + 1;
      } while (Math.abs(x1 - x2) < 2);

      do {
        y1 = Math.floor(Math.random() * (availableHeight - 2)) + y + 1;
        y2 = Math.floor(Math.random() * (availableHeight - 2)) + y + 1;
      } while (Math.abs(y1 - y2) < 2);

      let parent;
      if (x1 - x2 < 0) {
        if (y1 - y2 < 0) {
          parent = { x: x1, y: y1, height: y2 - y1, width: x2 - x1 };
        } else {
          parent = { x: x1, y: y2, height: y1 - y2, width: x2 - x1 };
        }
      } else {
        if (y1 - y2 < 0) {
          parent = { x: x2, y: y1, height: y2 - y1, width: x1 - x2 };
        } else {
          parent = { x: x2, y: y2, height: y1 - y2, width: x1 - x2 };
        }
      }

      for (let i = parent.y; i < parent.y + parent.height; i++) {
        for (let j = parent.x; j < parent.x + parent.width; j++) {
          dungeon[i][j] = 1;
          availableCellsForPlayer.push([i, j]);
          availableCellsForRoom.push([i, j]);
        }
      }

      const childArea = {
        x,
        y: devideLine + 1,
        height: dungenSize - devideLine,
        width,
      };

      const child = generateRoom(childArea, !horizontal);

      if (child) {
        const corridorPointParent =
          Math.floor(Math.random() * parent.width) + parent.x;
        const corridorPointChild =
          Math.floor(Math.random() * child.width) + child.x;

        for (let i = parent.y + parent.height; i < devideLine; i++) {
          dungeon[i][corridorPointParent] = 2;
          availableCellsForPlayer.push([i, corridorPointParent]);
        }
        for (let i = devideLine; i < child.y; i++) {
          dungeon[i][corridorPointChild] = 2;
          availableCellsForPlayer.push([i, corridorPointChild]);
        }

        if (corridorPointParent - corridorPointChild > 0) {
          for (let i = corridorPointChild; i <= corridorPointParent; i++) {
            dungeon[devideLine][i] = 2;
            availableCellsForPlayer.push([devideLine, i]);
          }
        } else {
          for (let i = corridorPointParent; i <= corridorPointChild; i++) {
            dungeon[devideLine][i] = 2;
            availableCellsForPlayer.push([devideLine, i]);
          }
        }
      }

      return parent;
    } else {
      let devideLine;
      let availableWidth;
      do {
        devideLine =
          Math.floor(Math.random() * Math.floor((width / 5) * 4)) +
          Math.floor(width / 10) +
          x;
        availableWidth = width - (dungenSize - devideLine);
      } while (availableWidth < 5);
      let x1, x2, y1, y2;
      do {
        x1 = Math.floor(Math.random() * (availableWidth - 2)) + x + 1;
        x2 = Math.floor(Math.random() * (availableWidth - 2)) + x + 1;
      } while (Math.abs(x1 - x2) < 2);

      do {
        y1 = Math.floor(Math.random() * (height - 2)) + y + 1;
        y2 = Math.floor(Math.random() * (height - 2)) + y + 1;
      } while (Math.abs(y1 - y2) < 2);

      let parent;
      if (x1 - x2 < 0) {
        if (y1 - y2 < 0) {
          parent = { x: x1, y: y1, height: y2 - y1, width: x2 - x1 };
        } else {
          parent = { x: x1, y: y2, height: y1 - y2, width: x2 - x1 };
        }
      } else {
        if (y1 - y2 < 0) {
          parent = { x: x2, y: y1, height: y2 - y1, width: x1 - x2 };
        } else {
          parent = { x: x2, y: y2, height: y1 - y2, width: x1 - x2 };
        }
      }

      for (let i = parent.y; i < parent.y + parent.height; i++) {
        for (let j = parent.x; j < parent.x + parent.width; j++) {
          dungeon[i][j] = 1;
          availableCellsForPlayer.push([i, j]);
          availableCellsForRoom.push([i, j]);
        }
      }

      const childArea = {
        x: devideLine + 1,
        y,
        height,
        width: dungenSize - devideLine,
      };

      const child = generateRoom(childArea, !horizontal);

      if (child) {
        const corridorPointParent =
          Math.floor(Math.random() * parent.height) + parent.y;
        const corridorPointChild =
          Math.floor(Math.random() * child.height) + child.y;

        for (let i = parent.x + parent.width; i < devideLine; i++) {
          dungeon[corridorPointParent][i] = 2;
          availableCellsForPlayer.push([corridorPointParent, i]);
        }
        for (let i = devideLine; i < child.x; i++) {
          dungeon[corridorPointChild][i] = 2;
          availableCellsForPlayer.push([corridorPointChild, i]);
        }

        if (corridorPointParent - corridorPointChild > 0) {
          for (let i = corridorPointChild; i <= corridorPointParent; i++) {
            dungeon[i][devideLine] = 2;
            availableCellsForPlayer.push([i, devideLine]);
          }
        } else {
          for (let i = corridorPointParent; i <= corridorPointChild; i++) {
            dungeon[i][devideLine] = 2;
            availableCellsForPlayer.push([i, devideLine]);
          }
        }
      }

      return parent;
    }
  };

  generateRoom(
    { x: 0, y: 0, width: dungenSize, height: dungenSize },
    horizontal
  );

  if (level === 10) {
    const rundomIndex = Math.floor(
      Math.random() * availableCellsForRoom.length
    );
    const crownPos = availableCellsForRoom.splice(rundomIndex, 1)[0];
    availableCellsForPlayer = availableCellsForPlayer.filter((cell) => {
      return !(cell[0] === crownPos[0] && cell[1] === crownPos[1]);
    });
    dungeon[crownPos[0]][crownPos[1]] = 5;
  } else {
    const rundomIndex = Math.floor(
      Math.random() * availableCellsForRoom.length
    );
    const ladderPos = availableCellsForRoom.splice(rundomIndex, 1)[0];
    availableCellsForPlayer = availableCellsForPlayer.filter((cell) => {
      return !(cell[0] === ladderPos[0] && cell[1] === ladderPos[1]);
    });
    dungeon[ladderPos[0]][ladderPos[1]] = 4;
  }

  for (let i = 0; i < 3; i++) {
    console.log("bofore splice", availableCellsForRoom.length);
    
    const rundomIndex = Math.floor(
      Math.random() * availableCellsForRoom.length
    );
    const foodPos = availableCellsForRoom.splice(rundomIndex, 1)[0];
    console.log("bofore splice", availableCellsForRoom.length);
    availableCellsForPlayer = availableCellsForPlayer.filter((cell) => {
      return !(cell[0] === foodPos[0] && cell[1] === foodPos[1]);
    });
    dungeon[foodPos[0]][foodPos[1]] = 6;
  }

  const playerPosition =
    availableCellsForPlayer[
      Math.floor(Math.random() * availableCellsForPlayer.length)
    ];

  return { dungeon, playerPosition };
};
