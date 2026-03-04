import React, { useEffect, useRef, useState } from 'react';

const ShaderAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const [isInteractive, setIsInteractive] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Vertex shader source
        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        // Fragment shader source adjusted for brutalist/dark theme
        // We will use near-black #0d0d0d and electric accent #c8f23a
        const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      
      // Brutalist palette
      vec3 palette(float t) {
        // Acid green #c8f23a -> rgb(200, 242, 58) -> vec3(0.784, 0.949, 0.227)
        // Background #0d0d0d -> rgb(13, 13, 13) -> vec3(0.05, 0.05, 0.05)
        
        vec3 a = vec3(0.1, 0.1, 0.1); // dark base
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.1, 0.9, 0.2); // slight green hue variation
        
        vec3 col = a + b * cos(6.28318 * (c * t + d));
        // Tone it down to be mostly dark, only bright in specific waves
        return mix(vec3(0.05, 0.05, 0.05), vec3(0.784, 0.949, 0.227), col.x * 0.15);
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        
        float d = length(uv);
        vec3 col = vec3(0.0);
        
        for(float i = 0.0; i < 2.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          d = length(uv) * exp(-length(uv0));
          
          vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.1);
          
          d = sin(d * 4.0 + u_time) / 36.0;
          d = pow(0.005 / max(d, 0.001), 1.2);
          
          vec2 mouseEffect = u_mouse - uv0;
          float mouseDist = length(mouseEffect);
          d *= 1.0 + sin(mouseDist * 5.0 - u_time * 0.5) * 0.05;
          
          col += color * d;
        }
        
        float wave = sin(uv0.x * 2.0 + u_time) * 0.01;
        col += vec3(wave * 0.1);
        
        // Base background is near black (#0d0d0d)
        vec3 bg = vec3(0.05, 0.05, 0.05); 
        col = mix(bg, col, 0.6); // heavily weight towards dark background
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }

        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            if (isInteractive) {
                mouseRef.current.x = e.clientX / window.innerWidth;
                mouseRef.current.y = 1.0 - (e.clientY / window.innerHeight);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        let startTime = Date.now();

        const render = () => {
            const currentTime = (Date.now() - startTime) * 0.001;

            gl.clearColor(0.05, 0.05, 0.05, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isInteractive]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
    );
};

export default ShaderAnimation;
