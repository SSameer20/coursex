import { useState, useEffect } from 'react';
import env from "react-dotenv";

import axios from 'axios';
import swal from 'sweetalert';
import Wallpaper from '../layout/Wallpaper';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { Routes, User } from '../layout/types'
import {validateJWT} from "../layout/Validate.JWT"




export default function Authentication() {
  const [form, setForm] = useState<boolean>(true)
  const [load, setLoad] = useState<boolean>(false)
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(()=> {
    const token = localStorage.getItem('token');
    const isValid = validateJWT(token);
    if (isValid) {
      return navigate(Routes.APP)
    }
    else{
      localStorage.removeItem('token')
      swal("Session Expired", "Please Login Again", "warning")
    }
  },[])



  const handleForm = (): void => {
    if (form === true) setForm(false)
    else setForm(true)
  }


  const handleLogin = async (formData: any): Promise<void> => {
    try {
      setLoad(true);
      if (!formData || !formData) {
        swal("Credentials Required", "All credentials are required", "warning")
        return
      }

      let userDetails: User = {
        email: formData.email,
        password: formData.password
      }
      // let url : string = (env.ENVIRONMENT === "DEVELOPMENT") ? "https://coursex-api.vercel.app/api/v1/user/login" : "http://localhost:8080/api/v1/user/login" ;
      axios.post("https://coursex-api.vercel.app/api/v1/user/login", { userDetails })
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token);
          swal("Logged in", "user logged in","success")
          return navigate(Routes.APP)
        })
        .catch(error =>{
          swal("Error", error.response.data, "warning")
          // swal("error","wrong credentials", "error")
        })
    } catch (error) {
      swal("Loggin Error", "Error While Logging in", "error")
    }
    finally {
      reset();
      setLoad(false);
    }

  }

  const handleRegister = async (formData: any): Promise<void> => {
    try {
      setLoad(true);
      if (formData.password !== formData.confirmPassword) {
        swal("Password Not Matched", "Please use same password", "error");
        return
      }

      let userDetails: User = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      }

      axios.post("https://coursex-api.vercel.app/api/v1/user/register", { userDetails })
        .then(response => {
          swal("Successfully Registered", response.data.message, "success");
          reset();
          setLoad(false);
          handleForm();
          return navigate(Routes.AUTH)
        })
        .catch((error) => {
          swal("Error", error.response.data.message, "warning")
          setLoad(false);
          reset();
        })
    } catch (error) {
      swal("Error", " Error while Registering", "error")
      setLoad(false);
    }
  }


  return (
    <div className="flex w-full h-screen justify-center items-center authentication">
      <Wallpaper />
      <div className="flex w-1/4 flex-wrap flex-col md:flex-nowrap gap-4 border-1 p-5 rounded-xl justify-center items-center bg-black">
        <div className="flex w-2/3 flex-wrap flex-row gap-4 z-10">
          <p
            className="test-2xl cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40"
            id="login"
            style={
              form
                ? { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'text-neutral-800' }
                : { border: 'transparent' }
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
                ? { border: 'transparent' }
                : { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'text-neutral-800' }
            }
            onClick={handleForm}
          >
            Register
          </p>
        </div>
        {form ? (
          <form className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4" onSubmit={handleSubmit(handleLogin)}>
            <Input
              type="email"
              label="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              type="password"
              label="Password"
              {...register('password', { required: 'Password is required' })}

            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
        ) : (
          <form className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4" onSubmit={handleSubmit(handleRegister)}>
            <Input
              type="text"
              label="First Name"
              {...register('firstName', { required: 'First Name required' })}
            />
            <Input
              type="text"
              label="Last Name"
              {...register('lastName', { required: 'Last Name required' })}
            />
            <Input
              type="email"
              label="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              type="password"
              label="Password"
              {...register('password', { required: 'Password is required' })}

            />
            <Input
              type="password"
              label="Confirm Password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
            />
            <Button type="submit" color="primary" isLoading={load}>
              Register
            </Button>
          </form>
        )}
        <span className='z-10'>Admin Login <a href={Routes.ADMIN_AUTH}>Click here</a></span>
      </div>
    </div>
  )
}