import { useState, useEffect, useRef } from 'react'
import './App.css'

const API = 'http://localhost:3000'

// 1. Componente 3D Aves Volando (Fondo)
function Birds3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 35;
    const birds = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 600,
      z: Math.random() * 800 + 100,
      vx: Math.random() * 1.5 + 1.2,
      vy: Math.sin(Math.random() * Math.PI) * 0.4,
      wingSpeed: Math.random() * 0.08 + 0.06,
      wingPhase: Math.random() * Math.PI * 2,
      size: Math.random() * 12 + 10
    }));

    const project = (x, y, z) => {
      const fov = 400;
      const scale = fov / (fov + z);
      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 3 + y * scale,
        scale
      };
    };

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      birds.sort((a, b) => b.z - a.z);

      birds.forEach(b => {
        b.x += b.vx;
        b.y += Math.sin(t + b.wingPhase) * 0.6 + b.vy;
        b.wingPhase += b.wingSpeed;

        if (b.x > 800) {
          b.x = -800;
          b.y = (Math.random() - 0.5) * 600;
          b.z = Math.random() * 800 + 100;
        }

        const p = project(b.x, b.y, b.z);
        const wingAngle = Math.sin(b.wingPhase) * 0.8;
        const w = b.size * p.scale;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.strokeStyle = `rgba(240, 230, 210, ${Math.min(1, p.scale * 1.2)})`;
        ctx.fillStyle = `rgba(212, 175, 55, ${p.scale * 0.8})`;
        ctx.lineWidth = 1.8 * p.scale;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-w * 0.5, wingAngle * w, -w, wingAngle * w * 0.5);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(w * 0.5, wingAngle * w, w, wingAngle * w * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 1.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}

// 2. Componente 3D - Pagoda
function Pagoda3D() {
  const [angle, setAngle] = useState(0);
  useEffect(() => { 
    const interval = setInterval(() => setAngle(p => p + 0.03), 20); 
    return () => clearInterval(interval); 
  }, []);

  const P = [[0,-120,0],[80,40,80],[-80,40,80],[-80,40,-80],[80,40,-80]];
  const rotate = p => [
    p[0] * Math.cos(angle) - p[2] * Math.sin(angle), 
    p[1], 
    p[0] * Math.sin(angle) + p[2] * Math.cos(angle)
  ];

  const T = P.map(p => { 
    const [x, y, z] = rotate(p); 
    return [100 + x * 140 / (z + 400), 100 + y * 140 / (z + 400)]; 
  });

  const F = [[0,1,2],[0,2,3],[0,3,4],[0,4,1]];
  const C = ['#d62828', '#f77f00', '#fcbf49', '#e63946'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="200" height="200">
        {F.map((f, i) => (
          <polygon 
            key={i} 
            points={`${T[f[0]]} ${T[f[1]]} ${T[f[2]]}`} 
            fill={C[i]} 
            stroke="#fff" 
            strokeWidth="1.5" 
            opacity="0.85" 
          />
        ))}
      </svg>
      <small style={{ color: '#fcbf49', fontFamily: 'serif' }}>Pagoda 3D</small>
    </div>
  );
}

// 3. Componente 3D - Monje Shaolin
function Shaolin3D() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setT((p) => p + 0.03), 16);
    return () => clearInterval(timer);
  }, []);

  const rotY = ([x, y, z], a) => [
    x * Math.cos(a) - z * Math.sin(a),
    y,
    x * Math.sin(a) + z * Math.cos(a),
  ];

  const project = ([x, y, z]) => {
    const s = 230 / (z + 400);
    return [100 + x * s, 105 + y * s, s];
  };

  const breath = Math.sin(t * 1.2) * 2;
  const sway = Math.sin(t * 0.4) * 0.06;

  // Anatomía 3D en Postura Completa del Loto (Padmasana)
  const head = project(rotY([0, -70 + breath, 0], sway));
  const neck = project(rotY([0, -50 + breath * 0.8, 0], sway));
  const lShoulder = project(rotY([-36, -42 + breath * 0.7, -5], sway));
  const rShoulder = project(rotY([36, -42 + breath * 0.7, -5], sway));
  const chest = project(rotY([0, -22 + breath * 0.5, 5], sway));
  const hands = project(rotY([0, 5 + breath * 0.2, 28], sway));
  
  // Nodos de la postura de las piernas
  const lKnee = project(rotY([-58, 28, 10], sway));
  const rKnee = project(rotY([58, 28, 10], sway));
  const lFoot = project(rotY([18, 15, 28], sway));
  const rFoot = project(rotY([-18, 15, 28], sway));
  const baseCenter = project(rotY([0, 38, -10], sway));

  // Partículas de Qi
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const pT = (t * 1.5 + i * 0.9) % 5;
    const rad = 30 + Math.sin(i + t) * 12;
    const pt = [Math.cos(pT * 2 + i) * rad, 35 - pT * 14, Math.sin(pT * 2 + i) * rad];
    return { ...project(rotY(pt, sway)), opacity: 1 - pT / 5 };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="220" height="220" style={{ filter: 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.45))' }}>
        <defs>
          <linearGradient id="robeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#032b4d" />
          </linearGradient>
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#032b4d" />
          </linearGradient>
          <radialGradient id="headLight" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>

        {/* Partículas de energía Qi */}
        {particles.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={2.5 * p[2]} fill="#a5f3fc" opacity={p.opacity} />
        ))}

        {/* Halo de energía interior giratorio */}
        <circle cx={head[0]} cy={head[1]} r={22 * head[2]} fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 3" opacity="0.5" />

        {/* Manto base (Sombra de soporte) */}
        <ellipse cx={baseCenter[0]} cy={baseCenter[1]} rx={65 * baseCenter[2]} ry={18 * baseCenter[2]} fill="#021526" opacity="0.6" />

        {/* PIERNAS CRUZADAS EN LOTO (Padmasana) */}
        {/* Muslo y Rodilla Izquierda */}
        <polygon
          points={`${hands[0]},${hands[1]} ${lKnee[0]},${lKnee[1]} ${rFoot[0]},${rFoot[1]}`}
          fill="url(#legGrad)"
          opacity="0.95"
        />
        {/* Muslo y Rodilla Derecha */}
        <polygon
          points={`${hands[0]},${hands[1]} ${rKnee[0]},${rKnee[1]} ${lFoot[0]},${lFoot[1]}`}
          fill="url(#legGrad)"
          opacity="0.95"
        />
        
        {/* Pies reposando sobre los muslos opuestos */}
        <ellipse cx={lFoot[0]} cy={lFoot[1]} rx={6 * lFoot[2]} ry={4 * lFoot[2]} fill="#7dd3fc" />
        <ellipse cx={rFoot[0]} cy={rFoot[1]} rx={6 * rFoot[2]} ry={4 * rFoot[2]} fill="#7dd3fc" />

        {/* TORSO Y HOMBRE (Postura erguida y poderosa) */}
        <path
          d={`M ${lShoulder[0]} ${lShoulder[1]} 
             Q ${neck[0]} ${neck[1]} ${rShoulder[0]} ${rShoulder[1]} 
             L ${rKnee[0]} ${rKnee[1]} 
             Q ${hands[0]} ${hands[1]} ${lKnee[0]} ${lKnee[1]} Z`}
          fill="url(#robeBody)"
        />

        {/* Línea central de compostura y pliegues del Kimono */}
        <path
          d={`M ${neck[0]} ${neck[1]} L ${chest[0]} ${chest[1]} L ${hands[0]} ${hands[1]}`}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1.8"
          opacity="0.8"
        />

        {/* Manos juntas en Mudra Dhyana */}
        <ellipse cx={hands[0]} cy={hands[1]} rx={8 * hands[2]} ry={5 * hands[2]} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />

        {/* Cabeza Serena en 3D */}
        <circle cx={head[0]} cy={head[1]} r={11 * head[2]} fill="url(#headLight)" />
      </svg>

      <small style={{ color: '#7dd3fc', fontFamily: 'serif', letterSpacing: '4px', marginTop: '2px' }}>
        靜 SHAOLIN ZEN 靜
      </small>
    </div>
  );
}

// 4. Componente Principal App
export default function App() {
  const [entries, setEntries] = useState([])
  const [texto, setTexto] = useState('')

  const cargar = async () => {
    try {
      const res = await fetch(`${API}/entries`)
      const data = await res.json()
      setEntries(data)
    } catch (err) {
      console.error('Error al cargar:', err)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const guardar = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return

    await fetch(`${API}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto }),
    })

    setTexto('')
    cargar()
  }

  const eliminar = async (id) => {
    await fetch(`${API}/entries/${id}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <>
      {/* Fondo de Aves en 3D */}
      <Birds3D />

      {/* Capa de la interfaz principal */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Diario Oriental</h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <Pagoda3D />
          <Shaolin3D />
        </div>

        <form onSubmit={guardar}>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="¿Qué estás pensando?"
            rows={4}
          />
          <button type="submit">Guardar</button>
        </form>

        <div className="lista">
          {entries.map((entry) => (
            <div key={entry.id} className="entrada">
              <p>{entry.texto}</p>
              <small>{new Date(entry.fecha).toLocaleString()}</small>
              <button onClick={() => eliminar(entry.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}