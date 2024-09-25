
import { useState } from 'react';
// import axios from 'axios'; 
// import swal from 'sweetalert'; 
import Wallpaper from '../layout/Wallpaper';
// import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
// import { useNavigate } from 'react-router-dom';

import {Routes} from '../layout/types'


export default function AdminAuth() {
    const [form, setForm] = useState<Boolean>(false)
   

    const handleForm = () : void => {
        if(form === true) setForm(false)
        else setForm(true)
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
                ? { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'purple' }
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
                : { borderBottomColor: 'white', paddingBottom: '5px', fontSize: 'large', fontWeight: '800', color: 'purple' }
            }
            onClick={handleForm}
          >
            Register
          </p>
        </div>
        {form ? (
          <form className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4">
            <Input
              type="email"
              label="Email"
            //   {...register('email', { required: 'Email is required' })}
            />
            <Input
              type="password"
              label="Password"
            //   {...register('password', { required: 'Password is required' })}
              
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
        ) : (
          <form className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4">
            <Input
              type="text"
              label="First Name"
            //   {...register('firstname', { required: 'First Name required' })}
            />
             <Input
              type="text"
              label="Second Name"
            //   {...register('secondname', { required: 'Second Name required' })}
            />
            <Input
              type="email"
              label="Email"
            //   {...register('email', { required: 'Email is required' })}
            />
            <Input
              type="password"
              label="Password"
            //   {...register('password', { required: 'Password is required' })}
              
            />
            <Input
              type="password"
              label="Confirm Password"
            //   {...register('confirmPassword', { required: 'Please confirm your password' })}
            />
            <Button type="submit" color="primary">
              Register
            </Button>
          </form>
        )}

        <span className='z-10 center'>User Login <a href={Routes.AUTH}>Click here</a></span>
      </div>


    </div>
  )
}