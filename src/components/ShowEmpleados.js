import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PencilSquare, TrashFill, PersonFillAdd } from "react-bootstrap-icons";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import ModalConfirmDelete from "./ModalConfirmDelete";
import Spinner from "react-bootstrap/Spinner";

const endpoint = "http://localhost:8000/api";

const ShowEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = async () => {
    const response = await axios.get(`${endpoint}/empleados`);
    setEmpleados(response.data);
    setTotalPages(Math.ceil(response.data.length / itemsPerPage));

    if (currentPage > Math.ceil(response.data.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
    }

    setLoading(false);
  };

  const justDelete = async (id) => {
    await axios.delete(`${endpoint}/empleado/${id}`);
    const response = await axios.get(`${endpoint}/empleados`);
    setEmpleados(response.data);
    setTotalPages(Math.ceil(response.data.length / itemsPerPage));

    if (currentPage > Math.ceil(response.data.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
    }
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = empleados.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="px-4 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card m-2">
        <h5 className="card-header">Crud React + Laravel</h5>
        <div className="card-body">
          <h6 className="card-title">Listado de empleados en el sistema</h6>
          <div className="text-start">
            {loading ? (
              <div className="d-flex justify-content-center flex-column align-items-center mt-3">
                <Spinner animation="border" variant="primary" />
                <p className="mt-1">Cargando...</p>
              </div>
            ) : empleados.length === 0 ? (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary btn-sm mt-2 mb-3 text-white"
                >
                  <PersonFillAdd size={18} /> Agregar un nuevo empleado
                </Link>
                <p>
                  ¡Oops! Parece que aún no hay registros en nuestra base de
                  datos de empleados.
                </p>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary btn-sm mt-2 mb-3 text-white"
                >
                  <PersonFillAdd size={18} /> Agregar un nuevo empleado
                </Link>
                <div className="table table-responsive">
                  <table className="table table-sm table-striped table-bordered align-middle ">
                    <thead className="bg-primary text-white align-middle">
                      <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Razón social</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>País</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((empleado) => (
                        <tr key={empleado.id}>
                          <td>{empleado.nombre}</td>
                          <td>{empleado.apellido}</td>
                          <td>{empleado.razon_social}</td>
                          <td>{empleado.cedula}</td>
                          <td>{empleado.telefono}</td>
                          <td>{empleado.pais}</td>
                          <td>{empleado.ciudad}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <Link
                                to={`/edit/${empleado.id}`}
                                className="btn btn-warning me-2"
                              >
                                <PencilSquare />
                              </Link>
                              <button
                                onClick={() => handleShowModal(empleado.id)}
                                className="btn btn-danger ms-2"
                              >
                                <TrashFill />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {empleados.length > itemsPerPage && (
              <nav className="d-flex justify-content-end">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={prevPage}>
                      <ChevronLeft />
                    </button>
                  </li>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(number)}
                        className="page-link"
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={nextPage}>
                      <ChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
      <ModalConfirmDelete
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={() => justDelete(deleteId)}
      />
    </div>
  );
};

export default ShowEmpleados;
