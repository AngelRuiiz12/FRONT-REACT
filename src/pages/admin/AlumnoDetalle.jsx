import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AlumnoDetalle = () => {
  const { id } = useParams(); // Extrae el ID de la URL
  const navigate = useNavigate();

  // Simulamos que buscamos los datos de este ID específico
  // (En el futuro, aquí haremos un fetch a Laravel)
  const alumno = {
    id: id,
    nombre: "Ana García",
    email: "ana@ejemplo.com",
    telefono: "600 000 000",
    curso: "Teatro Iniciación",
    mensualidad: "50€",
    historialPagos: [
      { mes: "Enero", estado: "Pagado" },
      { mes: "Febrero", estado: "Pagado" },
      { mes: "Marzo", estado: "Pendiente" },
    ]
  };

  return (
    <div style={{ padding: '30px', color: 'white' }}>
      <button onClick={() => navigate(-1)}>⬅️ Volver</button>
      
      <h1 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
        Ficha del Alumno #{id}
      </h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Datos Personales</h3>
          <p><strong>Nombre:</strong> {alumno.nombre}</p>
          <p><strong>Email:</strong> {alumno.email}</p>
          <p><strong>Teléfono:</strong> {alumno.telefono}</p>
        </div>

        <div style={styles.card}>
          <h3>Información Académica</h3>
          <p><strong>Curso:</strong> {alumno.curso}</p>
          <p><strong>Cuota:</strong> {alumno.mensualidad}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Historial de Pagos</h3>
        <ul>
          {alumno.historialPagos.map((pago, index) => (
            <li key={index}>
              {pago.mes}: <span style={{ color: pago.estado === 'Pagado' ? '#4CAF50' : '#FF5252' }}>{pago.estado}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  grid: { display: 'flex', gap: '20px', marginTop: '20px' },
  card: { background: '#333', padding: '20px', borderRadius: '10px', flex: 1 }
};

export default AlumnoDetalle;