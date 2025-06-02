import { clamp } from "../../core/_utils";
/**
 * Different color structures.
 *
 *
 *
 * @enum
 */
type ColorModel = "rgb" | "hsl" | "hsv";
/**
 * Represents color object that holds four single-precision floating point components.
 *
 * The X, Y, and Z components would vary depending on the mode used.
 *
 * The W component would always be the alpha value of the color.
 *
 *
 *
 * @class
 */
export class Color {
  private _mode: ColorModel;
  private _w: number;
  private _x: number;
  private _y: number;
  private _z: number;
  /**
   * Creates a new instance of Color object.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param mode The mode used in creating the color structure.
   * @param x The X component of the color. Values can be Red, or Hue.
   * @param y The Y component of the color. Values can be Green, or Saturation.
   * @param z The Z component of the color. Values can be Blue, Value, or Lightness.
   * @param w The Alpha component of the color.
   */
  private constructor(
    mode: ColorModel,
    x: number,
    y: number,
    z: number,
    w: number
  ) {
    this._mode = mode;
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  public get blue(): number {
    return this._mode === "rgb" ? clamp(this._z * 255, 0, 255) : 0;
  }
  public get green(): number {
    return this._mode === "rgb" ? clamp(this._y * 255, 0, 255) : 0;
  }
  public get hue(): number {
    return this._mode === "hsl" || this._mode === "hsv"
      ? clamp(this._x * 360, 0, 360)
      : 0;
  }
  public get lightness(): number {
    if (this._mode === "hsl") {
      return clamp(this._z * 100, 0, 100);
    }
    if (this._mode === "hsv") {
    }
    return 0;
  }
  public get red(): number {
    return this._mode === "rgb" ? clamp(this._x * 255, 0, 255) : 0;
  }
  public get saturation(): number {
    return this._mode === "hsl" || this._mode === "hsv"
      ? clamp(this._y * 100, 0, 100)
      : 0;
  }
  /**
   * Creates a Color object that represents an HSL structure.
   *
   *
   *
   * @param h The Hue component of the HSL structure.
   * @param s The Saturation/Chroma component of the HSL structure.
   * @param l The Lightness component of the HSL structure.
   * @returns Color
   */
  public static fromHsl(h: number, s: number, l: number): Color {
    return new Color(
      "hsl",
      clamp(h, 0, 360) / 360, //  Normalized hue value.
      clamp(s, 0, 100) / 100, //  Normalized saturation value.
      clamp(l, 0, 100) / 100, //  Normalized lightness value.
      1
    );
  }
  /**
   * Creates a Color object that represents an HSL/A structure.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param h The Hue component of the HSL structure.
   * @param s The Saturation/Chroma component of the HSL structure.
   * @param l The Lightness component of the HSL structure.
   * @param a Optional. The Alpha component of the HSLA structure. (Default = 1)
   * @returns Color
   */
  public static fromHsla(h: number, s: number, l: number, a: number): Color {
    return new Color(
      "hsl",
      clamp(h, 0, 360) / 360, //  Normalized hue value.
      clamp(s, 0, 100) / 100, //  Normalized saturation value.
      clamp(l, 0, 100) / 100, //  Normalized lightness value.
      clamp(a, 0, 1) / 1 // Normalized alpha value.
    );
  }
  /**
   * Creates a Color object that represents an RGB/A structure.
   *
   *
   *
   * @param r The Red component of the RGB structure.
   * @param g The Green component of the RGB structure.
   * @param b The Blue component of the RGB structure.
   * @returns Color
   */
  public static fromRgb(r: number, g: number, b: number): Color {
    return new Color(
      "rgb",
      clamp(r, 0, 255) / 255, //  Normalized red value.
      clamp(g, 0, 255) / 255, //  Normalized green value.
      clamp(b, 0, 255) / 255, //  Normalized blue value.
      1
    );
  }
  /**
   * Creates a Color object that represents an RGB/A structure.
   *
   * The Alpha component is optional. If not specified, it defaults to 1.
   *
   *
   *
   * @param r The Red component of the RGB structure.
   * @param g The Green component of the RGB structure.
   * @param b The Blue component of the RGB structure.
   * @param a Optional. The Alpha component of the RGBA structure. (Default = 1)
   * @returns Color
   */
  public static fromRgba(r: number, g: number, b: number, a: number): Color {
    return new Color(
      "rgb",
      clamp(r, 0, 255) / 255, //  Normalized red value.
      clamp(g, 0, 255) / 255, //  Normalized green value.
      clamp(b, 0, 255) / 255, //  Normalized blue value.
      clamp(a, 0, 1) / 1 //  Normalized alpha value.
    );
  }
  /**
   * Compares two color objects.
   *
   * The Alpha component is not compared.
   *
   *
   *
   * @param color1 The first color to compare.
   * @param color2 The second color to compare.
   */
  public static is(color1: Color, color2: Color): boolean {
    if (color1 === color2) return true;
    if (color1._mode !== color2._mode) return false;
    return (
      color1._x === color2._x &&
      color1._y === color2._y &&
      color1._z === color2._z
    );
  }
  /**
   * Clones the color values to a new Color instance.
   *
   * By default, it does not include the alpha component.
   *
   *
   *
   * @param includeAlpha If true, the alpha component is also cloned. (Default = false)
   * @returns Color
   */
  public clone(includeAlpha: boolean = false): Color {
    return new Color(
      this._mode,
      this._x,
      this._y,
      this._z,
      includeAlpha ? this._w : 1
    );
  }
  /**
   * Compares the color object to another color object.
   *
   * The Alpha component is not compared.
   *
   *
   *
   * @param other The other color to compare with.
   * @returns boolean
   */
  public is(other: Color): boolean {
    return Color.is(this, other);
  }
  /**
   * Converts the Color object to HSL/A structure.
   *
   *
   *
   *
   *
   * @returns Color (HSL mode)
   */
  public toHsla(): Color {
    if (this._mode === "hsl") {
      throw new Error("Color is already an HSL model.");
    }
    let r = this._x;
    let g = this._y;
    let b = this._z;

    let h = 0;
    let s = 0;
    let l = 0;

    let cmax = Math.max(r, g, b);
    let cmin = Math.min(r, g, b);
    let d = cmax - cmin;

    l = (cmax + cmin) / 2;

    if (d === 0) s = 0;
    if (d !== 0) s = d / (1 - Math.abs(2 * l - 1));

    if (d === 0) h = 0;
    else if (cmax === r) h = 60 * (((g - b) / d) % 6);
    else if (cmax === g) h = 60 * ((b - r) / d + 2);
    else if (cmax === b) h = 60 * ((r - g) / d + 4);

    h = clamp(h, 0, 360);
    s = clamp(s, 0, 1) * 100;
    l = clamp(l, 0, 1) * 100;

    return Color.fromHsla(h, s, l, this._w);
  }
  /**
   * Converts the Color object to a string value.
   *
   * HSL and HSV are not compatible with the {@linkcode hex} parameter.
   *
   *
   * @param [hex=false] If true, the string value is a hexadecimal string.
   * @returns string
   */
  public toString(hex: boolean = false): string {
    let o = { x: 0, y: 0, z: 0, w: 0 };
    let s = "transparent";
    if (this._mode === "rgb") {
      o.x = clamp(this._x * 255, 0, 255);
      o.y = clamp(this._y * 255, 0, 255);
      o.z = clamp(this._z * 255, 0, 255);
      o.w = clamp(this._w * 1, 0, 1);
      if (hex) {
        o.w = clamp(this._w * 255, 0, 255);
        let x16 = o.x.toString(16).padStart(2, "0");
        let y16 = o.y.toString(16).padStart(2, "0");
        let z16 = o.z.toString(16).padStart(2, "0");
        let w16 = o.w.toString(16).padStart(2, "0");
        return o.w === 255
          ? `#${x16}${y16}${z16}`
          : `#${x16}${y16}${z16}${w16}`;
      }
      s = o.w === 1 ? "rgb(/x/,/y/,/z/)" : "rgba(/x/,/y/,/z/,/w/)";
    }
    if (this._mode === "hsl") {
      if (hex) {
        throw new Error("HSL model is not convertible to HEX color string.");
      }
      o.x = clamp(this._x * 360, 0, 360);
      o.y = clamp(this._y * 100, 0, 100);
      o.z = clamp(this._z * 100, 0, 100);
      o.w = clamp(this._w * 1, 0, 1);
      s = o.w === 1 ? "hsl(/x/deg,/y/%,/z/%)" : "hsla(/x/deg,/y/%,/z/%,/w/)";
    }
    if (this._mode === "hsv") {
      if (hex) {
        throw new Error("HSV model is not convertible to HEX color string.");
      }
      o.x = clamp(this._x * 360, 0, 360);
      o.y = clamp(this._y * 100, 0, 100);
      o.z = clamp(this._z * 100, 0, 100);
      o.w = clamp(this._w * 1, 0, 1);
      s = o.w === 1 ? "hsv(/x/deg,/y/%,/z/%)" : "hsva(/x/deg,/y/%,/z/%,/w/)";
    }
    return s.replace(/\/\w\//g, (str: string) => {
      return o[str.substring(1, 2)];
    });
  }
}
