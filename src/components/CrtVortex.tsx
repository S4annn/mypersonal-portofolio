import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * vnoise(p);
    p = p * 2.1 + vec2(1.7, 3.2);
    a *= 0.5;
  }
  return v;
}

float metaballs(vec2 p, float t) {
  float d = 1e9;
  for (int i = 0; i < 2; i++) {
    float fi = float(i);
    float angle = t * (0.3 + fi * 0.1) + fi * 2.4;
    float rad = 0.2 + 0.1 * sin(t * 0.2 + fi);
    vec2 b = vec2(cos(angle), sin(angle)) * rad;
    d = min(d, dot(p - b, p - b) * (2.0 + fi));
  }
  return sqrt(d);
}

vec2 rot(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

vec3 layers(vec2 uv, float t) {
  float m1 = metaballs(uv, t);
  float n1 = fbm(uv * 3.0 + t * 0.05);
  float warp1 = vnoise(uv * 2.0 + t * 0.1 + n1);
  float m2 = metaballs(rot(uv, 0.7) + vec2(0.3, 0.1), t * 1.3);
  float n2 = fbm(rot(uv, -0.5) * 4.0 - t * 0.08 + m2);
  float threads = smoothstep(0.1, 0.6, n1 * n2);
  float veins = pow(smoothstep(0.3, 0.8, n1 * (1.0 - m1 * 0.3)), 3.0);
  float hot = smoothstep(0.2, 0.0, m1) * smoothstep(0.1, 0.7, n2);
  return vec3(threads, veins, hot);
}

float coreGlow(vec2 uv, float t) {
  float dist = length(uv);
  float angle = atan(uv.y, uv.x);
  float spiral1 = smoothstep(0.5, 0.0, abs(fract(angle * 2.0 + dist * 4.0 - t * 0.5) - 0.5) * 2.0) * smoothstep(0.5, 0.0, dist);
  float spiral2 = smoothstep(0.5, 0.0, abs(fract(angle * -3.0 + dist * 6.0 - t * 0.3) - 0.5) * 2.0) * smoothstep(0.4, 0.0, dist);
  float core = exp(-dist * dist * 8.0) * 2.0;
  float pulse = pow(max(sin(t * 0.5) * 0.5 + 0.5, 0.0), 4.0);
  return (spiral1 * 0.5 + spiral2 * 0.3 + core + pulse * core * 0.5) * (0.8 + 0.2 * sin(t * 2.0 + dist * 10.0));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.15;
  uv = rot(uv, t * 0.1);

  float shift = 0.008 + 0.004 * sin(t * 1.3);
  vec2 caOffset = vec2(cos(t * 0.7) * shift, sin(t * 0.5) * shift);

  vec3 rLayer = layers(uv + caOffset, t);
  vec3 gLayer = layers(uv, t);
  vec3 bLayer = layers(uv - caOffset, t);

  float threadsR = rLayer.x;
  float veinsR = rLayer.y;
  float hotR = rLayer.z;
  float threadsG = gLayer.x;
  float veinsG = gLayer.y;
  float hotG = gLayer.z;
  float threadsB = bLayer.x;
  float veinsB = bLayer.y;
  float hotB = bLayer.z;

  vec3 col = vec3(
    threadsR * 0.05 + veinsR * 0.1 + hotR * 2.5,
    threadsG * 0.08 + veinsG * 0.15 + hotG * 0.8,
    threadsB * 0.12 + veinsB * 0.3 + hotB * 0.1
  );

  col += vec3(1.0, 0.24, 0.0) * coreGlow(uv, u_time);

  col += vec3(0.7, 0.75, 0.8) * smoothstep(0.4, 0.9, fbm(rot(uv, t * 0.2) * 5.0 + vec2(t * 0.1, 0.0))) * 0.3;

  float vig = pow(clamp(1.0 - dot(uv, uv) * 0.8, 0.0, 1.0), 0.5);
  col *= vig;

  col += (hash(gl_FragCoord.xy + fract(u_time * 43.0) * 1000.0) - 0.5) * 0.04;

  col *= 0.95 + step(0.5, mod(gl_FragCoord.y, 3.0)) * 0.05;

  gl_FragColor = vec4(pow(col / (1.0 + col * 0.2), vec3(0.95)), 1.0);
}
`;

export default function CrtVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    gl.uniform2f(uMouse, 0.5, 0.5);

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1.0);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    let frameCount = 0;

    function render() {
      if (!gl) return;
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        const elapsed = (performance.now() - startTime) / 1000;
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uResolution, canvas!.width, canvas!.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
