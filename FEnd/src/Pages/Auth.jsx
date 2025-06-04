import React, { useState } from 'react'
import FormPage from '../Components/Form/FormPage'
import AuthForm from '../Components/Form/AuthForm'

const Auth = () => {
  return (
    <div>
      <h1>login and sign up</h1>
      {/* <FormPage/> */}
      <AuthForm  />
      
    </div>
  );
}

export default Auth
