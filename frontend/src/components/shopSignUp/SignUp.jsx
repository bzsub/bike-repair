import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";


import BasicInfo from './BasicInfo';
import LocationInfo from './LocationInfo';
import PricesAndServices from './PricesAndServices';
import BankInfo from './BankInfo';
import Confirmation from './Confirmation';

import { Container } from '@mui/material';

const SignUp = () => {

  let navigate = useNavigate();
  const { user } = useAuth();


  const [step, setStep] = useState(1)

  const [entity, setEntity] = useState("user");

  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    email:"",
    phone:"",
    locations: {
      zipCode: "",
      city: "",
      street: "",
      streetNum: "",
      apartment: "",
    },
    prices: {
      flatTire:"",
      chainSwap:"",
      wheelSwap:"",
    },
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

  useEffect(() => {
    if (user.userId) navigate("/profile");
    // eslint-disable-next-line
}, [user]);

  return (
    <Container maxWidth="xs">

      {
        step === 1 && <BasicInfo
          nextStep={nextStep} 
          shopInfo={shopInfo}
          setShopInfo={setShopInfo}
          entity={entity}
          setEntity={setEntity}
        />
      }

      {
        step === 2 && <LocationInfo 
          prevStep={prevStep} 
          nextStep={nextStep} 
          shopInfo={shopInfo}
          setShopInfo={setShopInfo}
        />
      }

      {
        step === 3 && <PricesAndServices 
          prevStep={prevStep} 
          nextStep={nextStep} 
          shopInfo={shopInfo}
          setShopInfo={setShopInfo}
        />
      }
      
      { 
        step === 4 && <BankInfo
        prevStep={prevStep} 
        nextStep={nextStep} 
        shopInfo={shopInfo}
        setShopInfo={setShopInfo}
        />
      }

      { 
        step === 5 && <Confirmation
        prevStep={prevStep}  
        shopInfo={shopInfo}
        />
      }

    </Container>
  )
}

export default SignUp