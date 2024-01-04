import { useRef, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  clearErrors,
  loginuseraction,
  registeruseraction,
  registeruserotpaction,
} from "../../Actions/useraction";
import Loading from "../Loading/Loading";
import Metadata from "../Layout/Metadata";
import "./Login_Register.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import CodeIcon from "@material-ui/icons/Code";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {WaveLoading} from 'react-loadingg'
const PreviewAvatar = "https://ik.imagekit.io/shera/Images/tr:w-200,f-auto/Profile.png";

function Login_Register() {
  // const x = 'abc'
  //   console.log(x.isEmail())

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const {
    loading: Otpload,
    error: Otperror,
    CodeSent,
  } = useSelector((state) => state.otp);
  const history = useHistory();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      setmetadata(true);
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setmetadata(false);
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const [metadata, setmetadata] = useState(true);

  const [logindata, setlogindata] = useState({
    Email: "",
    Password: "",
  });

  const logindatachange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name)
    setlogindata((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const loginbtn = (e) => {
    e.preventDefault();
    dispatch(loginuseraction(logindata));
    if (isAuthenticated) {
      alert.success("Logged In");
    }
  };

  const [registerdata, setregisterdata] = useState({
    Name: "",
    Email: "",
    Password: "",
    CPassword: "",
    Avatar: PreviewAvatar,
    Code: "",
  });

  const registerdatachange = (e) => {
    const { name, value } = e.target;
    if (name === "Avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setregisterdata((state) => {
            return {
              ...state,
              [name]: reader.result,
            };
          });
        }
      };
    } else {
      setregisterdata((state) => {
        return {
          ...state,
          [name]: value,
        };
      });
    }
  };

  const [open, setOpen] = useState(false);

  const dialogtoggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const registerotpbtn = (e) => {
    e.preventDefault();
    dispatch(registeruserotpaction(registerdata))
  };
  useEffect(() => {
    if (!open && !CodeSent) {
      setOpen(false);
    }else{
      setOpen(true)
    }
    // eslint-disable-next-line
  }, [CodeSent, Otpload]);

  const registerbtn = (e) => {
    e.preventDefault();
    dispatch(registeruseraction(registerdata));
    if (isAuthenticated) {
      alert.success("Logged In");
    }
  };

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (Otperror) {
      alert.error(Otperror);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, history, redirect, Otperror]);

  return (
    <>
      {metadata ? (
        <Metadata title="LOGIN | ECOMMERCE" />
      ) : (
        <Metadata title="REGISTER | ECOMMERCE" />
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login Form  */}
              <form className="loginForm" ref={loginTab} onSubmit={loginbtn}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="Email"
                    required
                    onChange={logindatachange}
                    value={logindata.Email}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="Password"
                    required
                    onChange={logindatachange}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <Button
                  type="submit"
                  className="loginBtn"
                  color="secondary"
                  variant="contained"
                >
                  Login
                </Button>
              </form>

              {/* Register Form  */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="Name"
                    value={registerdata.Name}
                    onChange={registerdatachange}
                        disabled={Otpload ? true : false}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="Email"
                    onChange={registerdatachange}
                    value={registerdata.Email}
                        disabled={Otpload ? true : false}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="Password"
                    onChange={registerdatachange}
                    value={registerdata.Password}
                        disabled={Otpload ? true : false}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="CPassword"
                    onChange={registerdatachange}
                    value={registerdata.CPassword}
                        disabled={Otpload ? true : false}
                  />
                </div>

                <div id="registerImage">
                  <img src={registerdata.Avatar} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="Avatar"
                    accept="image/*"
                    onChange={registerdatachange}
                        disabled={Otpload ? true : false}
                  />
                </div>
                <Button
                  className="signUpBtn"
                  onClick={registerotpbtn}
                  color="secondary"
                  variant="contained"
                  disabled={Otpload ? true : false}
                >
                  Register
                </Button>
                <Dialog
                disableBackdropClick="true"
                disableEscapeKeyDown="true"
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={dialogtoggle}
                >
                  {/* {Otpload ? <Loading/> : <> */}
                  <DialogTitle>Verify Code</DialogTitle>
                  <DialogContent className="submitDialog">
                    <div className="signUpName">
                  {Otpload ? <span className="otpload"> <WaveLoading size="small"  color='grey' /> </span> : <CodeIcon />}

                      <input
                        type="number"
                        placeholder={Otpload ? 'Resending Code...' : "Code"}
                        required
                        name="Code"
                        disabled={Otpload ? true : false}
                        value={registerdata.Code}
                        onChange={registerdatachange}
                      />
                    </div>
                    {!Otpload &&
                      <input
                      className="resendcode"
                        type="button"
                        name="ResendCode"
                        value="Resend Code"
                        onClick={registerotpbtn}
                      />
                    }
                    
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={dialogtoggle}
                      className="signUpBtn"
                      color="primary"
                        disabled={Otpload ? true : false}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        if (registerdata.Code.length === 6) {
                          registerbtn(e);
                        } else {
                          alert.error("Enter A Valid Code");
                        }
                      }}
                      className="signUpBtn"
                      color="secondary"
                        disabled={Otpload ? true : false}
                    >
                      Register
                    </Button>
                  </DialogActions>
                  {/* </>} */}
                </Dialog>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login_Register;
