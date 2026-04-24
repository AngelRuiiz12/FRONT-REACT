import React, { useState } from "react";

const AlumnoProfile = () => {
  // 1. ESTADO DE LOS PAGOS: Aquí se guardarán los que ya existen y los nuevos que crees
  const [pagos, setPagos] = useState([
    { id: 1, mes: "Enero", monto: 50, estado: "Validado", fecha: "05/01/2026" },
    {
      id: 2,
      mes: "Febrero",
      monto: 50,
      estado: "Validado",
      fecha: "02/02/2026",
    },
  ]);

  // 2. ESTADO DEL FORMULARIO: Para capturar lo que escribes
  const [nuevoMes, setNuevoMes] = useState("");
  const [nuevoMonto, setNuevoMonto] = useState("");

  // 3. FUNCIÓN PARA CREAR UN NUEVO PAGO
  const registrarPago = (e) => {
    e.preventDefault();

    const nuevoPagoObj = {
      id: pagos.length + 1,
      mes: nuevoMes,
      monto: nuevoMonto,
      estado: "Pendiente", // El alumno lo crea, el admin lo validará luego
      fecha: new Date().toLocaleDateString(),
    };

    setPagos([nuevoPagoObj, ...pagos]); // Añadimos el nuevo al principio de la lista
    setNuevoMes(""); // Limpiamos campos
    setNuevoMonto("");
  };

  // 4. FUNCIÓN PARA ELIMINAR UN PAGO PENDIENTE
  const eliminarPago = (id) => {
    // Filtramos la lista: solo se quedan los pagos cuyo ID NO sea el que queremos borrar
    const listaActualizada = pagos.filter((pago) => pago.id !== id);
    setPagos(listaActualizada);
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Área Personal del Alumno</h1>

      {/* SECCIÓN A: DETALLES DEL PERFIL */}
      <section style={styles.card}>
        <h2 style={styles.title}>👤 Mis Datos</h2>
        <p>
          <strong>Nombre:</strong> Juan Pérez (Alumno)
        </p>
        <p>
          <strong>Curso:</strong> Teatro de Improvisación Nivel I
        </p>
        <p>
          <strong>Email:</strong> alumno@test.com
        </p>
      </section>

      {/* SECCIÓN B: FORMULARIO DE NUEVO PAGO */}
      <section style={styles.card}>
        <h2 style={styles.title}>💰 Registrar Nuevo Pago</h2>
        <form onSubmit={registrarPago} style={styles.form}>
          <input
            type="text"
            placeholder="Mes a pagar (ej: Marzo)"
            value={nuevoMes}
            onChange={(e) => setNuevoMes(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Importe €"
            value={nuevoMonto}
            onChange={(e) => setNuevoMonto(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn}>
            Enviar Justificante
          </button>
        </form>
      </section>

      {/* SECCIÓN C: HISTORIAL DE PAGOS */}
      <section style={styles.card}>
        <h2 style={styles.title}>📜 Mis Pagos Realizados</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} style={{ borderBottom: "1px solid #444" }}>
                <td>{pago.mes}</td>
                <td>{pago.fecha}</td>
                <td>{pago.monto}€</td>
                <td>
                  <span
                    style={{
                      color: pago.estado === "Validado" ? "#4CAF50" : "#FFC107",
                    }}
                  >
                    {pago.estado}
                  </span>
                </td>
                {/* NUEVA COLUMNA DE ACCIONES */}
                <td>
                  {pago.estado === "Pendiente" && (
                    <button
                      onClick={() => eliminarPago(pago.id)}
                      style={styles.btnEliminar}
                    >
                      🗑️ Borrar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

// ESTILOS RÁPIDOS
const styles = {
  card: {
    background: "#222",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  title: {
    borderBottom: "1px solid #4CAF50",
    paddingBottom: "10px",
    marginTop: "0",
  },
  form: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    background: "#333",
    color: "white",
  },
  btn: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  td: { padding: "10px" },
  btnEliminar: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default AlumnoProfile;
