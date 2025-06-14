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
    /**
     * Converts the {@linkcode radian} value to degrees.
     *
     *
     *
     * @param radian The radian value to convert.
     * @returns The degree value.
     */
    degree(radian: number): number;
    /**
     * Returns the distance between a two point coordinates in a 2D plane.
     * 
     * 
     * 
     * @param x1 The value of the first X-coordinate in a 2D plane.
     * @param y1 The value of the first Y-coordinate in a 2D plane.
     * @param x2 The value of the second X-coordinate in a 2D plane.
     * @param y2 The value of the second Y-coordinate in a 2D plane.
     * @returns The distance between a two point coordinates.
     */
    distance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Calculates the remainder of {@linkcode x} divided by {@linkcode y}.
     *
     *
     *
     * @param x The value of the dividend in a modulo operation.
     * @param y The value of the divisor in a modulo operation.
     * @returns The remainder of {@linkcode x} divided by {@linkcode y}.
     */
    mod(x: number, y: number): number;
    /**
     * Converts the {@linkcode degree} value to radians.
     *
     *
     *
     * @param degree The degree value to convert.
     * @returns The radian value.
     */
    radian(degree: number): number;
    /**
     * Generates a random floating number between
     * the {@linkcode min} and {@linkcode max} value.
     *
     *
     *
     * @param min The minimum value, inclusive.
     * @param max The maximum value, inclusive.
     * @returns A random floating number.
     */
    random_float(min: number, max: number): number;
    /**
     * Generates a random integer between
     * the {@linkcode min} (inclusive)
     * and {@linkcode max} (exclusive) value.
     *
     *
     *
     * @param min The minimum value, inclusive.
     * @param max The maximum value, exclusive.
     * @returns A random integer number.
     */
    random_int(min: number, max: number): number;
    /**
     * Generates a random non-zero integer between
     * the {@linkcode min} (inclusive)
     * and {@linkcode max} (exclusive) value.
     *
     *
     *
     * @param min The minimum value, inclusive.
     * @param max The maximum value, exclusive.
     * @returns A random non-zero integer number.
     */
    random_nonzero(min: number, max: number): number;
  }
}

export {};

Math.clamp = function (value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
};

Math.degree = function (radian: number): number {
  return radian * (180 / Math.PI);
};

Math.distance = function (x1: number, y1: number, x2: number, y2: number): number {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

Math.mod = function (x: number, y: number): number {
  return ((x % y) + y) % y;
};

Math.radian = function (degree: number): number {
  return degree * (Math.PI / 180);
};

Math.random_float = function (min: number, max: number): number {
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  return Math.random() * (max - min) + min;
};

Math.random_int = function (min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

Math.random_nonzero = function (min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error("Invalid range: min must be less than max");
  }
  if (min <= 0 && max >= 0 && max - min === 1) {
    throw new Error("Only possible result is zero, which is not allowed");
  }
  let num: number;
  do {
    num = Math.floor(Math.random() * (max - min)) + min;
  } while (num === 0);
  return num;
};
