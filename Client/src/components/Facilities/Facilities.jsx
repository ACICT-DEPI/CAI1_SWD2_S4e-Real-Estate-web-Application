// import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
// import UserDetailContext from "../../context/UserDetailContext";
// import useProperties from "../../hooks/useProperties.jsx";
// import { useMutation } from "react-query";
import { toast } from "react-toastify";
// import { createResidency } from "../../utils/api";
import useAuth from '../../hooks/useAuth';
import AuthContext from "../../context/AuthProvider";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "../../api/axios";
const ADD_URL = '/Residency';

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
    
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      try{
        const response = await axios.post(ADD_URL,
            JSON.stringify({ propertyDetails }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    withCredentials: true
                }
            }
        );
        console.log(response.data);
        toast.success("Added Successfully", {position: "bottom-right"});
        setPropertyDetails({
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
        })
        setOpened(false)
        setActiveStep(0)
      }catch(e){
        console.log(e)
      }
    }
  };

  // ==================== upload logic
//   const { user } = useAuth0();
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

//   const {mutate, isLoading} = useMutation({
//     mutationFn: ()=> createResidency({
//         ...propertyDetails, facilities: {bedrooms, parkings , bathrooms},
//     }, token),
//     onError: ({ response }) => toast.error(response.data.message, {position: "bottom-right"}),
//     onSettled: ()=> {
    //   toast.success("Added Successfully", {position: "bottom-right"});
    //   setPropertyDetails({
    //     title: "",
    //     description: "",
    //     price: 0,
    //     country: "",
    //     city: "",
    //     address: "",
    //     image: null,
    //     facilities: {
    //       bedrooms: 0,
    //       parkings: 0,
    //       bathrooms: 0,
    //     },
    //     userEmail: auth?.email,
    //   })
    //   setOpened(false)
    //   setActiveStep(0)
//       refetchProperties()
//     }

//   })

// const isLoading = false;
  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green">
            Add Property
          </Button>
        </Group>
      </form>
    </Box>
  );
};


export default Facilities;