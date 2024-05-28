import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PencilSquare, TrashFill, PersonFillAdd } from "react-bootstrap-icons";

const endpoint = "http://localhost:8000/api";

const ShowEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const response = await axios.get(`${endpoint}/empleados`);
    setEmpleados(response.data);
  };

  const justDelete = async (id) => {
    await axios.delete(`${endpoint}/empleado/${id}`);
    getAll();
  };
  return (
    <div>
      <div className="d-grid gap-2 d-md-block px-4 ">
        <div className="text-start">
          <Link
            to="/create"
            className="btn btn-primary btn-sm mt-5 mb-3 text-white"
          >
            <PersonFillAdd size={18} /> Agregar un nuevo empleado
          </Link>
        </div>

        <table className="table table-striped">
          <thead className="bg-primary text-white">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Razón social </th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>País</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.razon_social} </td>
                <td>{empleado.cedula}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.pais}</td>
                <td>{empleado.ciudad}</td>
                <td>
                  <Link to={`/edit/${empleado.id}`} className="btn btn-warning">
                    <PencilSquare />
                  </Link>
                  <button
                    oncClick={() => justDelete(empleado.id)}
                    className="btn btn-danger"
                  >
                    <TrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowEmpleados;
