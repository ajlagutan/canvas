import { Vector2 } from "@/core";
/**
 * Represents a vector with three single-precision floating-point values.
 *
 *
 *
 * @class
 */
export class Vector3 extends Vector2 {
  private _z: number;
  /**
   * Initializes a new instance of the {@linkcode Vector3} object.
   *
   *
   *
   * @param x The value to assign to the X component of the {@linkcode Vector3} object.
   * @param y The value to assign to the Y component of the {@linkcode Vector3} object.
   * @param z The value to assign to the Z component of the {@linkcode Vector3} object.
   */
  constructor(x?: number, y?: number, z?: number) {
    super(x, y);
    this._z = z ?? 0;
  }
  /**
   * Gets or sets the value of Z component of the current {@linkcode Vector3} object.
   *
   *
   *
   * @property
   * @returns The value of Z component.
   */
  public get z(): number {
    return this._z;
  }
  public set z(value: number) {
    if (this._z !== value) {
      this._z = value;
    }
  }
  /**
   * Returns a new instance of {@linkcode Vector3} object with zero value for X, Y, and Z components.
   * 
   * 
   * 
   * @public
   * @static
   * @method
   * @returns A new instance of {@link Vector3} object.
   */
  public static empty(): Vector3 {
    return new Vector3();
  }
}
