import { ColorTranslator, logger } from "@/core";
/**
 * Color models that is supported by this code.
 *
 *
 *
 * @enum
 */
enum COLOR_MODEL {
  RGB = 0,
  HSL = 1,
  HSV = 2,
  CMYK = 3,
}
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
  private static _transparent = new Color(COLOR_MODEL.RGB, 0, 0, 0, 0);
  private _m: number;
  private _w: number;
  private _x: number;
  private _y: number;
  private _z: number;
  /**
   * Initializes a new instance of the {@linkcode Color} object.
   *
   *
   *
   * @private
   * @constructor
   * @param m The color model value to assign to the structure.
   * @param x The single-precision floating value to assign to the {@linkcode x} component of the color.
   * @param y The single-precision floating value to assign to the {@linkcode y} component of the color.
   * @param z The single-precision floating value to assign to the {@linkcode z} component of the color.
   * @param w The single-precision floating value to assign to the {@linkcode w} component of the color.
   */
  private constructor(
    m?: number,
    x?: number,
    y?: number,
    z?: number,
    w?: number
  ) {
    this._m = m ?? 0;
    this._x = x ?? 0;
    this._y = y ?? 0;
    this._z = z ?? 0;
    this._w = w ?? 1;
  }
  /**
   * Represents a transparent {@linkcode Color} object.
   * This field is read-only.
   *
   *
   *
   * @static
   * @readonly
   * @property
   * @returns A transparent {@linkcode Color} object.
   */
  public static get transparent(): Color {
    return this._transparent;
  }
  /**
   * Gets the alpha component value of the {@linkcode Color} object.
   *
   *
   *
   * @readonly
   * @property
   * @returns The alpha component value.
   */
  public get w(): number {
    if (this.isCMYK()) return this._w * 100;
    return this._w;
  }
  /**
   * Gets the X component value of the {@linkcode Color} object.
   * - {@linkcode x} component value is Red, if model is RGB. (0 .. 255)
   * - {@linkcode x} component value is Hue, if model is HSL/V. (0 .. 360)
   * - {@linkcode x} component value is Cyan, if model is CMYK. (0 .. 100)
   *
   *
   *
   * @readonly
   * @property
   * @returns The X component value.
   */
  public get x(): number {
    if (this.isCMYK()) return this._x * 100;
    if (this.isHSL()) return this._x * 360;
    if (this.isHSV()) return this._x * 360;
    if (this.isRGB()) return this._x * 255;
    return this._x * 0;
  }
  /**
   * Gets the Y component value of the {@linkcode Color} object.
   * - {@linkcode y} component value is Green, if model is RGB. (0 .. 255)
   * - {@linkcode y} component value is Saturation, if model is HSL/V. (0 .. 100)
   * - {@linkcode y} component value is Magenta, if model is CMYK. (0 .. 100)
   *
   *
   *
   * @readonly
   * @property
   * @returns The Y component value.
   */
  public get y(): number {
    if (this.isCMYK()) return this._y * 100;
    if (this.isHSL()) return this._y * 100;
    if (this.isHSV()) return this._y * 100;
    if (this.isRGB()) return this._y * 255;
    return this._y * 0;
  }
  /**
   * Gets the Z component value of the {@linkcode Color} object.
   * - {@linkcode z} component value is Blue, if model is RGB. (0 .. 255)
   * - {@linkcode z} component value is Lightness, if model is HSL. (0 .. 100)
   * - {@linkcode z} component value is Value, if model is HSV. (0 .. 100)
   * - {@linkcode z} component value is Yellow, if model is CMYK. (0 .. 100)
   *
   *
   *
   * @readonly
   * @property
   * @returns The Z component value.
   */
  public get z(): number {
    if (this.isCMYK()) return this._z * 100;
    if (this.isHSL()) return this._z * 100;
    if (this.isHSV()) return this._z * 100;
    if (this.isRGB()) return this._z * 255;
    return this._z * 0;
  }
  /**
   * Creates a new {@linkcode Color} object that has a CMYK structure.
   *
   *
   *
   * @param c The value to assign to the Cyan component of the CMYK structure.
   * @param m The value to assign to the Magenta component of the CMYK structure.
   * @param y The value to assign to the Yellow component of the CMYK structure.
   * @param k The value to assign to the Black component of the CMYK structure.
   * @returns A new {@linkcode Color} object that has a CMYK structure.
   */
  public static cmyk(c: number, m: number, y: number, k: number): Color {
    c = Math.clamp(c / 100, 0, 1);
    m = Math.clamp(m / 100, 0, 1);
    y = Math.clamp(y / 100, 0, 1);
    k = Math.clamp(k / 100, 0, 1);
    return new Color(COLOR_MODEL.CMYK, c, m, y, k);
  }
  /**
   * Creates a new {@linkcode Color} object that has an HSL structure.
   *
   *
   *
   * @param h The value to assign to the Hue component of the HSL structure.
   * @param s The value to assign to the Saturation component of the HSL structure.
   * @param l The value to assign to the Lightness component of the HSL structure.
   * @returns A new {@linkcode Color} object that has an HSL structure.
   */
  public static hsl(h: number, s: number, l: number): Color {
    return this.hsla(h, s, l, 1);
  }
  /**
   * Creates a new {@linkcode Color} object that has an HSL/A structure.
   *
   *
   *
   * @param h The value to assign to the Hue component of the HSL/A structure.
   * @param s The value to assign to the Saturation component of the HSL/A structure.
   * @param l The value to assign to the Lightness component of the HSL/A structure.
   * @param a The value to assign to the Alpha component of the HSL/A structure.
   * @returns A new {@linkcode Color} object that has an HSL/A structure.
   */
  public static hsla(h: number, s: number, l: number, a: number): Color {
    h = Math.clamp(h / 360, 0, 1);
    s = Math.clamp(s / 100, 0, 1);
    l = Math.clamp(l / 100, 0, 1);
    a = Math.clamp(a, 0, 1);
    return new Color(COLOR_MODEL.HSL, h, s, l, a);
  }
  /**
   * Creates a new {@linkcode Color} object that has an HSV structure.
   *
   *
   *
   * @param h The value to assign to the Hue component of the HSV structure.
   * @param s The value to assign to the Saturation component of the HSV structure.
   * @param v The value to assign to the Value component of the HSV structure.
   * @returns A new {@linkcode Color} object that has an HSV structure.
   */
  public static hsv(h: number, s: number, v: number): Color {
    return this.hsva(h, s, v, 1);
  }
  /**
   * Creates a new {@linkcode Color} object that has an HSV/A structure.
   *
   *
   *
   * @param h The value to assign to the Hue component of the HSV/A structure.
   * @param s The value to assign to the Saturation component of the HSV/A structure.
   * @param v The value to assign to the Value component of the HSV/A structure.
   * @param a The value to assign to the Alpha component of the HSV/A structure.
   * @returns A new {@linkcode Color} object that has an HSV/A structure.
   */
  public static hsva(h: number, s: number, v: number, a: number): Color {
    h = Math.clamp(h / 360, 0, 1);
    s = Math.clamp(s / 100, 0, 1);
    v = Math.clamp(v / 100, 0, 1);
    a = Math.clamp(a, 0, 1);
    return new Color(COLOR_MODEL.HSV, h, s, v, a);
  }
  /**
   * Creates a new {@linkcode Color} object that has an RGB structure.
   *
   *
   *
   * @param r The value to assign to the Red component of the RGB structure.
   * @param g The value to assign to the Green component of the RGB structure.
   * @param b The value to assign to the Blue component of the RGB structure.
   * @returns A new {@linkcode Color} object that has an RGB structure.
   */
  public static rgb(r: number, g: number, b: number): Color {
    return this.rgba(r, g, b, 1);
  }
  /**
   * Creates a new {@linkcode Color} object that has an RGB/A structure.
   *
   *
   *
   * @param r The value to assign to the Red component of the RGB/A structure.
   * @param g The value to assign to the Green component of the RGB/A structure.
   * @param b The value to assign to the Blue component of the RGB/A structure.
   * @param a The value to assign to the Alpha component of the RGB/A structure.
   * @returns A new {@linkcode Color} object that has an RGB/A structure.
   */
  public static rgba(r: number, g: number, b: number, a: number): Color {
    r = Math.clamp(r / 255, 0, 1);
    g = Math.clamp(g / 255, 0, 1);
    b = Math.clamp(b / 255, 0, 1);
    a = Math.clamp(a, 0, 1);
    return new Color(COLOR_MODEL.RGB, r, g, b, a);
  }
  /**
   * Creates a new {@linkcode Color} object that is a copy of the current instance.
   *
   *
   *
   * @returns A new {@linkcode Color} object that is a copy of this instance.
   */
  public clone(): Color {
    return new Color(this._m, this._x, this._y, this._z, this._w);
  }
  /**
   * Converts the current instance to a new {@linkcode Color} object that has a CMYK structure.
   *
   *
   *
   * @throws Converting to CMYK is not supported.
   * @returns A new {@linkcode Color} object that has a CMYK structure.
   */
  public toCMYK(): Color {
    if (this.isCMYK()) {
      return this.clone();
    }
    if (this.isHSL()) {
      const source = { h: this._x, s: this._y, l: this._z };
      const rgb = ColorTranslator.hsl_to_rgb(source);
      const cmyk = ColorTranslator.rgb_to_cmyk(rgb);
      return new Color(COLOR_MODEL.CMYK, cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    }
    if (this.isHSV()) {
      const source = { h: this._x, s: this._y, v: this._z };
      const rgb = ColorTranslator.hsv_to_rgb(source);
      const cmyk = ColorTranslator.rgb_to_cmyk(rgb);
      return new Color(COLOR_MODEL.CMYK, cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    }
    if (this.isRGB()) {
      const source = { r: this._x, g: this._y, b: this._z };
      const cmyk = ColorTranslator.rgb_to_cmyk(source);
      return new Color(COLOR_MODEL.CMYK, cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    }
    logger.error.call(this, "Converting to CMYK is not supported.");
    return Color.transparent;
  }
  /**
   * Converts the current instance to a new {@linkcode Color} object that has an HSL structure.
   *
   *
   *
   * @throws Converting to HSL is not supported.
   * @returns A new {@linkcode Color} object that has an HSL structure.
   */
  public toHSL(): Color {
    if (this.isHSL()) {
      return this.clone();
    }
    if (this.isCMYK()) {
      const source = { c: this._x, m: this._y, y: this._z, k: this._w };
      const rgb = ColorTranslator.cmyk_to_rgb(source);
      const hsl = ColorTranslator.rgb_to_hsl(rgb);
      return new Color(COLOR_MODEL.HSL, hsl.h, hsl.s, hsl.l);
    }
    if (this.isHSV()) {
      const source = { h: this._x, s: this._y, v: this._z };
      const hsl = ColorTranslator.hsv_to_hsl(source);
      return new Color(COLOR_MODEL.HSL, hsl.h, hsl.s, hsl.l);
    }
    if (this.isRGB()) {
      const source = { r: this._x, g: this._y, b: this._z };
      const hsl = ColorTranslator.rgb_to_hsl(source);
      return new Color(COLOR_MODEL.HSL, hsl.h, hsl.s, hsl.l);
    }
    logger.error.call(this, "Converting to HSL is not supported.");
    return Color.transparent;
  }
  /**
   * Converts the current instance to a new {@linkcode Color} object that has an HSV structure.
   *
   *
   *
   * @throws Converting to HSV is not supported.
   * @returns A new {@linkcode Color} object that has an HSV structure.
   */
  public toHSV(): Color {
    if (this.isHSV()) {
      return this.clone();
    }
    if (this.isCMYK()) {
      const source = { c: this._x, m: this._y, y: this._z, k: this._w };
      const rgb = ColorTranslator.cmyk_to_rgb(source);
      const hsv = ColorTranslator.rgb_to_hsv(rgb);
      return new Color(COLOR_MODEL.HSV, hsv.h, hsv.s, hsv.v);
    }
    if (this.isHSL()) {
      const source = { h: this._x, s: this._y, l: this._z };
      const hsv = ColorTranslator.hsl_to_hsv(source);
      return new Color(COLOR_MODEL.HSV, hsv.h, hsv.s, hsv.v);
    }
    if (this.isRGB()) {
      const source = { r: this._x, g: this._y, b: this._z };
      const hsv = ColorTranslator.rgb_to_hsv(source);
      return new Color(COLOR_MODEL.HSV, hsv.h, hsv.s, hsv.v);
    }
    logger.error.call(this, "Converting to HSV is not supported.");
    return Color.transparent;
  }
  /**
   * Converts the current instance to a new {@linkcode Color} object that has an RGB structure.
   *
   *
   *
   * @throws Converting to RGB is not supported.
   * @returns A new {@linkcode Color} object that has an RGB structure.
   */
  public toRGB(): Color {
    if (this.isRGB()) {
      return this.clone();
    }
    if (this.isCMYK()) {
      const source = { c: this._x, m: this._y, y: this._z, k: this._w };
      const rgb = ColorTranslator.cmyk_to_rgb(source);
      return new Color(COLOR_MODEL.RGB, rgb.r, rgb.g, rgb.b);
    }
    if (this.isHSL()) {
      const source = { h: this._x, s: this._y, l: this._z };
      const rgb = ColorTranslator.hsl_to_rgb(source);
      return new Color(COLOR_MODEL.RGB, rgb.r, rgb.g, rgb.b);
    }
    if (this.isHSV()) {
      const source = { h: this._x, s: this._y, v: this._z };
      const rgb = ColorTranslator.hsv_to_rgb(source);
      return new Color(COLOR_MODEL.RGB, rgb.r, rgb.g, rgb.b);
    }
    logger.error.call(this, "Converting to RGB is not supported.");
    return Color.transparent;
  }
  /**
   * Returns a string that represents the current {@linkcode Color} object.
   *
   *
   *
   * @returns A string that represents the current {@linkcode Color} object.
   */
  public toString(): string {
    if (this.isCMYK()) {
      return ColorTranslator.cmyk_to_str({
        c: this._x,
        m: this._y,
        y: this._z,
        k: this._w,
      });
    }
    if (this.isHSL()) {
      return ColorTranslator.hsl_to_str(
        {
          h: this._x,
          s: this._y,
          l: this._z,
        },
        this._w
      );
    }
    if (this.isHSV()) {
      return ColorTranslator.hsv_to_str(
        {
          h: this._x,
          s: this._y,
          v: this._z,
        },
        this._w
      );
    }
    if (this.isRGB()) {
      return ColorTranslator.rgb_to_str(
        {
          r: this._x,
          g: this._y,
          b: this._z,
        },
        this._w
      );
    }
    return "transparent";
  }
  /**
   * Determines whether the current instance color model is CMYK.
   *
   *
   *
   * @returns true, if the current instance color model is CMYK; otherwise, false.
   */
  private isCMYK(): boolean {
    return this._m === COLOR_MODEL.CMYK;
  }
  /**
   * Determines whether the current instance color model is HSL.
   *
   *
   *
   * @returns true, if the current instance color model is HSL; otherwise, false.
   */
  private isHSL(): boolean {
    return this._m === COLOR_MODEL.HSL;
  }
  /**
   * Determines whether the current instance color model is HSV.
   *
   *
   *
   * @returns true, if the current instance color model is HSV; otherwise, false.
   */
  private isHSV(): boolean {
    return this._m === COLOR_MODEL.HSV;
  }
  /**
   * Determines whether the current instance color model is RGB.
   *
   *
   *
   * @returns true, if the current instance color model is RGB; otherwise, false.
   */
  private isRGB(): boolean {
    return this._m === COLOR_MODEL.RGB;
  }
}
