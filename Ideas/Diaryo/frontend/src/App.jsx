import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:3000'

// 1. Componente 3D - Pagoda
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

// 2. Componente 3D - Monje Shaolin
function Shaolin3D() {
  const [t, setT] = useState(0);
  useEffect(() => { 
    const interval = setInterval(() => setT(p => p + 0.05), 16); 
    return () => clearInterval(interval); 
  }, []);

  const rotY = (p, a) => [p[0]*Math.cos(a) - p[2]*Math.sin(a), p[1], p[0]*Math.sin(a) + p[2]*Math.cos(a)];
  const proj = ([x, y, z]) => [100 + (x * 140) / (z + 400), 100 + (y * 140) / (z + 400)];

  const head = rotY([0, -90 + Math.sin(t*2)*5, 0], Math.sin(t)*0.3);
  const chest = rotY([0, -20, 0], Math.sin(t)*0.2);
  const rHand = rotY([60 * Math.cos(t*1.5), -50 + Math.sin(t*3)*30, 40 * Math.sin(t*1.5)], Math.sin(t)*0.2);
  const lHand = rotY([-60 * Math.cos(t*1.5), 10 - Math.sin(t*3)*30, -40 * Math.sin(t*1.5)], Math.sin(t)*0.2);
  const rLeg = rotY([40, 70 + Math.sin(t*2)*15, 30], Math.sin(t)*0.2);
  const lLeg = rotY([-40, 70 - Math.sin(t*2)*15, -30], Math.sin(t)*0.2);

  const pts = [head, chest, rHand, lHand, rLeg, lLeg].map(proj);
  const qiRings = [0, 1, 2, 3, 4].map(i => {
    const angle = t * 2 + i * (Math.PI / 2.5);
    const r = 45 + Math.sin(t + i) * 8;
    return proj(rotY([Math.cos(angle) * r, Math.sin(angle) * r - 15, Math.sin(angle) * r], Math.sin(t)*0.5));
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="200" height="200" style={{ filter: 'drop-shadow(0 0 8px #ff4500)' }}>
        <polyline points={qiRings.map(p => p.join(',')).join(' ')} fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        {[[1,0],[1,2],[1,3],[1,4],[1,5]].map(([a,b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#ff8c00" strokeWidth="5" strokeLinecap="round" />
        ))}
        <circle cx={pts[0][0]} cy={pts[0][1]} r="10" fill="#ffd700" stroke="#fff" strokeWidth="1.5" />
        <circle cx={pts[2][0]} cy={pts[2][1]} r="6" fill="#ff4500" />
        <circle cx={pts[3][0]} cy={pts[3][1]} r="6" fill="#ff4500" />
      </svg>
      <small style={{ color: '#ffd700', fontFamily: 'serif' }}>Shaolin 3D</small>
    </div>
  );
}

// 3. Componente principal App
export default function App() {
  const [entries, setEntries] = useState([])
  const [texto, setTexto] = useState('')

  // Cargar entradas 
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

  // Crear entrada
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

  // Eliminar entrada 
  const eliminar = async (id) => {
    await fetch(`${API}/entries/${id}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div className="container">
      <h1>Diario Oriental</h1>

      {/* Contenedor Flex para mostrar las 2 animaciones lado a lado */}
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
  )
}