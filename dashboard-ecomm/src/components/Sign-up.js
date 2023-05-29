import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
 
const SignUp = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail]= useState('')
    const navigate = useNavigate()

    const collectData = async()=>{
        console.log(name,email,password)
        let result =await fetch('http://localhost:5000/register',{
          method: 'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          },
    })
    result = await result.json()
    console.log(result)
   // localStorage.setItem("user",JSON.stringify(result))
    navigate("/login")
    alert("Registered succesfully...!")
  }

  //  useEffect(()=>{
  //   const auth= localStorage.getItem('user');
  //   if(auth){
  //     navigate('/login')
  //   }
  // })
  

  return (
    <div className='register'>
        <h3>Register</h3>
        <input className='inputBox' type='text' placeholder='Enter Name'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input className='inputBox' type='email' placeholder='Enter Email'
        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className='inputBox' type='password' placeholder='Enter Password'
        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>    
        <button className='appButton' type='button' onClick={collectData}>SignUP</button>
    </div>
  )
}


export default SignUp