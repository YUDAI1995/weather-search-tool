export class Area {
  constructor(
    public id: string,
    public areaRoman: string,
    public areaName: string,
    public color: string,
    public num: number
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
