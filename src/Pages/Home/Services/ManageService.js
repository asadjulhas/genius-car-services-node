import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useServices from "../../../hooks/useServices";
import DeleteModal from "../../Modal/DeleteModal";
import ModalALert from "../../Modal/ModalALert";

const ManageService = () => {
  const [services, setServices] = useServices();
  const [deleteSer, setDeleteSer] = useState(false)
  const [productID, setproductID] = useState('');
  const [productTitle, setProductTitle] = useState('');
  //Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id, title) => {
    // const confirmDelete = window.confirm('Sure, are you want to delete?');
    handleShow();
    setproductID(id)
    setProductTitle(title)
  }

  useEffect(() => {
      
    if(deleteSer){
      setShow(false);
      setDeleteSer(false);
      fetch(`https://salty-ravine-90360.herokuapp.com/delete/${productID}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(action => {
        const remaingService = services.filter(service => service._id !== productID);
        setServices(remaingService)
      })
      toast('Service successfully Deleted..!!!')
    }

  },[deleteSer])
  // console.log(deleteSer)
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
                    <Button onClick={()=>handleDelete(service?._id, service?.name)} className="btn-sm" variant="danger">Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal show={show} handleClose={handleClose} setDeleteSer={setDeleteSer} title={productTitle} message="Are you sure you want to delete?"/>
    </div>
  );
};

export default ManageService;
