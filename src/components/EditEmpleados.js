import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const endpoint = "http://localhost:8000/api/empleado/";

const EditEmpleados = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [razon, setRazon] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${endpoint}${id}`, {
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

  useEffect(() => {
    const getEmployerById = async () => {
      const response = await axios.get(`${endpoint}${id}`);
      setNombre(response.data.nombre);
      setApellido(response.data.apellido);
      setRazon(response.data.razon_social);
      setCedula(response.data.cedula);
      setTelefono(response.data.telefono);
      setPais(response.data.pais);
      setCiudad(response.data.ciudad);
    };
    getEmployerById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="px-4 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div class="card m-2">
        <h5 class="card-header">Crud React + Laravel</h5>
        <div class="card-body">
          <h6 class="card-title">Editar empleado</h6>
          <div className="text-start mt-3">
            <form onSubmit={update}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="razon" className="form-label">
                    Razón social
                  </label>
                  <input
                    id="razon"
                    value={razon}
                    onChange={(e) => setRazon(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cedula" className="form-label">
                    Cédula
                  </label>
                  <input
                    id="cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="pais" className="form-label">
                    País
                  </label>
                  <input
                    id="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="ciudad" className="form-label">
                    Ciudad
                  </label>
                  <input
                    id="ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className="btn btn-secondary me-md-2 mb-2 mb-md-0">
                  Regresar
                </Link>
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmpleados;
