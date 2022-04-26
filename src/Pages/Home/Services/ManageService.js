import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import useServices from "../../../hooks/useServices";
import ModalALert from "../../Modal/ModalALert";

const ManageService = () => {
  const [services, setServices] = useServices();
  //Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Sure, are you want to delete?');
    if(confirmDelete){
      fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(action => {
        handleShow();
        console.log(action);
        const remaingService = services.filter(service => service._id !== id);
        setServices(remaingService)
      })
    }
  }
  return (
    <div className="">
      <div className="s_service">
        <div className="container">
          <div className="row">
            {services.map((service) => (
              <div key={service?._id} className="col-lg-4 col-md-6 col-sm-6">
                <Card className="mt-4" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={service?.img} />
                  <Card.Body>
                    <Card.Title>{service?.name}</Card.Title>
                    <Button className="btn-sm" variant="primary">Edit</Button>&nbsp;
                    <Button onClick={()=>handleDelete(service?._id)} className="btn-sm" variant="danger">Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalALert show={show} handleClose={handleClose} message="Service successfully DELETED..!!!"/>
    </div>
  );
};

export default ManageService;
