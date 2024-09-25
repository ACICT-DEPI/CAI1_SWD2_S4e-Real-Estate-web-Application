import { useState } from "react";
import { updateRecidency } from "../api/Details";
import swal from "sweetalert2";

function Update({ property, onClose, fetchProperties }){
  const [formData, setFormData] = useState(property);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecidency(property._id, formData); 
      swal.fire("Success", "Recidency Updated", "success");
     fetchProperties(); 
      onClose();
    } catch (error) {
      swal.fire("Error", "Failed to update Recidency", "error");
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col justify-center items-center  gap-5 ">
      <div className="bg-blue-950 rounded-2xl p-10 mx-auto w-80 md:w-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-white ">Update Recidency</h1>
      <form onSubmit={handleSubmit}  className="flex gap-3 flex-col ">
      <div className="flex flex-col gap-1">
      <label className=" text-xl font-semibold text-white">Name:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <div className="flex flex-col gap-1">
        <label className=" text-xl font-semibold text-white">Email:</label>
        <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <div className="flex flex-col gap-1">
        <label className=" text-xl font-semibold text-white">Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <div className="flex flex-col gap-1">
        <label className=" text-xl font-semibold text-white">City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <div className="flex flex-col gap-1">
        <label className=" text-xl font-semibold text-white">Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <div className="flex flex-col gap-1">
        <label className=" text-xl font-semibold text-white">Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange}
         className="border p-2 rounded-lg w-[250px] focus:ring-2 focus:ring-[#79d0f1] outline-none transition-shadow shadow-md md:w-[300px]" />
        </div>
        <button type="submit" className="rounded-lg border bg-red-900 p-2 text-white font-bold">Update</button>
        <button type="button" onClick={onClose} className="rounded-lg border bg-red-900 p-2 text-white font-bold">Cancel</button>
      </form>
      </div>
    </div>
  );
}

export default Update;
