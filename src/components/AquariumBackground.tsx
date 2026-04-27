import { useEffect, useRef } from "react";

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
}

const AquariumBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = ["#38bdf8", "#7dd3fc", "#0ea5e9", "#38bdf880", "#7dd3fc60"];

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const peixes: Fish[] = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width, // posição x
    y: Math.random() * canvas.height, // posição y
    vx: Math.random() * 2 - 1, // velocidade x
    vy: Math.random() * 2 - 1, // velocidade y
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * 2 * Math.PI,
  }));

  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  window.addEventListener("mousemove", handleMouseMove);

  const animate = () => {
    // 1. limpa o frame anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. atualiza e desenha cada peixe (próximos passos)
    peixes.forEach((fish) => {
      // calcular ângulo em direção ao cursor
      const dx = mouse.x - fish.x;
      const dy = mouse.y - fish.y;
      const targetAngle = Math.atan2(dy, dx);

      // girar suavemente em direção ao cursor
      const angleDiff = targetAngle - fish.angle;
      fish.angle += angleDiff * 0.05;

      // mover na direção que está olhando
      fish.vx = Math.cos(fish.angle) * 1.5;
      fish.vy = Math.sin(fish.angle) * 1.5;
      fish.x += fish.vx;
      fish.y += fish.vy;

      // wrap around — sai de um lado, entra do outro
      if (fish.x > canvas.width) fish.x = 0;
      if (fish.x < 0) fish.x = canvas.width;
      if (fish.y > canvas.height) fish.y = 0;
      if (fish.y < 0) fish.y = canvas.height;

      // desenhar o peixe
      ctx.save();
      ctx.translate(fish.x, fish.y);
      ctx.rotate(fish.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = fish.color;
      ctx.fill();
      // cauda
      ctx.beginPath();
      ctx.moveTo(-fish.size, 0);
      ctx.lineTo(-fish.size * 1.8, -fish.size * 0.6);
      ctx.lineTo(-fish.size * 1.8, fish.size * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // 3. agenda o próximo frame
    animationId = requestAnimationFrame(animate);
  };

  let animationId = requestAnimationFrame(animate);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(animationId);
  };
}, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
};

export default AquariumBackground;
