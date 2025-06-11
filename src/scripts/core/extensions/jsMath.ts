declare global {
  interface Math {
    /**
     * Limits the {@linkcode value} between the {@linkcode min} and {@linkcode max} boundaries.
     *
     *
     *
     * @param value The current value to be checked.
     * @param min The inclusive, lower boundary to limit the {@linkcode value}, when it goes below the given threshold.
     * @param max The inclusive, upper boundary to limit the {@linkcode value}, when it goes above the given threshold.
     * @returns A value that is limited between the {@linkcode min} and {@linkcode max} boundaries.
     */
    clamp(value: number, min: number, max: number): number;
    mod(n: number, o: number): number;
    random(min: number, max: number): number;
    random_int(min: number, max: number): number;
    random_nonzero(min: number, max: number): number;
    to_degree(radian: number): number;
    to_radian(degree: number): number;
  }
}

export {};

Math.clamp = function (value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
};
