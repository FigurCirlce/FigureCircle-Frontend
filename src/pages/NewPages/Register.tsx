import React, { useEffect, useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseUrl from "../../config/config";
import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?:string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?:string;
  
}

interface sendData{
  fullName?: string;
  email?: string;
  password?:string;
}

interface RegisterProps {
  type?: string;
  setTabIndex?: (index: number) => void;
  onRegisterSuccess?: () => void;
   sendData?: (data: sendData) => void; 
}


//@ts-ignore
const Register: ForwardRefRenderFunction<any, RegisterProps> = (
  // { type, setTabIndex, onRegisterSuccess },
  { setTabIndex ,sendData,type},
  ref
) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });

 

  const [errors, setErrors] = useState<FormErrors>({});
  // const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Registration successful!");
  const notifyError = (error: any) =>
    toast.error(`Registration failed: ${error}`);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit=async()=>{
  //     console.log("Register clicked");
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    console.log("emailregister---", formData.email);
    console.log("passregister---", formData.password);

    if (Object.keys(validationErrors).length === 0) {
      // setLoading(true);
      try {
        const { email, password } = formData;
        const response = await axios.post(`${baseUrl}/register`, {
          username: email,
          password,
        });
        console.log("Registration successful:", response.data);
        //  localStorage.setItem('registerStatus', response.data.register);
        // console.log("Calling onRegisterSuccess:", typeof onRegisterSuccess);
        //  onRegisterSuccess?.();
        // localStorage.setItem("token",)

        notifySuccess();

        // Redirect after a short delay
        // setTimeout(() => {
        //   window.location.href = "/login";
        // }, 1500);

        // Switch to Login tab
        if (setTabIndex) setTabIndex(0);
      } catch (error: any) {
        console.error("Registration failed:", error);
        notifyError(error?.response?.data?.message || error.message);
      } finally {
        // setLoading(false);
      }
    }
  };

  //for ref in homepage
//   useImperativeHandle(ref, () => ({

//     handleSubmit,
// //    getFormData: () => ({
// //   fullName: formData.fullName,
// //   email: formData.email
// // }),
//   }));

  useImperativeHandle(ref, () => {
  if (type !== "mentor") {
    // For user registration -> expose submit
    return {
      handleSubmit,
    };
  } else {
    // For mentor registration -> expose only form data
    return {
       handleSubmit,
      getFormData: () => ({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      }),
    };
  }
});


 
useEffect(() => {
  const dataTosend={
    fullName: formData.fullName,
    email: formData.email,
    password:formData.password,
    phone:formData.phone,
  }
    sendData?.(dataTosend);
  }, [formData.fullName,formData.email,formData.password]);

  return (
    <div className="min-h-full  flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-3 text-center text-black">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <form  className="space-y-4"> */}
          {/* Full Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <User className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-2xl bg-slate-100"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Mail className="w-5 h-5" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-2xl bg-slate-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {type==="mentor"?(
             <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Phone className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Mob No."
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-2xl bg-slate-100"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          ):""}

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock className="w-5 h-5" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-2xl bg-slate-100"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock className="w-5 h-5" />
            </span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-2xl bg-slate-100"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          {/* <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white p-2 rounded-lg mt-4`}
          >
            {loading ? "Registering..." : "Register"}
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default forwardRef(Register);
