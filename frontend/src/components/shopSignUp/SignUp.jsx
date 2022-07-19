import React, { useState } from 'react'

import PricesAndServices from './PricesAndServices';
import NameAndLocation from './NameAndLocation';
import BankInfo from './BankInfo';

import Typography from '@mui/material/Typography';
import Confirmation from './Confirmation';
import { Container } from '@mui/material';


const SignUp = () => {
  const [step, setStep] = useState(1)

  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    socials: [],
    location: {
      zipCode: "",
      city: "",
      street: "",
      streetNum: "",
      apartment: "",
    },
    services: [],
    bankInfo: {
      bankName:"",
      IBAN:""
    }
  })

  const prevStep = () => {
    setStep(step - 1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const handleInputData = input => e => {

    const { value } = e.target;

    setShopInfo(prevState => ({
      ...prevState,
      [input]: value
    }));
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        SignUp
      </Typography>
      <p>{step}</p>  
      {
        step === 1 && <NameAndLocation
          nextStep={nextStep} 
          values={shopInfo}
          handleFormData={handleInputData}
        />
      }

      {
        step === 2 && <PricesAndServices 
          prevStep={prevStep} 
          nextStep={nextStep} 
          values={shopInfo}
          handleFormData={handleInputData}
        />
      }
      
      { 
        step === 3 && <BankInfo
        prevStep={prevStep} 
        nextStep={nextStep} 
        values={shopInfo}
        handleFormData={handleInputData}
        />
      }
      { 
        step === 4 && <Confirmation
        prevStep={prevStep} 
        nextStep={nextStep} 
        values={shopInfo}
        handleFormData={handleInputData}
        />
      }
    </Container>
  )
}

export default SignUp