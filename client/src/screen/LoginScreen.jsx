import React, { use, useEffect } from 'react'

function LoginScreen() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  let logindisable=true;
  useEffect(() => {
    if(formData.email && formData.password){
      logindisable=false;
    }
  }, [formData]);

  const inputClass = "w-4/5 w-full  p-4 mb-2 rounded-[20px] font-light text-base focus:outline-none transition duration-150 ease-in-out border border-black/10 focus:border-transparent focus:ring-2 focus:ring-blue-200";
  return (
    <div className='flex items-center justify-center min-h-screen '>
      <div className=' flex flex-col bg-white p-8 rounded-lg shadow-lg lg:w-[20vw] w-[90vw]'>
        <h1>Login</h1>
        <form className='flex flex-col p-4 gap-4'>
        <input type="email" placeholder="Email" className={inputClass} />
        <input type="password" placeholder="Password" className={inputClass} />
        <button type="submit" className='bg-blue-300 text-white p-4 rounded-[20px] font-light text-base transition duration-150 ease-in-out hover:bg-blue-600'>Login</button>
      </form>
      <div className='flex justify-center'>
        <p className='text-sm text-gray-600'>Need an Account? <a href="/signup" className='text-blue-600 hover:underline'>Sign up</a></p>
      </div>
    </div>
    </div>

  )
}

export default LoginScreen
