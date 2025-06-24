import { DisplayableObject } from "@/core";

export abstract class Sprite extends DisplayableObject {
  /**
   * Gets or sets the X coordinate of the sprite on the rendering context.
   *
   *
   *
   * @public
   * @property
   */
  public x: number = 0;
  /**
   * Gets or sets the Y coordinate of the sprite on the rendering context.
   *
   *
   *
   * @public
   * @property
   */
  public y: number = 0;
  /**
   * Gets or sets the Z-order of the sprite on the rendering context.
   *
   *
   *
   * @public
   * @property
   */
  public zindex: number = 0;
  /**
   * Draws the sprite to the graphics context.
   *
   *
   *
   * @param context The graphics context.
   * @returns void
   */
  public draw(context: CanvasRenderingContext2D): void {}
  /**
   * Updates the sprite every render frame.
   *
   *
   *
   * @param time The fixed time step of every render frame.
   */
  public update(time: number): void {}
}
