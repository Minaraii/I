import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:3000'

// 1. Subcomponente 3D fuera de App
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
  return [150 + x * 200 / (z + 400), 150 + y * 200 / (z + 400)]; 
});

const F = [[0,1,2],[0,2,3],[0,3,4],[0,4,1]];
const C = ['#d62828', '#f77f00', '#fcbf49', '#e63946'];

return (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <svg width="300" height="300">
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
  </div>
);
}

// 2. Componente principal App
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
    <h1>Diario</h1>

    {/* Renderizamos la Pagoda 3D sobre el formulario */}
    <Pagoda3D />

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