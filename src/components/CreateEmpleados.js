import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api/empleado";

const CreateEmpleados = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [razon, setRazon] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    await axios.post(endpoint, {
      nombre: nombre,
      apellido: apellido,
      razon_social: razon,
      cedula: cedula,
      telefono: telefono,
      pais: pais,
      ciudad: ciudad,
    });
    navigate("/");
  };

  return (
    <div className="px-4 ">
      <h3 className="mt-5 mb-3">Agregar un nuevo empleado</h3>
      <form onSubmit={store}>
        <div className="row ">
          <div className="mb-3 col-md-6">
            <label className="form-label">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Apellido</label>
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Razón social</label>
            <input
              value={razon}
              onChange={(e) => setRazon(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Cédula</label>
            <input
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">País</label>
            <input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Ciudad</label>
            <input
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateEmpleados;
