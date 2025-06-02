import { Graphics } from "../core/Graphics";
import { SceneBase } from "../infra/SceneBase";

export class SceneTest extends SceneBase {
  private _seconds: number = 60;
  private _gameTime: string = "00:00:00";

  public draw(context: CanvasRenderingContext2D): void {
    const text = this._gameTime;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    context.save();
    context.font = "bold 24pt monospace";
    context.textAlign = "center";
    context.textRendering = "optimizeLegibility";
    context.strokeStyle = "white";
    context.strokeText(text, x, y);
    context.restore();
  }

  public update(time: number): void {
    const gameTime = Math.floor(Graphics.frameCount / 60);

    const seconds = Math.floor(gameTime % this._seconds)
      .toString()
      .padStart(2, "0");

    const minutes = Math.floor((gameTime / this._seconds) % this._seconds)
      .toString()
      .padStart(2, "0");

    const hours = Math.floor(gameTime / this._seconds ** 2)
      .toString()
      .padStart(3, "0");

    this._gameTime = `${hours}:${minutes}:${seconds}`;
  }
}
