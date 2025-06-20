import { logger } from "./_utils";
/**
 * Contains utility functions for translating color models.
 *
 *
 *
 * @namespace
 */
export namespace ColorTranslator {
  const hue0 = 0 / 360;
  const hue1 = 60 / 360;
  const hue2 = 120 / 360;
  const hue3 = 180 / 360;
  const hue4 = 240 / 360;
  const hue5 = 300 / 360;
  const hue6 = 360 / 360;
  /**
   * Gets or sets the verbosity of {@linkcode ColorTranslator} namespace.
   *
   *
   *
   * @property
   */
  export let verbose: boolean = true;
  /**
   * An object representing a CMYK structure.
   */
  export type cmyk = {
    /**
     * The Cyan component of the CMYK structure.
     * @property
     */
    c: number;
    /**
     * The Magenta component of the CMYK structure.
     * @property
     */
    m: number;
    /**
     * The Yellow component of the CMYK structure.
     * @property
     */
    y: number;
    /**
     * The Black component of the CMYK structure.
     * @property
     */
    k: number;
  };
  /**
   * An object representing an HSL structure.
   */
  export type hsl = {
    /**
     * The Hue component of the HSL structure.
     * @property
     */
    h: number;
    /**
     * The Saturation component of the HSL structure.
     * @property
     */
    s: number;
    /**
     * The Lightness component of the HSL structure.
     * @property
     */
    l: number;
  };
  /**
   * An object representing an HSV structure.
   */
  export type hsv = {
    /**
     * The Hue component of the HSV structure.
     * @property
     */
    h: number;
    /**
     * The Saturation component of the HSV structure.
     * @property
     */
    s: number;
    /**
     * The Value component of the HSV structure.
     * @property
     */
    v: number;
  };
  /**
   * An object representing an RGB structure.
   */
  export type rgb = {
    /**
     * The Red component of the RGB structure.
     * @property
     */
    r: number;
    /**
     * The Green component of the RGB structure.
     * @property
     */
    g: number;
    /**
     * The Blue component of the RGB structure.
     * @property
     */
    b: number;
  };
  /**
   * Converts a CMYK values to an RGB values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode c}, {@linkcode m}, {@linkcode y}, and {@linkcode k} values.
   * @returns An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   */
  export function cmyk_to_rgb(parameters: cmyk): rgb {
    let { c, m, y, k } = parameters;

    c = Math.clamp(c, 0, 1);
    m = Math.clamp(m, 0, 1);
    y = Math.clamp(y, 0, 1);
    k = Math.clamp(k, 0, 1);

    let r = (1 - c) * (1 - k);
    let g = (1 - m) * (1 - k);
    let b = (1 - y) * (1 - k);

    return { r, g, b };
  }
  /**
   * Converts an HSL values to an HSV values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode l} values.
   * @returns An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode v} values.
   */
  export function hsl_to_hsv(parameters: hsl): hsv {
    let { h, s, l } = parameters;

    h = Math.clamp(h, 0, 1);
    s = Math.clamp(s, 0, 1);
    l = Math.clamp(l, 0, 1);

    let v = l + s * Math.min(l, 1 - l);
    let sv = v === 0 ? 0 : 2 - (2 * l) / v;

    return { h, s: sv, v };
  }
  /**
   * Converts an HSL values to an RGB values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode l} values.
   * @returns An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   */
  export function hsl_to_rgb(parameters: hsl): rgb {
    let { h, s, l } = parameters;

    h = Math.clamp(h, 0, 1);
    s = Math.clamp(s, 0, 1);
    l = Math.clamp(l, 0, 1);

    let values = [0, 0, 0];

    let C = (1 - Math.abs(2 * l - 1)) * s;
    let X = C * (1 - Math.abs(((h / hue1) % 2) - 1));
    let m = l - C / 2;

    if (_within(h, hue0, hue1)) values = [C, X, 0];
    if (_within(h, hue1, hue2)) values = [X, C, 0];
    if (_within(h, hue2, hue3)) values = [0, C, X];
    if (_within(h, hue3, hue4)) values = [0, X, C];
    if (_within(h, hue4, hue5)) values = [X, 0, C];
    if (_within(h, hue5, hue6)) values = [C, 0, X];

    let r = values[0] + m;
    let g = values[1] + m;
    let b = values[2] + m;

    return { r, g, b };
  }
  /**
   * Converts an HSV values to an HSL values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode v} values.
   * @returns An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode l} values.
   */
  export function hsv_to_hsl(parameters: hsv): hsl {
    let { h, s, v } = parameters;

    h = Math.clamp(h, 0, 1);
    s = Math.clamp(s, 0, 1);
    v = Math.clamp(v, 0, 1);

    let l = v - (v * s) / 2;
    let sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return { h, s: sl, l };
  }
  /**
   * Converts an HSV values to an RGB values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode v} values.
   * @returns An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   */
  export function hsv_to_rgb({ h, s, v }: hsv): rgb {
    h = Math.clamp(h, 0, 1);
    s = Math.clamp(s, 0, 1);
    v = Math.clamp(v, 0, 1);

    let values = [0, 0, 0];

    let C = v * s;
    let X = C * (1 - Math.abs(((h / hue1) % 2) - 1));
    let m = v - C;

    if (_within(h, hue0, hue1)) values = [C, X, 0];
    if (_within(h, hue1, hue2)) values = [X, C, 0];
    if (_within(h, hue2, hue3)) values = [0, C, X];
    if (_within(h, hue3, hue4)) values = [0, X, C];
    if (_within(h, hue4, hue5)) values = [X, 0, C];
    if (_within(h, hue5, hue6)) values = [C, 0, X];

    let r = values[0] + m;
    let g = values[1] + m;
    let b = values[2] + m;

    return { r, g, b };
  }
  /**
   * Converts an RGB values to a CMYK values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   * @returns An object representing the {@linkcode c}, {@linkcode m}, {@linkcode y}, and {@linkcode k} values.
   */
  export function rgb_to_cmyk({ r, g, b }: rgb): cmyk {
    r = Math.clamp(r, 0, 1);
    g = Math.clamp(g, 0, 1);
    b = Math.clamp(b, 0, 1);

    let c = 0;
    let m = 0;
    let y = 0;
    let k = 0;

    let cmax = Math.max(r, g, b);

    k = 1 - cmax;
    y = (1 - b - k) / (1 - k) || 0;
    m = (1 - g - k) / (1 - k) || 0;
    c = (1 - r - k) / (1 - k) || 0;

    return { c, m, y, k };
  }
  /**
   * Converts an RGB values to an HSL values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   * @returns An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode l} values.
   */
  export function rgb_to_hsl({ r, g, b }: rgb): hsl {
    r = Math.clamp(r, 0, 1);
    g = Math.clamp(g, 0, 1);
    b = Math.clamp(b, 0, 1);

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const d = cmax - cmin;

    let h = 0;
    let s = 0;
    let l = 0;

    // Lightness calculation
    l = (cmax + cmin) / 2;

    // Saturation calculation
    if (d === 0) s = 0;
    if (d !== 0) s = d / (1 - Math.abs(2 * l - 1));

    // Hue calculation
    if (d === 0) h = 0;
    else if (cmax === r) h = hue1 * (((g - b) / d) % 6);
    else if (cmax === g) h = hue1 * ((b - r) / d + 2);
    else if (cmax === b) h = hue1 * ((r - g) / d + 4);

    if (h < 0) h = h + hue6;

    return { h, s, l };
  }
  /**
   * Converts an RGB values to an HSV values.
   *
   *
   *
   * @param parameters An object representing the {@linkcode r}, {@linkcode g}, and {@linkcode b} values.
   * @returns An object representing the {@linkcode h}, {@linkcode s}, and {@linkcode v} values.
   */
  export function rgb_to_hsv({ r, g, b }: rgb): hsv {
    r = Math.clamp(r, 0, 1);
    g = Math.clamp(g, 0, 1);
    b = Math.clamp(b, 0, 1);

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const d = cmax - cmin;

    let h = 0;
    let s = 0;
    let v = 0;

    // Lightness calculation
    v = cmax;

    // Saturation calculation
    if (d === 0) s = 0;
    if (d !== 0) s = d / cmax;

    // Hue calculation
    if (d === 0) h = 0;
    else if (cmax === r) h = hue1 * (((g - b) / d) % 6);
    else if (cmax === g) h = hue1 * ((b - r) / d + 2);
    else if (cmax === b) h = hue1 * ((r - g) / d + 4);

    if (h < 0) h = h + hue6;

    return { h, s, v };
  }
  function _within(value: number, min: number, max: number): boolean {
    return min <= value && value < max;
  }
}
