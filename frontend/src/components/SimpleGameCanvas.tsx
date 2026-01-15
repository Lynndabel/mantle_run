'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const MOBILE_MAX_WIDTH = 640;

export function SimpleGameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>();
  const [canvasDims, setCanvasDims] = useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  const backgroundGradientStops = useMemo(
    () => [
      { offset: 0, color: '#3c1f6e' },
      { offset: 0.5, color: '#5b2da3' },
      { offset: 1, color: '#241148' },
    ],
    []
  );

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const mobile = width < MOBILE_MAX_WIDTH;
      setIsMobile(mobile);

      if (mobile) {
        const mobileWidth = Math.min(width - 32, 500);
        const mobileHeight = Math.min(height * 0.7, 700);
        setCanvasDims({ width: Math.max(280, mobileWidth), height: Math.max(220, mobileHeight) });
      } else {
        setCanvasDims({ width: 960, height: 540 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime: number | null = null;

    const draw = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      backgroundGradientStops.forEach(({ offset, color }) => gradient.addColorStop(offset, color));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#111016';
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

      // Runner simulation
      const runnerWidth = 48;
      const runnerHeight = 60;
      const runnerX = canvas.width * 0.2;
      const runnerY = canvas.height - 60 - runnerHeight;
      ctx.fillStyle = '#f7d51d';
      ctx.fillRect(runnerX, runnerY, runnerWidth, runnerHeight);

      // Runner head
      ctx.fillStyle = '#f5f7fa';
      ctx.fillRect(runnerX + 10, runnerY - 18, 28, 18);

      // Runner arm animation
      const armOffset = Math.sin(elapsed * 6) * 10;
      ctx.fillStyle = '#209cee';
      ctx.fillRect(runnerX + runnerWidth - 6 + armOffset / 3, runnerY + 10, 6, 35);

      // Obstacles
      const obstacleCount = isMobile ? 2 : 3;
      const obstacleSpacing = canvas.width / obstacleCount;
      for (let i = 0; i < obstacleCount; i++) {
        const baseX = obstacleSpacing * (i + 1);
        const offsetX = (elapsed * 180 + i * 140) % (canvas.width + 200);
        const x = canvas.width - offsetX + baseX * 0.25;
        const width = 40;
        const height = 80;
        ctx.fillStyle = '#ff6f61';
        ctx.fillRect(x, canvas.height - 60 - height, width, height);
      }

      // HUD text
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px "Press Start 2P", sans-serif';
      ctx.fillText('Mantle Run Demo', 24, 40);
      ctx.font = '14px "Press Start 2P", sans-serif';
      ctx.fillText('Jump obstacles, collect QUEST, earn badges!', 24, 70);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [backgroundGradientStops, canvasDims, isMobile]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className="rounded-xl border-4 border-white/20 shadow-2xl overflow-hidden"
        style={{ maxWidth: canvasDims.width }}
      >
        <canvas
          ref={canvasRef}
          width={Math.round(canvasDims.width)}
          height={Math.round(canvasDims.height)}
          className="w-full h-auto bg-[#120a24]"
        />
      </div>
      <p className="mt-4 text-center text-xs sm:text-sm text-white/70 max-w-[520px] px-4">
        This canvas simulates the Mantle Runner gameplay experience. The full game uses Phaser with on-chain
        progression, rewards, and NFT minting.
      </p>
    </div>
  );
}
