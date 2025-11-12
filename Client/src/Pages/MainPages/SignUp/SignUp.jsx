import { useContext } from "react";
import { AuthContext } from "./../../../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { Google } from "../../../components/Shared/Google";
import image from "../../../../src/assets/login/signup.png";
import { imageUpload } from "./../../../apis/Utils";

export const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile);

      await createUser(data.email, data.password);
      await updateUserProfile(data.name, imageUrl);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: "user",
      };
      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/");
      } else {
        toast.error("Failed to save user in database!");
      }
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 px-4">
      <div className="max-w-6xl w-full lg:flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="lg:w-1/2 hidden lg:block p-4">
          <img
            src={image}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-5xl font-bold font-oleo mb-6 text-purple-700 text-center">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be less than 20 characters
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full text-gray-700"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </button>

            <Google />
          </form>

          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
          <p className="text-center text-gray-400 mt-2">
            <Link to="/" className="text-pink-600 hover:underline">
              Go to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
