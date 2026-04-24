import React from "react";

const alumnosEjemplo = [
  { id: 1, nombre: "Ana García", curso: "Teatro Iniciación", estado: "Pagado" },
  { id: 2, nombre: "Juan Pérez", curso: "Musicales", estado: "Pendiente" },
  { id: 3, nombre: "Laura Sanz", curso: "Improvisación", estado: "Atrasado" },
];

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Gestión de Alumnos</h1>

      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Curso</th>
            <th>Estado de Pago</th>
          </tr>
        </thead>
        <tbody>
          {alumnosEjemplo.map((alumno) => (
            <tr key={alumno.id}>
              <td style={{ padding: "10px" }}>{alumno.nombre}</td>
              <td style={{ padding: "10px" }}>{alumno.curso}</td>
              <td
                style={{
                  padding: "10px",
                  color: alumno.estado === "Pagado" ? "#4CAF50" : "#FF5252",
                }}
              >
                {alumno.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
