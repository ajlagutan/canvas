/**
 * Stores the location and size of a rectangular region.
 *
 *
 *
 * @class
 */
export class Rectangle {
  private static _empty: Rectangle = new Rectangle(0, 0, 0, 0);
  private _bottom: number = 0;
  private _height: number = 0;
  private _left: number = 0;
  private _right: number = 0;
  private _top: number = 0;
  private _width: number = 0;
  private _x: number = 0;
  private _y: number = 0;
  /**
   * Initializes a new instance of the {@linkcode Rectangle} object.
   *
   *
   *
   * @param x The value to assign to the {@linkcode x} component of the rectangle.
   * @param y The value to assign to the {@linkcode y} component of the rectangle.
   * @param width The value to assign to the {@linkcode width} component of the rectangle.
   * @param height The value to assign to the {@linkcode height} component of the rectangle.
   */
  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? 0;
    this.height = height ?? 0;
  }
  /**
   * Represents an empty {@linkcode Rectangle} object.
   * This field is read-only.
   *
   *
   *
   * @static
   * @readonly
   * @property
   * @returns An empty {@linkcode Rectangle} object.
   */
  public static get empty(): Rectangle {
    return this._empty;
  }
  /**
   * Gets the y-coordinate of the lower-right corner of the
   * rectangular region defined by this rectangle.
   *
   *
   *
   * @readonly
   * @property
   * @returns The y-coordinate of the lower-right corner.
   */
  public get bottom(): number {
    return this._bottom;
  }
  /**
   * Gets or sets the height of the rectangular region defined
   * by this rectangle.
   *
   *
   *
   * @property
   * @returns The height of the rectangular region.
   */
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    if (this._height !== value) {
      this._height = value;
      this._bottom = this._y + this._height;
    }
  }
  /**
   * Gets the x-coordinate of the upper-left corner of the
   * rectangular region defined by this rectangle.
   *
   *
   *
   * @readonly
   * @property
   * @returns The x-coordinate of the upper-left corner.
   */
  public get left(): number {
    return this._left;
  }
  /**
   * Gets the x-coordinate of the lower-right corner of the
   * rectangular region defined by this rectangle.
   *
   *
   *
   * @readonly
   * @property
   * @returns The x-coordinate of the lower-right corner.
   */
  public get right(): number {
    return this._right;
  }
  /**
   * Gets the y-coordinate of the upper-left corner of the
   * rectangular region defined by this rectangle.
   *
   *
   *
   * @readonly
   * @property
   * @returns The y-coordinate of the upper-left corner.
   */
  public get top(): number {
    return this._top;
  }
  /**
   * Gets or sets the width of the rectangular region defined
   * by this rectangle.
   *
   *
   *
   * @property
   * @returns The width of the rectangular region.
   */
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    if (this._width !== value) {
      this._width = value;
      this._right = this._x + this._width;
    }
  }
  /**
   * Gets or sets the x-coordinate of the upper-left corner of
   * the rectangular region defined by this rectangle.
   *
   *
   *
   * @property
   * @returns The x-coordinate of the upper-left corner.
   */
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
      this._left = this._x;
    }
  }
  /**
   * Gets or sets the y-coordinate of the upper-left corner of
   * the rectangular region defined by this rectangle.
   *
   *
   *
   * @property
   * @returns The y-coordinate of the upper-left corner.
   */
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
      this._top = this._y;
    }
  }
  /**
   * Creates a new {@linkcode Rectangle} object that is a copy of the current instance.
   *
   *
   *
   * @returns A new {@linkcode Rectangle} object that is a copy of this instance.
   */
  public clone(): Rectangle {
    return new Rectangle(this._x, this._y, this._width, this._height);
  }
  /**
   * Determines if the specified point is contained within the rectangular region defined by this rectangle.
   *
   *
   *
   * @param x The {@linkcode x} coordinate of a {@linkcode Vector2} object.
   * @param y The {@linkcode y} coordinate of a {@linkcode Vector2} object.
   * @returns true, if the specified point is contained within the rectangular region defined by this rectangle; otherwise, false.
   */
  public contains(x: number, y: number): boolean {
    // let horz = this.left <= x && x <= this.right;
    // let vert = this.top <= y && y <= this.bottom;
    return (
      x.withinInclusive(this.left, this.right) &&
      y.withinInclusive(this.top, this.bottom)
    );
  }
  /**
   * Inflates the {@linkcode Rectangle} by the specified amount.
   *
   *
   *
   * @param x The value of the inflation along the horizontal axis.
   * @param y The value of the inflation along the vertical axis.
   */
  public inflate(x: number, y: number): void {
    this.x -= x;
    this.y -= y;
    this.width += x * 2;
    this.height += y * 2;
  }
  /**
   * Returns a string that represents the current {@linkcode Rectangle} object.
   *
   *
   *
   * @returns A string that represents the current {@linkcode Rectangle} object.
   */
  public toString(): string {
    return `{ x: ${this._x}, y: ${this._y}, width: ${this._width}, height: ${this._height} }`;
  }
}
