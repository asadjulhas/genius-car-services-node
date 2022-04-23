import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import useServices from "../../../hooks/useServices";

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

      <>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Action Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>Service successfully DELETED..!!!</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
</>

    </div>
  );
};

export default ManageService;
