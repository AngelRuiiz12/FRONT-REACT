import React, { useState, useEffect } from "react"; // Añadimos useEffect
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Asegúrate de que esta ruta sea correcta

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  // Nuevo estado para los alumnos que vendrán de la base de datos
  // De momento, inicializamos con un array vacío
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const respuesta = await api.get("/alumnos");
        // Importante: Laravel Paginate envuelve todo en un objeto.
        // Si usas Resource Collection, los datos suelen venir en respuesta.data.data
        console.log("Estructura recibida:", respuesta.data);

        setAlumnos(respuesta.data);
      } catch (err) {
        console.error("Error cargando alumnos:", err);
      }
    };
    cargarAlumnos();
  }, []);

  // Mientras no tengamos datos de la DB, usaremos los de ejemplo
  // para que no se te quede la pantalla vacía:
  const alumnosEjemplo = [
    {
      id: 1,
      nombre: "Ana García",
      curso: "Teatro Iniciación",
      estado: "Pagado",
      deuda: 0,
    },
    {
      id: 2,
      nombre: "Juan Pérez",
      curso: "Musicales",
      estado: "Pendiente",
      deuda: 50,
    },
    {
      id: 3,
      nombre: "Laura Sanz",
      curso: "Improvisación",
      estado: "Atrasado",
      deuda: 100,
    },
  ];

  // 1. Identificamos de dónde vienen los datos
  // Como usas paginate(), los alumnos reales estarán en alumnos.data
  const listaAlumnos = alumnos.data ? alumnos.data : alumnosEjemplo;

  // 2. Aplicamos el filtro sobre esa lista (ESTO ES LO QUE ME PREGUNTABAS)
  const alumnosFiltrados = listaAlumnos.filter((alumno) => {
    const nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  return (
    <div style={{ padding: "30px", color: "white", fontFamily: "Arial" }}>
      <h1>🎭 Panel de Administración</h1>

      {/* Buscador */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar alumno por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "none",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#333",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#444" }}>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Curso</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Deuda</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map((alumno) => (
            // Importante: Usamos alumno.id_alumno como key
            <tr
              key={alumno.id_alumno}
              style={{ borderBottom: "1px solid #555" }}
            >
              {/* Concatenamos Nombre y Apellidos */}
              <td style={styles.td}>
                {alumno.nombre} {alumno.apellidos}
              </td>

              {/* Si aún no tienes la relación de cursos en la DB, 
          ponemos un valor por defecto o el campo email/telefono */}
              <td style={styles.td}>{alumno.email}</td>

              <td
                style={{
                  ...styles.td,
                  // Ajustamos la lógica de color (puedes cambiarla según tus necesidades)
                  color: alumno.estado === "Pagado" ? "#4CAF50" : "#FF5252",
                }}
              >
                {alumno.estado || "Pendiente"}
              </td>

              {/* Si no tienes columna 'deuda' en esta tabla, ponemos 0 o el campo que prefieras */}
              <td style={styles.td}>{alumno.deuda ?? 0}€</td>

              <td style={styles.td}>
                <button
                  // Usamos id_alumno para la navegación
                  onClick={() => navigate(`/admin/alumno/${alumno.id_alumno}`)}
                  style={{ cursor: "pointer", padding: "5px 10px" }}
                >
                  👁️ Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { padding: "15px", textAlign: "left" },
  td: { padding: "15px" },
};

export default AdminDashboard;
