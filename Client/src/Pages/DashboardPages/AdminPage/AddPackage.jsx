import { useState } from "react";
import { AddPackageForm } from "../../../components/Dashboard/AddPackageForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useAxiosSecure } from "./../../../hooks/useAxiosSecure";
import { imageUpload } from "./../../../apis/Utils";

export const AddPackage = () => {
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const [uploadImage, setUploadImage] = useState({ name: "Upload Image" });
  const [loading, setLoading] = useState(false);

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const spotName = form.spotName.value;
    const city = form.city.value;
    const location = form.location.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const travelTime = form.travelTime.value;
    const seasonality = form.seasonality.value;
    const visitors = form.visitors.value;
    const description = form.description.value;
    const image = form.image.files[0];

    //Upload image to imgbb
    const imageUrl = await imageUpload(image);

    //Package data
    const packageData = {
      spotName,
      city,
      location,
      category,
      price,
      travelTime,
      seasonality,
      visitors,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };

    try {
      // ✅ Save to DB
      await axiosSecure.post("/packages", packageData);
      toast.success("Tour Package Added Successfully!");
      navigate("/trips");
    } catch (err) {
      toast.error(err?.message || "Failed to add package!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* <Helmet>
        <title>Add Package | Dashboard</title>
      </Helmet> */}

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 drop-shadow-md">
        Add New Tourist Package
      </h1>

      {/* Add Package Form */}
      <AddPackageForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};
