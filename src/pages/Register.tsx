import { useState } from "react";
import axios from "axios"; // Import Axios
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import * as z from "zod";
import CustomForm from "@/components/CustomForm";
// import { IFormFields } from "@/utils/interface";
import { Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import baseUrl from '../config/config'

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const formSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must contain at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => regex.test(data.password), {
  message: "Password must contain at least 1 number and both lower and uppercase letters and a special character.",
  path: ["password"],
});

const Register = () => {
  const defaultValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Registration successful!");
  const notifyError = (error: any) => toast.error(`Registration failed: ${error}`);

  // Function to handle user registration
  const registerUser = async ({ email, password }: any) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, { username:email, password });
      console.log('Registration successful:', response.data);
      notifySuccess(); // Show success toast
      // Redirect to the login page using window.location.href
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error);
      notifyError(error); // Show error toast
      // Handle registration error
    }
  };

  const onSubmit = async (user: any) => {
    setLoading(true);
    await registerUser(user);
    setLoading(false);
  };

  const FormFields = [
    { name: "fullname", display: "Full Name", placeholder: "John Doe", type: "text" },
    { name: "email", display: "Email", placeholder: "example@gmail.com", type: "email" },
    { name: "password", display: "Password", placeholder: "*******", type: "password" },
    { name: "confirmPassword", display: "Confirm Password", placeholder: "*******", type: "password" },
  ];

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CustomForm
            FormFields={FormFields}
            defaultValues={defaultValues}
            formSchema={formSchema}
            loading={loading}
            submitButtonText="Create account"
            submitIcon={<Mail className="mr-2 w-4 h-4" />}
            onSubmit={onSubmit}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>Already have an account? <a href="/login" className="text-primary underline font-semibold">Sign in.</a></p>
        </CardFooter>
      </Card>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;
