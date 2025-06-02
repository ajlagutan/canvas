import GUI from "lil-gui";
import { clamp, deg2rad, rng } from "../core/_utils";
import { SceneBase } from "../infra/SceneBase";
import { chris_courses, distance } from "./_utils";
import { Color } from "./common/Color";

interface DistanceWithAngle {
  distance: number;
  angle: number;
}

interface Vector {
  x: number;
  y: number;
}

interface Particle extends Vector {
  color: Color;
  mass: number;
  radius: number;
  velocity: Vector;
  vradius: number;
}

export class SceneParticles1 extends SceneBase {
  public count: number = 1000;

  private _particles: Array<Particle> = [];
  private _countdown: number = 0;

  public controllers(folder: GUI): void {
    folder.add(this, "harmonized");
    folder.add(this, "add");
    folder.add(this, "reset");
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.restore();
    for (let p of this._particles) {
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.closePath();
      context.save();
      context.lineWidth = 10 * (p.radius / 50);
      context.strokeStyle = this.getColorString(p.color);
      context.stroke();
      context.restore();
    }
  }

  public harmonized: boolean = false;
  public reset(): void {
    this._particles.splice(0, this._particles.length);
    this.add(1000);
  }
  public add(count: number = 100): void {
    if (this._particles.length + count > 1000) {
      this._particles.splice(0, count);
    }
    for (let i = 0; i < count; i++) {
      let deg = (i / count) * 360;
      let color = Color.fromHsl(deg, 100, 50);
      let radius = rng.float(5, 100);
      let velocity = this.harmonized ? 300 : rng.nonzero(-300, 300);
      this._particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
        mass: 1,
        radius: 0,
        vradius: rng.int(10, 20),
        velocity: {
          x: velocity * Math.cos(deg2rad(deg)),
          y: velocity * Math.sin(deg2rad(deg)),
        },
      });
    }
  }

  public update(time: number): void {
    this._countdown = clamp(this._countdown - 1 * time, 0, 10);
    for (let p of this._particles) {
      p.radius = clamp(p.radius + p.vradius * time, 5, 100);
      for (let q of this._particles) {
        if (p === q) continue;
        let dis = distance(p.x, p.y, q.x, q.y);
        let rad = p.radius + q.radius;
        if (dis - rad < 0 && this._countdown === 0) {
          let decay = p.vradius * 2;
          chris_courses.resolveCollision(p, q);
          p.radius = clamp(p.radius - decay * time, 5, 100);
        }
      }
      this.moveParticle(p, time);
    }
  }

  protected initialize(): void {
    for (let i = 0; i < this.count; i++) {
      let deg = (i / this.count) * 360;
      let color = Color.fromHsl(deg, 100, 50);
      let radius = rng.float(5, 100);
      this._particles.push({
        x: rng.int(radius, window.innerWidth - radius),
        y: rng.int(radius, window.innerHeight - radius),
        color: color,
        mass: 1,
        radius: radius,
        vradius: rng.int(10, 20),
        velocity: {
          x: 300 * Math.cos(deg2rad(deg)),
          y: 300 * Math.sin(deg2rad(deg)),
        },
      });
    }
    super.initialize();
  }

  private getColorString(color: Color): string {
    return color.toString();
  }

  private getDistanceWithAngle(p1: Vector, p2: Vector): DistanceWithAngle {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    return {
      distance: Math.sqrt(dx * dx + dy * dy),
      angle: Math.atan2(dy, dx),
    };
  }

  private getMagnitudeVector(magnitude: number, angle: number): Vector {
    return {
      x: magnitude * Math.cos(angle),
      y: magnitude * Math.sin(angle),
    };
  }

  private moveParticle(particle: Particle, time: number): void {
    let xmax = window.innerWidth - particle.radius;
    let ymax = window.innerHeight - particle.radius;
    if (xmax < particle.x || particle.x < particle.radius) {
      particle.velocity.x = -particle.velocity.x;
      particle.x = clamp(particle.x, particle.radius, xmax);
    }
    if (ymax < particle.y || particle.y < particle.radius) {
      particle.velocity.y = -particle.velocity.y;
      particle.y = clamp(particle.y, particle.radius, ymax);
    }
    let dwa = this.getDistanceWithAngle(particle, {
      x: particle.x + particle.velocity.x,
      y: particle.y + particle.velocity.y,
    });
    let magnitude = this.getMagnitudeVector(dwa.distance, dwa.angle);
    particle.x += magnitude.x * time;
    particle.y += magnitude.y * time;
  }
}
