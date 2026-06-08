import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene, Camera, and WebGLRenderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#020617", 0.015);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Interactive Animated 3D Object Group (e.g. Glowing Forest/Stars Network)
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Distribute points in multiple concentric shell systems or double-spheres representing ecological energy
    const colorEmerald = new THREE.Color("#10b981");
    const colorTeal = new THREE.Color("#14b8a6");
    const colorIndigo = new THREE.Color("#6366f1");

    for (let i = 0; i < particleCount; i++) {
      // Create some orbiting or interesting organic structures
      const r = 8 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 40; // depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Blend custom nature neon colors
      const rand = Math.random();
      const mixedColor = new THREE.Color();
      if (rand < 0.4) {
        mixedColor.copy(colorEmerald).lerp(colorTeal, Math.random());
      } else if (rand < 0.7) {
        mixedColor.copy(colorTeal).lerp(colorIndigo, Math.random());
      } else {
        mixedColor.copy(colorIndigo).lerp(colorEmerald, Math.random());
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new Float32Array(colors).length > 0 ? new THREE.BufferAttribute(colors, 3) : new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));

    // Create tiny glowing circles as particles instead of squares
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(16, 185, 129, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add a couple of glowing abstract floating torus rings as primary focal 3D structures
    const torusGroup = new THREE.Group();
    
    // Core cyber leaf/cell ring
    const torusGeom = new THREE.TorusGeometry(6, 1.2, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: "#10b981",
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const mainTorus = new THREE.Mesh(torusGeom, torusMat);
    torusGroup.add(mainTorus);

    // Secondary inner diagonal orbit
    const torusGeom2 = new THREE.TorusGeometry(4, 0.4, 8, 50);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: "#14b8a6",
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const secondaryTorus = new THREE.Mesh(torusGeom2, torusMat2);
    secondaryTorus.rotation.x = Math.PI / 4;
    torusGroup.add(secondaryTorus);

    scene.add(torusGroup);

    // Mouse and scroll variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Resize Observer instead of window.innerWidth
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse interaction for buttery smooth parallax feedback
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Lerp scroll coordinates
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Rotate primary geometries slowly over time
      points.rotation.y = elapsedTime * 0.03;
      points.rotation.x = elapsedTime * 0.01;

      torusGroup.rotation.y = elapsedTime * 0.08;
      torusGroup.rotation.x = elapsedTime * 0.04;

      // Camera responds smoothly to both mouse (tilt) and scroll (dive/elevate)
      camera.position.x = (targetX * 0.01);
      camera.position.y = -(targetY * 0.01);
      
      // Scroll moves camera closer into the particle field (creating a "scroll plunge" effect)
      camera.position.z = 25 - Math.min(scrollY * 0.015, 12);
      
      // Additional translation shift for torus group on scroll
      torusGroup.position.y = -Math.min(scrollY * 0.005, 10);
      torusGroup.position.z = Math.min(scrollY * 0.01, 8);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      
      // Dispose materials/geometries
      geometry.dispose();
      material.dispose();
      texture.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      torusGeom2.dispose();
      torusMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#020617] pointer-events-none"
      id="three-3d-stage"
    />
  );
}
