/**
 * Represents a vector with two single-precision floating-point values.
 *
 *
 *
 * @class
 */
export class Vector2 {
  private _x: number;
  private _y: number;
  /**
   * Initializes a new instance of the {@linkcode Vector2} object.
   *
   *
   *
   * @param x The value to assign to the X component of the {@linkcode Vector2} object.
   * @param y The value to assign to the Y component of the {@linkcode Vector2} object.
   */
  constructor(x?: number, y?: number) {
    this._x = x ?? 0;
    this._y = y ?? 0;
  }
  /**
   * Gets or sets the value of X component of the current {@linkcode Vector2} object.
   *
   *
   *
   * @property
   * @returns number
   */
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
    }
  }
  /**
   * Gets or sets the value of Y component of the current {@linkcode Vector2} object.
   *
   *
   *
   * @property
   * @returns number
   */
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
    }
  }
  /**
   * Returns a new instance of {@linkcode Vector2} object with zero value for X and Y components.
   * 
   * 
   * 
   * @public
   * @static
   * @method
   * @returns A new instance of {@link Vector2} object.
   */
  public static empty(): Vector2 {
    return new Vector2();
  }
}
