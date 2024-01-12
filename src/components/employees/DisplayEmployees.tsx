import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DisplayEmployee = () => {
  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [baseUrl, SetBaseUrl] = useState("https://thaydb.vercel.app");
  
  function getData() {
    SetBaseUrl("https://thaydb.vercel.app");
    fetch(`${baseUrl}/api/employee`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const readEmployee = (id: string) => {
    navigate("/ReadEmployee/" + id);
  }

  const confirmDelete = (id: any) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id: string) => {
    fetch(`${baseUrl}/api/employee/` + id, {
      method: "DELETE"
    })
      .then(() => {
        getData();
        setDeleteId(null);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  const AddEmployees = () => {
    navigate("/AddEmployee/");
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <div className="d-flex align-items-end flex-column" style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)' }}>
        <button className="btn btn-info mt-3 me-4" onClick={AddEmployees}> + Add Employees</button>
      </div>
      <div style={{ backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)',padding: "50px" , minHeight: "100vh"}}>
        <table className="table table-hover table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.employeeID}</td>
                <td>{d.employeeName}</td>
                <td className="col-4">
                  <input
                    type="button"
                    className="btn btn-success me-4"
                    onClick={() => readEmployee(d.employeeID)}
                    value="Edit"
                  />
                  <input
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(d.employeeID)}
                    value="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this employee?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayEmployee;
