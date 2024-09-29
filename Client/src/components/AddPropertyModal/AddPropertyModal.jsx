import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
// import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";
import useAuth from '../../hooks/useAuth';
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate, NavLink } from 'react-router-dom';
// import { set } from "mongoose";

const AddPropertyModal = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [modalOpened, setModalOpened] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  // console.log(isModalOpen);

  // const handleAddPropertyClick = () => {
  //   if (validateLogin()) {
  //     setModalOpened(true);
  //   }
  // };
//   const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: auth?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };


  const handleClose = () => {
    setModalOpened(false);
    navigate('/');
  }

  return (
    <Modal
      opened={modalOpened}
      onClose={handleClose}
      closeOnClickOutside
      size={"70rem"}
      padding={"5rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload ">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Facilities" description="Rooms">
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setModalOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;