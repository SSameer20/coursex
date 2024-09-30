import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
// import Wallpaper from "../layout/Wallpaper";
import "../styles/auth.css";
import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";
import API from "../apiConfig";
import { Routes, User } from "../layout/types";
import { validateJWT } from "../layout/Validate.JWT";

export default function Authentication() {
  const [form, setForm] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreen(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isValid = validateJWT(token);
    if (isValid) {
      return navigate(Routes.APP);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  const handleForm = (): void => {
    if (form === true) setForm(false);
    else setForm(true);
  };

  const handleLogin = async (formData: any): Promise<void> => {
    try {
      setLoad(true);
      if (!formData || !formData) {
        swal("Credentials Required", "All credentials are required", "warning");
        return;
      }

      let userDetails: User = {
        email: formData.email,
        password: formData.password,
      };
      axios
        .post(API.USER_LOGIN, { userDetails })
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem("token", response.data.token);
          swal("Logged in", "user logged in", "success");
          return navigate(Routes.APP);
        })
        .catch((error) => {
          swal("Error", error.response.data, "warning");
        });
    } catch (error) {
      swal("Loggin Error", "Error While Logging in", "error");
    } finally {
      reset();
      setLoad(false);
    }
  };

  const handleRegister = async (formData: any): Promise<void> => {
    try {
      setLoad(true);
      if (formData.password !== formData.confirmPassword) {
        swal("Password Not Matched", "Please use same password", "error");
        return;
      }

      let userDetails: User = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      };

      axios
        .post(API.USER_REGISTER, { userDetails })
        .then((response) => {
          swal("Successfully Registered", response.data.message, "success");
          reset();
          setLoad(false);
          handleForm();
          return navigate(Routes.AUTH);
        })
        .catch((error) => {
          swal("Error", error.response.data.message, "warning");
          setLoad(false);
          reset();
        });
    } catch (error) {
      swal("Error", " Error while Registering", "error");
      setLoad(false);
    }
  };

  return (
    //     h-[70vh] w-[30vw]
    // h-[70vh] w-[30vw]
    <div className="flex w-full h-screen justify-center items-center authentication overflow-hidden">
      {/* <Wallpaper /> */}
      <div
        className="absolute card1 z-1"
        style={{
          height: window.innerWidth >= 800 ? "60vh" : "40vh",
          width: window.innerWidth >= 800 ? "30vw" : "60vw",
        }}
      ></div>
      <div
        className="absolute card2 z-1"
        style={{
          height: window.innerWidth >= 800 ? "60vh" : "40vh",
          width: window.innerWidth >= 800 ? "30vw" : "60vw",
        }}
      ></div>
      <div className="flex lg:w-1/4 md:w-1/3 sm:w-1/3 flex-wrap flex-col md:flex-nowrap gap-4 border-1 p-5 rounded-xl justify-center items-center backdrop-blur-2xl  z-10">
        <div className="flex w-2/3 lg:flex-row lg:gap-5 md:flex-row md:gap-5 flex-col z-10">
          <p
            className="test-2xl cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40"
            id="login"
            style={
              form
                ? {
                    borderBottomColor: "white",
                    paddingBottom: "5px",
                    fontSize: "large",
                    fontWeight: "800",
                    color: "text-neutral-800",
                  }
                : { border: "transparent" }
            }
            onClick={handleForm}
          >
            Login
          </p>
          <p
            className="test-sm cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40"
            id="register"
            style={
              form
                ? { border: "transparent" }
                : {
                    borderBottomColor: "white",
                    paddingBottom: "5px",
                    fontSize: "large",
                    fontWeight: "800",
                    color: "text-neutral-800",
                  }
            }
            onClick={handleForm}
          >
            Register
          </p>
        </div>
        {form ? (
          <form
            className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Input
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
        ) : (
          <form
            className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Input
              type="text"
              label="First Name"
              {...register("firstName", { required: "First Name required" })}
            />
            <Input
              type="text"
              label="Last Name"
              {...register("lastName", { required: "Last Name required" })}
            />
            <Input
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
            />
            <Input
              type="password"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            <Button type="submit" color="primary" isLoading={load}>
              Register
            </Button>
          </form>
        )}
        <span className="z-10">
          Admin ? <a href={Routes.ADMIN_AUTH}>Click here</a>
        </span>
      </div>
    </div>
  );
}
