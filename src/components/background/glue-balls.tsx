"use client";

import { useEffect, useRef } from "react";

const MAX_BALLS = 12;
const RES_SCALE = 0.65;

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform int u_count;
uniform vec2 u_balls[${MAX_BALLS}];
uniform float u_radii[${MAX_BALLS}];

void main() {
  vec2 p = gl_FragCoord.xy / u_res.y;

  float field = 0.0;
  for (int i = 0; i < ${MAX_BALLS}; i++) {
    if (i >= u_count) { break; }
    vec2 d = p - u_balls[i];
    float r = u_radii[i];
    field += (r * r) / (dot(d, d) + 0.00004);
  }

  float core = smoothstep(1.0, 1.18, field);
  float glow = smoothstep(0.18, 1.0, field);

  vec3 teal = vec3(0.518, 0.753, 0.749);
  vec3 color = mix(teal * 1.35, teal, core);
  float alpha = core * 0.32 + glow * 0.1;

  gl_FragColor = vec4(color, alpha);
}
`;

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseR: number;
  phase: number;
  angle: number;
};

export function GlueBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uCount = gl.getUniformLocation(program, "u_count");
    const uBalls = gl.getUniformLocation(program, "u_balls");
    const uRadii = gl.getUniformLocation(program, "u_radii");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const balls: Ball[] = [];
    const ballData = new Float32Array(MAX_BALLS * 2);
    const radiusData = new Float32Array(MAX_BALLS);
    let aspect = 1;
    let started = false;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = (a: number) => {
      balls.length = 0;
      const count = 5;
      for (let i = 0; i < count; i++) {
        const baseR = rand(0.07, 0.13);
        balls.push({
          x: rand(baseR, Math.max(baseR + 0.001, a - baseR)),
          y: rand(baseR, 1 - baseR),
          vx: rand(-0.0003, 0.0003),
          vy: rand(-0.0003, 0.0003),
          r: baseR,
          baseR,
          phase: rand(0, Math.PI * 2),
          angle: rand(0, Math.PI * 2),
        });
      }
    };

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RES_SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * RES_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      aspect = canvas.width / canvas.height;
      if (!started) {
        seed(aspect);
        started = true;
      }
    };

    const update = (dtf: number, t: number) => {
      const steerAway = (b: Ball) => {
        const margin = 0.22;
        let weight = 0;
        if (b.x < margin) weight = Math.max(weight, 1 - b.x / margin);
        if (b.x > aspect - margin) weight = Math.max(weight, 1 - (aspect - b.x) / margin);
        if (b.y < margin) weight = Math.max(weight, 1 - b.y / margin);
        if (b.y > 1 - margin) weight = Math.max(weight, 1 - (1 - b.y) / margin);
        if (weight <= 0) return;

        const towardFree = Math.atan2(0.5 - b.y, aspect / 2 - b.x);
        const diff = ((towardFree - b.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        b.angle += diff * Math.min(0.05 * dtf, 1) * weight;
      };

      for (const b of balls) {
        b.r = b.baseR * (1 + 0.06 * Math.sin(t * 0.00035 + b.phase));
        b.angle += (Math.random() - 0.5) * 0.02 * dtf;
        steerAway(b);
        b.vx += Math.cos(b.angle) * 0.0006 * dtf;
        b.vy += Math.sin(b.angle) * 0.0006 * dtf;
        b.vx *= 0.99;
        b.vy *= 0.99;

        let sp = Math.hypot(b.vx, b.vy);
        const maxSp = 0.0018;
        if (sp > maxSp) {
          b.vx = (b.vx / sp) * maxSp;
          b.vy = (b.vy / sp) * maxSp;
          sp = maxSp;
        }
        if (sp < 0.0005) {
          const kick = Math.random() * Math.PI * 2;
          b.vx += Math.cos(kick) * 0.0009;
          b.vy += Math.sin(kick) * 0.0009;
        }

        b.x += b.vx * dtf;
        b.y += b.vy * dtf;

        if (b.x < b.r) {
          b.x = b.r;
          b.vx = maxSp;
        }
        if (b.x > aspect - b.r) {
          b.x = aspect - b.r;
          b.vx = -maxSp;
        }
        if (b.y < b.r) {
          b.y = b.r;
          b.vy = maxSp;
        }
        if (b.y > 1 - b.r) {
          b.y = 1 - b.r;
          b.vy = -maxSp;
        }
      }

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i];
          const c = balls[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minD = a.r + c.r;
          if (dist > 0.0001 && dist < minD) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minD - dist) * 0.5;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            c.x += nx * overlap;
            c.y += ny * overlap;

            const vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
            if (vn < 0) {
              const imp = -(1.6 * vn) / 2;
              a.vx -= imp * nx;
              a.vy -= imp * ny;
              c.vx += imp * nx;
              c.vy += imp * ny;
            }
          }
        }
      }
    };

    const render = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const n = Math.min(balls.length, MAX_BALLS);
      for (let i = 0; i < n; i++) {
        ballData[i * 2] = balls[i].x;
        ballData[i * 2 + 1] = balls[i].y;
        radiusData[i] = balls[i].r;
      }

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1i(uCount, n);
      gl.uniform2fv(uBalls, ballData);
      gl.uniform1fv(uRadii, radiusData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = 0;
    let onScreen = true;
    let pageVisible = !document.hidden;

    const frame = (now: number) => {
      if (!last) last = now;
      const dtf = Math.min((now - last) / 16.667, 3);
      last = now;
      update(dtf, now);
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduce) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const sync = () => {
      if (onScreen && pageVisible) start();
      else stop();
    };

    if (reduce) {
      update(0, 0);
      render();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) {
        update(0, 0);
        render();
      }
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="glue-balls pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
