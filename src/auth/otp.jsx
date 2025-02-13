
import React, { useEffect, useState, useRef } from 'react';
import "../style/sendOtp.css";
import { Link, useNavigate } from 'react-router-dom';
import { makeApi } from '../api/callApi';
import { ToastContainer, toast } from "react-toastify";

function OtpVerifiedForm() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(''));
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [IsOTPvalid, setIsOTPvalid] = useState(false);
  const [OTPverified, setOTPverified] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const inputRefs = useRef([]);


  // update password state
  const [password, setPassword] = useState("");

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const enteredOtp = otp.join('');
    const enteredOtp = parseInt(otp.join(''), 10);

    if (!enteredOtp) {
      toast.error('Please fill otp');
      return;
    }
    try {
      setLoading(true);
      const response = await makeApi("/api/check-otp", "POST", { email, OTP: enteredOtp });
      if (response.data.success === true) {
        setOTPverified(true);
        toast.success(response.data.message, {
          // onClose: () => navigate("/")
          onClose: () => {
            setIsOTPvalid(true)
            setOTPverified(false);

          }
        });
      }
    } catch (error) {
      console.error('Error sending data:', error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    // const enteredOtp = otp.join('');
    if (!password) {
      toast.error('Please fill new password');
      return;
    }
    try {
      setLoading(true);
      const response = await makeApi("/api/reset-password-with-otp", "POST", { email, newPassword: password });
      if (response.data.success === true) {
        setPasswordUpdated(true);
        toast.success(response.data.message, {
          onClose: () => {
            navigate("/")
            setPasswordUpdated(false);

          }
        });
      }
    } catch (error) {
      console.error('Error sending data:', error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem("send-otp-email", email));
  }, []);

  return (
    <>
      <ToastContainer />
      {IsOTPvalid === false ?
        <div className="main_login_page_div">
          <form className="Otp-verified-form" >
            <p className="Otp-verified-heading">Verify</p>
            <svg
              className="Otp-verified-check"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="60px"
              height="60px"
              viewBox="0 0 60 60"
              xmlSpace="preserve"
            >
              <image
                id="image0"
                width="60"
                height="60"
                x="0"
                y="0"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="
              ></image>
            </svg>

            <div>
              <div className="Otp-verified-box">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    className="Otp-verified-input"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ))}
              </div>
              <div className="button_otp_page">
                {OTPverified === true ?
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
                    {loading ? <div className='match_OTP_loader'></div> : <div>
                      <button className="Otp-verified-btn1" onClick={(e) => { handleSubmit(e) }}>Submit</button>
                    </div>}
                    <div>
                      <Link to="/Forgot-Password">
                        <button className="Otp-verified-btn2">Back</button>
                      </Link>
                    </div>
                  </div>
                }
              </div>
            </div>
          </form>
        </div>


        :
        <div className='main_login_page_div' >
          <form className="form" >
            <p className="login text-center">Update Password </p>
            <div className="login_inputContainer">

              <input
                placeholder="Enter New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small className='text-warning' >{password}</small>
            </div>
            <div>
              {passwordUpdated === true ? 
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
                <button type="submit" className="submit" onClick={(e) => handleSubmitPassword(e)} >Update Password</button>
              }
            </div>

            {/* <div className="con"> */}
            {/* <p>Don't have an account?&nbsp;</p> */}
            {/* <a href="#">Sign up</a> */}
            {/* </div> */}
          </form>
        </div>
      }


    </>
  );
}

export default OtpVerifiedForm;
