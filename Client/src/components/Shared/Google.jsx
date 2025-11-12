import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./LoadingSpinner";

export const Google = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = async () => {
    setBtnLoading(true);
    try {
      const result = await signInWithGoogle();

      // Check if we have a result
      if (!result?.user) {
        throw new Error("Sign in failed - no user data");
      }

      const userInfo = {
        email: result.user.email,
        name: result.user.displayName || "No Name",
        photo: result.user.photoURL || "",
        role: "user",
      };

      // Save user to backend
      await axiosPublic.post("/users", userInfo, { withCredentials: true });

      toast.success("Google Sign in Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google Sign in failed" + err.message);
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-4 text-gray-500 text-center border-2 border-[#D1A054] rounded-lg hover:bg-gray-50 px-4 transition-colors duration-300">
      <button
        onClick={handleGoogleSignIn}
        disabled={btnLoading || loading}
        className="w-full flex items-center justify-center gap-5 py-2 font-bold"
      >
        <FcGoogle className="text-2xl" />
        {btnLoading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};
