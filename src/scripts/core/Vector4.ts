import { Vector3 } from "@/core";
/**
 * Represents a vector with four single-precision floating-point values.
 *
 *
 *
 * @class
 */
export class Vector4 extends Vector3 {
  private _w: number;
  /**
   * Initializes a new instance of the {@linkcode Vector4} object.
   *
   *
   *
   * @param w The value to assign to the W component of the {@linkcode Vector4} object.
   * @param x The value to assign to the X component of the {@linkcode Vector4} object.
   * @param y The value to assign to the Y component of the {@linkcode Vector4} object.
   * @param z The value to assign to the Z component of the {@linkcode Vector4} object.
   */
  constructor(w?: number, x?: number, y?: number, z?: number) {
    super(x, y, z);
    this._w = w ?? 0;
  }
  /**
   * Gets or sets the value of W component of the current {@linkcode Vector4} object.
   *
   *
   *
   * @property
   * @returns The value of the W component.
   */
  public get w(): number {
    return this._w;
  }
  public set w(value: number) {
    if (this._w !== value) {
      this._w = value;
    }
  }
  /**
   * Returns a new instance of {@linkcode Vector4} object with zero value for W, X, Y, and Z components.
   * 
   * 
   * 
   * @public
   * @static
   * @method
   * @returns A new instance of {@link Vector4} object.
   */
  public static empty(): Vector4 {
    return new Vector4();
  }
}
