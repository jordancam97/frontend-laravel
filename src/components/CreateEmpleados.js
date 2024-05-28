import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EmpleadoForm from "./EmpleadoForm";
import Spinner from "react-bootstrap/Spinner";
const endpoint = "http://localhost:8000/api/empleado/";

const CreateEditEmpleado = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [razon, setRazon] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

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
      setLoading(false);
    };
    getEmployerById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data) => {
    if (id) {
      await axios.put(`${endpoint}${id}`, data);
    } else {
      await axios.post(endpoint, data);
    }
  };

  return (
    <div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center flex-column align-items-center mt-3"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
          <p className="mt-1">Cargando...</p>
        </div>
      ) : (
        <EmpleadoForm
          onSubmit={handleSubmit}
          formTitle={id ? "Editar empleado" : "Agregar un nuevo empleado"}
          submitButtonLabel={id ? "Actualizar" : "Guardar"}
          initialValues={{
            nombre,
            apellido,
            razon_social: razon,
            cedula,
            telefono,
            pais,
            ciudad,
          }}
        />
      )}
    </div>
  );
};

export default CreateEditEmpleado;
