import React, { useState, useEffect } from "react"; // Añadimos useEffect
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Asegúrate de que esta ruta sea correcta

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [alumnos, setAlumnos] = useState({ data: [] }); // Inicializamos con estructura de objeto
  const [cargando, setCargando] = useState(true); // <--- NUEVO: Estado de carga

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const respuesta = await api.get("/alumnos");
        setAlumnos(respuesta.data);
      } catch (err) {
        console.error("Error cargando alumnos:", err);
      } finally {
        // Pase lo que pase (éxito o error), dejamos de cargar
        setCargando(false);
      }
    };
    cargarAlumnos();
  }, []);

  // Ahora la lista siempre viene de los datos reales
  const listaAlumnos = alumnos.data || [];

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
          {cargando ? (
            // Mientras carga, mostramos una fila informativa o vacía
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Obteniendo alumnos de Supabase...
              </td>
            </tr>
          ) : (
            // Cuando termina de cargar, mapeamos los reales
            alumnosFiltrados.map((alumno) => (
              <tr
                key={alumno.id_alumno}
                style={{ borderBottom: "1px solid #555" }}
              >
                <td style={styles.td}>
                  {alumno.nombre} {alumno.apellidos}
                </td>
                <td style={styles.td}>{alumno.email}</td>
                <td
                  style={{
                    ...styles.td,
                    color: alumno.estado === "Pagado" ? "#4CAF50" : "#FF5252",
                  }}
                >
                  {alumno.estado || "Pendiente"}
                </td>
                <td style={styles.td}>{alumno.deuda ?? 0}€</td>
                <td style={styles.td}>
                  <button
                    onClick={() =>
                      navigate(`/admin/alumno/${alumno.id_alumno}`)
                    }
                  >
                    👁️ Ver Detalle
                  </button>
                </td>
              </tr>
            ))
          )}

          {/* Si terminó de cargar pero no hay resultados tras filtrar */}
          {!cargando && alumnosFiltrados.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No se encontraron alumnos.
              </td>
            </tr>
          )}
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
