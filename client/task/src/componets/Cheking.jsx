import React, { useEffect, useState } from 'react';
// import {
//     useStripe,
//     useElements,
//     PaymentElement,
//   } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';
import { checkout } from '../api/api';
import { Toaster, toast } from 'react-hot-toast';
// import LoadStripe from './LoadStripe';
const StripePromise = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
  
function Checking() {
    const navigate = useNavigate();
    // const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const appearance = {
//     theme: "stripe",
//   };
//   useEffect(() => {
//     const fetch = async () => {
   
//         const result = await checkout();
//         setClientSecret(result.clientSecret);
//         // setBugs(data.price);
      
//     };
//     fetch();
//   }, []);

//   const options = {
//     clientSecret,
//     appearance,
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    e.preventDefault();
    try{
        const response=await checkout(formData)
        toast(response.message)
        setFormData({
            name:"",
            email:'',
            contact:'',
            address:''
        })
    }catch(err){
        console.log(err);
        
    }
   
    // if (!stripe || !elements) {
    //   console.error("Stripe or Elements not initialized.");
    //   return;
    // }
    // try {
    //   const { error, paymentIntent } = await stripe.confirmPayment({
    //     elements,
    //     confirmParams: {},
    //     redirect: "if_required",
    //   });
    //   if (paymentIntent) {
    //     const Buydata = {
    //       paymentstatus: "success",
    //       amound: 5000,
    //       date: new Date(),
    //       name:formData.name
         
    //     };
    //     const response = await SuccessRequest(Buydata);
    //     toast(response.data.message);
    //     console.log(response, "response when it is sucecss");
    //     if (response.status === 200) {
    //       toast.success(response.message, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         style: {
    //           marginTop: "50px",
    //         },
    //       });
    //       navigate("/success");
    //     } else {
    //     }
    //   }

    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log("Payment successful:", paymentIntent);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
   
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col lg:flex-row w-[80%] border-2 border-black mt-16'>
        <div className='flex flex-col justify-center w-full lg:w-full p-8'>
          <h3 className='text-xl mb-8 text-white font-mono font-semibold uppercase w-auto bg-amber-900 p-1 text-center'>
            Details
          </h3>
          <form noValidate onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Fullname'
                className='border p-2 w-full border-amber-900'
              />
            </div>
            <div className='mb-4'>
              <label>Contact</label>
              <input
                type='text'
                name='contact'
                value={formData.contact}
                onChange={handleChange}
                placeholder='Contact'
                className='border p-2 w-full border-amber-900'
              />
            </div>
            <div className='mb-4'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='border p-2 w-full border-amber-900'
              />
            </div>
            <div className='mb-4'>
              <label>Address</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Address'
                className='border p-2 w-full border-amber-900'
              />
            </div>
            <h3 className='text-xl mb-4 text-amber-900 font-mono font-semibold uppercase'>
              Payment Type
            </h3>
            <div className='w-auto border-2 border-gray-200 bg-[#2257d3] flex justify-center p-2'>
            {/* <Elements stripe={StripePromise} options={options}>
                    {/* <LoadStripe
                   name={formData.name}
                   email={email}
                   contact={formData.contact}
                   address={formData.address}
                   /> */}
                  {/* </Elements> */} 
              <button type='submit' className='text-white font-bold'>Pay</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default Checking;
