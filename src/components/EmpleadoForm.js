import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const EmpleadoForm = ({ initialValues, onSubmit, formTitle, submitButtonLabel }) => {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [apellido, setApellido] = useState(initialValues.apellido || "");
  const [razon, setRazon] = useState(initialValues.razon_social || "");
  const [cedula, setCedula] = useState(initialValues.cedula || "");
  const [telefono, setTelefono] = useState(initialValues.telefono || "");
  const [pais, setPais] = useState(initialValues.pais || "");
  const [ciudad, setCiudad] = useState(initialValues.ciudad || "");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      nombre,
      apellido,
      razon_social: razon,
      cedula,
      telefono,
      pais,
      ciudad,
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, 2000);
  };

  const handleInput = (setter) => (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  return (
    <div
      className="px-4 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card m-2">
        <h5 className="card-header">Crud React + Laravel</h5>
        <div className="card-body">
          <h6 className="card-title">{formTitle}</h6>
          <div className="text-start mt-3">
            {showAlert && <Alert message="Operación realizada exitosamente" />}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={handleInput(setNombre)}
                    type="text"
                    className="form-control"
                    minLength={4}
                    maxLength={20}
                    title="Solo se permiten letras"
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
                    onChange={handleInput(setApellido)}
                    type="text"
                    className="form-control"
                    title="Solo se permiten letras"
                    minLength={4}
                    maxLength={20}
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
                    maxLength={50}
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
                    pattern="[0-9]{1,}"
                    title="Solo se permiten números"
                    max="9999999999999"
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
                    pattern="[0-9]{1,}"
                    title="Solo se permiten números"
                    max="999999999999"
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
                    onChange={handleInput(setPais)}
                    type="text"
                    className="form-control"
                    title="Solo se permiten letras"
                    minLength={4}
                    maxLength={50}
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
                    onChange={handleInput(setCiudad)}
                    type="text"
                    className="form-control"
                    title="Solo se permiten letras"
                    maxLength={50}
                    required
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className="btn btn-secondary me-md-2 mb-2 mb-md-0">
                  Regresar
                </Link>
                <button type="submit" className="btn btn-primary">
                  {submitButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoForm;
