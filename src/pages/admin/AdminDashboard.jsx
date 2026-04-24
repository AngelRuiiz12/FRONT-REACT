import React, { useState } from 'react';

const alumnosEjemplo = [
  { id: 1, nombre: "Ana García", curso: "Teatro Iniciación", estado: "Pagado", deuda: 0 },
  { id: 2, nombre: "Juan Pérez", curso: "Musicales", estado: "Pendiente", deuda: 50 },
  { id: 3, nombre: "Laura Sanz", curso: "Improvisación", estado: "Atrasado", deuda: 100 },
];

const AdminDashboard = () => {
  const [busqueda, setBusqueda] = useState("");

  const alumnosFiltrados = alumnosEjemplo.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', color: 'white', fontFamily: 'Arial' }}>
      <h1>🎭 Panel de Administración</h1>
      
      {/* Buscador */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Buscar alumno por nombre..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: 'none' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#333' }}>
        <thead>
          <tr style={{ backgroundColor: '#444' }}>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Curso</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Deuda</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map((alumno) => (
            <tr key={alumno.id} style={{ borderBottom: '1px solid #555' }}>
              <td style={styles.td}>{alumno.nombre}</td>
              <td style={styles.td}>{alumno.curso}</td>
              <td style={{ ...styles.td, color: alumno.estado === 'Pagado' ? '#4CAF50' : '#FF5252' }}>
                {alumno.estado}
              </td>
              <td style={styles.td}>{alumno.deuda}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: '15px', textAlign: 'left' },
  td: { padding: '15px' }
};

export default AdminDashboard;
