import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Ajusta la ruta si es necesario

const AlumnoDetalle = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        // Llamada a la ruta Route::get('/alumnos/{id}', ...) de tu api.php
        const respuesta = await api.get(`/alumnos/${id}`);
        setAlumno(respuesta.data);
      } catch (error) {
        console.error("Error al obtener el detalle del alumno:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerDetalle();
  }, [id]);

  if (cargando) return <div style={{color: 'white', padding: '20px'}}>Cargando datos desde Supabase...</div>;
  if (!alumno) return <div style={{color: 'white', padding: '20px'}}>Alumno no encontrado.</div>;

  return (
    <div style={{ padding: '30px', color: 'white', fontFamily: 'Arial' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}
      >
        ← Volver al listado
      </button>
      
      <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '10px' }}>
        <h1 style={{ borderBottom: '1px solid #555', paddingBottom: '10px' }}>
          Ficha de {alumno.nombre} {alumno.apellidos}
        </h1>
        
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Datos Personales</h3>
            <p><strong>ID Alumno:</strong> {alumno.id_alumno}</p>
            <p><strong>Email:</strong> {alumno.email}</p>
            <p><strong>Teléfono:</strong> {alumno.telefono || 'No registrado'}</p>
          </div>
          
          <div style={{ borderLeft: '1px solid #555', paddingLeft: '20px' }}>
            <h3>Estado Financiero</h3>
            <p><strong>Estado:</strong> 
              <span style={{ 
                marginLeft: '10px',
                color: alumno.estado === 'Pagado' ? '#4CAF50' : '#FF5252',
                fontWeight: 'bold'
              }}>
                {alumno.estado || 'Pendiente'}
              </span>
            </p>
            <p><strong>Deuda Total:</strong> {alumno.deuda ?? 0} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoDetalle;