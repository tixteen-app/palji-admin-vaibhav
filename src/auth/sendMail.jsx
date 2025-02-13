import React, { useState } from 'react';
import "../style/sendmail.css"
import { Link, useNavigate } from 'react-router-dom';
import { makeApi } from '../api/callApi';
import { ToastContainer, toast } from "react-toastify";

function ForgotPasswordForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [Loading, setLoading] = useState(false);
  const [mailSend, setMailSend] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email) {
      toast.error('Please fill email');
      return;
    } 
    try {
      setLoading(true)
      const response = await makeApi("/api/forgot-password", "POST", { email })
      if (response.data.success === true) {
        setMailSend(true)
        localStorage.setItem("send-otp-email", email)
        // show this toast and then navigate
        toast.success(response.data.message, {

          onClose: () => {
            navigate("/otp-verified")
            setMailSend(false)
          }
        })
      }
    } catch (error) {
      console.error('Error sending data:', error.response.data);
      toast.info(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='main_login_page_div' >
        <div className="form-container-forgot-password">
          <div className="logo-container">
            Forgot Password
          </div>

          <form className="form-forgot-password">
            <div className="form-group-forgot-password">
              <label htmlFor="email">Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter your email" required />
            </div>
            <div className='text-center w-100 d-flex justify-content-center p-3' >

              {mailSend === true ?
             <div>
             <div className='opt_don_loader_main_div'>
               <div className="otp_done_loader">
                 <div className="circle">
                   <div className="dot"></div>
                   <div className="outline"></div>
                 </div>
                 <div className="circle">
                   <div className="dot"></div>
                   <div className="outline"></div>
                 </div>
                 <div className="circle">
                   <div className="dot"></div>
                   <div className="outline"></div>
                 </div>
                 <div className="circle">
                   <div className="dot"></div>
                   <div className="outline"></div>
                 </div>
               </div>
             </div>
           </div>
           :  
              <div>
                {Loading ? <div className="send_mail_loader"></div> : <div>
                  <button className="form-submit-btn-forgot-password" type="submit" onClick={(e) => handleSubmit(e)} >Send Email</button>
                </div>}
              </div>
            }

            </div>
          </form>

          <p className="signup-link">
            Remember your password?
            {/* <a href="#" className="signup-link link"> Sign up now</a> */}
            <Link to="/" className="signup-link link"> Sign in now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
