import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import Swal from "sweetalert2";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";
import { Google } from "../../../components/Shared/Google";
import image from "../../../../src/assets/login/login.png";
import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";

export const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { user, signIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const timeout = setTimeout(() => loadCaptchaEnginge(6), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      Swal.fire({ position: "top-end", icon: "success", title: "SignIn Successful!", showConfirmButton: false, timer: 1500 });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  };

  if (user) return <Navigate to={from} replace />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 px-4">
      <div className="max-w-6xl w-full lg:flex shadow-2xl rounded-2xl overflow-hidden">

        {/* Image */}
        <div className="lg:w-1/2 hidden lg:block p-4">
          <img src={image} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-5xl font-oleo font-bold mb-6 text-purple-700 text-center">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input type="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Password" />
            </div>

            <div>
              <LoadCanvasTemplate />
              <input type="text" name="captcha" onBlur={handleValidateCaptcha} className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2" placeholder="Type the text above" />
            </div>

            <button type="submit" disabled={disabled} className={`w-full py-3 rounded-lg text-white ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}>Sign In</button>

            <Google />
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don't have an account? <Link to="/signup" className="text-purple-600 hover:underline">Sign Up</Link>
          </p>
          <p className="text-center text-gray-400 mt-2">
            <Link to="/" className="text-pink-600 hover:underline">Go to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
