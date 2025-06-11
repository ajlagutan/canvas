declare global {
  interface Number {
    /**
     * Limits the current instance between the {@linkcode min} and {@linkcode max} boundaries.
     *
     *
     *
     * @param min The inclusive, lower boundary to limit the {@linkcode value}, when it goes below the given threshold.
     * @param max The inclusive, upper boundary to limit the {@linkcode value}, when it goes above the given threshold.
     * @returns A {@linkcode Number} that is limited between the {@linkcode min} and {@linkcode max} boundaries.
     */
    clamp(min: number, max: number): number;
    /**
     * Determines whether the value is between the lower and upper boundaries.
     * 
     * Both lower and upper boundaries are exclusive.
     * 
     * 
     * 
     * @example 
     * // Checks if value is between 0 and 10, exclusively.
     * 
     * let value = 0;
     * let result = value.within(0, 10);
     * // result: false
     * 
     * value = 1;
     * result = value.within(0, 10);
     * // result: true
     * 
     * value = 10;
     * result = value.within(0, 10);
     * // result: false
     * 
     * value = 9;
     * result = value.within(0, 10);
     * // result: true
     * 
     * 
     * 
     * @param min The lower boundary.
     * @param max The upper boundary.
     * @returns true, if value is within the lower and upper boundaries, exclusively; otherwise, false.
     */
    within(min: number, max: number): boolean;
    /**
     * Determines whether the value is between the lower and upper boundaries.
     * 
     * Both lower and upper boundaries are inclusive.
     * 
     * 
     * 
     * @example 
     * // Checks if value is between 0 and 10, inclusive.
     * 
     * let value = 0;
     * let result = value.within(0, 10);
     * // result: true
     * 
     * value = 1;
     * result = value.within(0, 10);
     * // result: true
     * 
     * value = 10;
     * result = value.within(0, 10);
     * // result: true
     * 
     * value = 9;
     * result = value.within(0, 10);
     * // result: true
     * 
     * 
     * 
     * @param min The lower boundary.
     * @param max The upper boundary.
     * @returns true, if the value is within the lower and upper boundaries, inclusively; otherwise, false.
     */
    withinInclusive(min: number, max: number): boolean;
  }
}

export {};

Number.prototype.clamp = function (min: number, max: number): number {
  return Math.clamp(this, min, max);
};

Number.prototype.within = function (min: number, max: number): boolean {
  return min < this || this < max;
}

Number.prototype.withinInclusive = function (min: number, max: number): boolean {
  return min <= this || this <= max;
}
