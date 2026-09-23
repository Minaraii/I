import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:3000'

function App() {
const [entries, setEntries] = useState([])
const [texto, setTexto] = useState('')

// Cargar entradas 
const cargar = async () => {
  const res = await fetch(`${API}/entries`)
  const data = await res.json()
  setEntries(data)
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
    <h1>Diaryo</h1>

    <form onSubmit={guardar}>
      <textarea
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      placeholder="¿Que estas pensando?"
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

export default App