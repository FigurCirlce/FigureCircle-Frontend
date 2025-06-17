import React, { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import baseURL from "@/config/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

type FormData = {
  username: string;
  password: string;
};

type FormErrors = {
  username?: string;
  password?: string;
};

interface LoginProps {
  type?: string;
}

const Login: React.FC<LoginProps> = ({ type }) => {
  const [form, setForm] = useState<FormData>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifySuccess = () => {
    type === "modal"
      ? toast.success("Click on Next Button to Continue..")
      : toast.success("Login successful!");
  };

  const notifyError = (error: any) =>
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again."
    );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const fetchBasicInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/basic-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  console.log("basicInformation---",response.data);
localStorage.setItem("degree", JSON.stringify(response.data));

        // setBasicInfo([response.data]);
        // setDegree(response.data.interested_stream);
        // setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validate()) {
        const response = await axios.post(`${baseURL}/login`, form);

        const token = response.data.access_token;
        document.cookie = `token=${token}; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()}; path=/`;

        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", token);
        localStorage.setItem("userlocaldata", JSON.stringify(form));

        //@ts-ignore
        dispatch(setUser(form));
        notifySuccess();

        if (response.data.data_fill === true) {
          fetchBasicInfo();
          navigate("/dashboard");
        } else {
          navigate("/basic-info");
        }
      }
    } catch (error) {
      notifyError(error);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      window.location.href = `${baseURL}/google_login`;
    } catch (error) {
      notifyError(error);
      console.error("Login with Google failed:", error);
    }
  };

  const getParameterByName = (name: string, url: string): string | null => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  useEffect(() => {
    const getParameterByNameone = (name: any, url: any) => {
      const urlSearchParams = new URLSearchParams(url.split("?")[1]);
      return urlSearchParams.get(name);
    };

    const token = getParameterByNameone("token", window.location.href);
    const userDataString = getParameterByName("userData", window.location.href);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData) localStorage.setItem("user", JSON.stringify(userData));

    if (token) {
      document.cookie = `token=${token}; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
      localStorage.setItem("token", token);
      notifySuccess();
      console.log("Login with Google successful");
    //   navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Welcome Back!</h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <User className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full pl-10 py-2 border rounded-full bg-slate-100"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock className="w-5 h-5" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 py-2 border bg-slate-100 rounded-full"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <p className="text-[12px] text-black font-bold flex justify-end">Forgot Password?</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="w-full text-gray-500 text-sm text-center mx-2">
            or continue with
          </span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-4 mt-4 w-full">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded hover:bg-slate-100 w-full shadow-md shadow-gray-200"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-sm">Login With Google</span>
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

