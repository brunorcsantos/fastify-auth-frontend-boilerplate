import { useEffect, useRef } from "react";

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
  interested: boolean;
  interestTimer: number;
  tailPhase: number;
  driftAngle: number;
}

const normalizeAngle = (angle: number): number => {
  let result = angle;
  while (result > Math.PI) result -= Math.PI * 2;
  while (result < -Math.PI) result += Math.PI * 2;
  return result;
};

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

    const peixes: Fish[] = Array.from({ length: 120 }, () => {
      const roll = Math.random();
      const size =
        roll < 0.3
          ? Math.random() * (6 - 3) + 3
          : roll < 0.8
            ? Math.random() * (12 - 8) + 8
            : Math.random() * (18 - 13) + 13;
      return {
        x: Math.random() * canvas.width, // posição x
        y: Math.random() * canvas.height, // posição y
        vx: Math.random() * 2 - 1, // velocidade x
        vy: Math.random() * 2 - 1, // velocidade y
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 2 * Math.PI,
        interested: true,
        interestTimer: Math.random() * (480 - 180) + 180,
        tailPhase: Math.random() * Math.PI * 2,
        driftAngle: 0,
      };
    });

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleClick = () => {
      peixes.forEach((fish) => {
        const dx = mouse.x - fish.x;
        const dy = mouse.y - fish.y;
        const fleeAngle = Math.atan2(dy, dx) + Math.PI;
        const forcaDeFuga = 6;
        fish.vx = Math.cos(fleeAngle) * forcaDeFuga;
        fish.vy = Math.sin(fleeAngle) * forcaDeFuga;
      });
    };
    window.addEventListener("click", handleClick);

    const animate = () => {
      // 1. limpa o frame anterior
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. atualiza e desenha cada peixe (próximos passos)
      peixes.forEach((fish) => {
        // calcular ângulo em direção ao cursor
        const dx = mouse.x - fish.x;
        const dy = mouse.y - fish.y;
        const targetAngle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.max(2, Math.min(12, distance / 150));

        // magnitude de um vetor
        const currentSpeed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);

        if (fish.interested) {
          const lostInterest = Math.random() < 0.001;
          const tooFar = distance > canvas.width / 4;

          if (lostInterest || tooFar) {
            fish.interested = false;
            fish.interestTimer = Math.random() * (480 - 180) + 180;
            fish.driftAngle = Math.random() * 2 * Math.PI;
          }
        } else {
          fish.interestTimer--;

          if (fish.interestTimer <= 0 && distance < canvas.width / 4) {
            fish.interested = true;
          }
        }

        if (currentSpeed > 4) {
          // fuga: apenas desacelera gradualmente e gira para moveAngle
          const moveAngle = Math.atan2(fish.vy, fish.vx);
          const diff = normalizeAngle(moveAngle - fish.angle);
          fish.angle += diff * 0.1;
          fish.vx *= 0.95; // atrito — reduz velocidade gradualmente
          fish.vy *= 0.95;
          fish.x += fish.vx;
          fish.y += fish.vy;
        } else if (fish.interested) {
          // normal: segue o cursor
          if (distance < fish.size * 6) {
            const orbitAngle = targetAngle + Math.PI / 2;
            const angleDiff = normalizeAngle(orbitAngle - fish.angle);
            fish.angle += angleDiff * 0.05;
            const targetVx = Math.cos(fish.angle) * speed * 0.4;
            const targetVy = Math.sin(fish.angle) * speed * 0.4;
            fish.vx += (targetVx - fish.vx) * 0.1;
            fish.vy += (targetVy - fish.vy) * 0.1;
            fish.x += fish.vx;
            fish.y += fish.vy;
          } else {
            const angleDiff = normalizeAngle(targetAngle - fish.angle);
            fish.angle += angleDiff * 0.05;
            if (Math.abs(angleDiff) < 0.3) {
              const targetVx = Math.cos(fish.angle) * speed;
              const targetVy = Math.sin(fish.angle) * speed;
              fish.vx += (targetVx - fish.vx) * 0.1;
              fish.vy += (targetVy - fish.vy) * 0.1;
              fish.x += fish.vx;
              fish.y += fish.vy;
            } else {
              fish.vx *= 0.9;
              fish.vy *= 0.9;
              fish.x += fish.vx;
              fish.y += fish.vy;
            }
          }
        } else {
          const angleDiff = normalizeAngle(fish.driftAngle - fish.angle);
          fish.angle += angleDiff * 0.02;
          const targetVx = Math.cos(fish.angle) * 1.2;
          const targetVy = Math.sin(fish.angle) * 1.2;
          fish.vx += (targetVx - fish.vx) * 0.1;
          fish.vy += (targetVy - fish.vy) * 0.1;
          fish.x += fish.vx;
          fish.y += fish.vy;
        }

        // wrap around — sai de um lado, entra do outro
        if (fish.x > canvas.width) fish.x = 0;
        if (fish.x < 0) fish.x = canvas.width;
        if (fish.y > canvas.height) fish.y = 0;
        if (fish.y < 0) fish.y = canvas.height;

        fish.tailPhase += currentSpeed * 0.08;

        ctx.save();
        ctx.translate(fish.x, fish.y);
        ctx.rotate(fish.angle);
        ctx.fillStyle = fish.color;

        // cauda PRIMEIRO
        const tailAngle = Math.sin(fish.tailPhase) * 0.3;
        ctx.save();
        ctx.translate(-fish.size, 0);
        ctx.rotate(tailAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-fish.size * 0.8, -fish.size * 0.6);
        ctx.lineTo(-fish.size * 0.8, fish.size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // corpo POR CIMA
        ctx.beginPath();
        ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. agenda o próximo frame
      animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

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
