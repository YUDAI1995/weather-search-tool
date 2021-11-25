export class Area {
  constructor(
    public id: string,
    public num: number,
    public areaRoman: string,
    public areaName: string,
    public lat: string,
    public lng: string,
    public color: string
  ) {}
}

/**
 * ランダム値
 * @param {number?} myStrong
 * @return {string}
 */
export const getRandomID = (myStrong?: number) => {
  let strong: number;
  myStrong ? (strong = myStrong) : (strong = 1000);
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

/**
 *
 * @param {number} degree
 * @return {string}
 */
export const getDirection = (degree: number) => {
  // const name = [
  //   "北",
  //   "北北東",
  //   "北東",
  //   "東北東",
  //   "東",
  //   "東南東",
  //   "南東",
  //   "南南東",
  //   "南",
  //   "南南西",
  //   "南西",
  //   "西南西",
  //   "西",
  //   "西北西",
  //   "北西",
  //   "北北西",
  //   "北",
  // ];
  const arrow = [
    "↓",
    "↙︎",
    "↙︎",
    "↙︎",
    "←",
    "↖︎",
    "↖︎",
    "↖︎",
    "↑",
    "↗︎",
    "↗︎",
    "↗︎",
    "→",
    "↘︎",
    "↘︎",
    "↘︎",
    "↓",
  ];
  var count = 0;
  for (var i = 11.25; i < 360 + 11.25; i += 22.5) {
    if (degree < i) {
      break;
    }
    count++;
  }
  return arrow[count];
};
