import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import './Login.css'
import { Spinner } from "react-bootstrap";
import authentication from '../Images/auth.jpg';
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formInputChange = (formField, value) => {
        if (formField === "email") {
            setEmail(value);
        }
        if (formField === "password") {
            setPassword(value);
        }
    };

    console.log(isLoading);

    const validation = () => {
        return new Promise((resolve, reject) => {
            if (email === '' && password === '') {
                setEmailErr("Email is Required");
                setPasswordErr("Password is required");
                toast.warning("Email and Password are required");
                resolve({ email: "Email is Required", password: "Password is required" });
            }
            else if (email === '') {
                setEmailErr("Email is Required");
                toast.warning("Email is Required");
                resolve({ email: "Email is Required", password: "" });
            }
            else if (password === '') {
                setPasswordErr("Password is required");
                toast.warning("Password is required");
                resolve({ email: "", password: "Password is required" });
            }
            else if (password.length < 6) {
                setPasswordErr("must be 6 character")
                toast.warning("must be 6 character");
                resolve({ email: "", password: "must be 6 character" });
            }
            else {
                resolve({ email: "", password: "" });
                setIsLoading(false);
            }
        });

    };

    const handleClick = async (e) => {
        e.preventDefault();
        setEmailErr("");
        setPasswordErr("")
        await validation();
        if(email !== "" && password !== ""){
            if(email === "sample@gmail.com" && password === "123456"){
                setIsLoading(true);
                console.log("Validated!!!!!!")
                localStorage.setItem("validate", true);
                setTimeout(() => {
                    setIsLoading(false);
                    window.location.reload();
                }, 2000);
                
            }
            else if(email !== "sample@gmail.com"){
                toast.error("Please Enter Valid Email Address");
            }
            else if(email === "sample@gmail.com" && password !== "123456"){
                toast.error("Please Enter Valid  Password");
            }
        }
        
    }



    return (
        <>
            <div className="login-container">
                <div className="image-container">
                    <img src={authentication} style={{width: "400px"}} alt="people_tech" />
                </div>
                <Form className="form-container">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => formInputChange("email", e.target.value)}
                            helperText={emailErr}
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required={true}
                            value={password}
                            helperText={passwordErr}
                            onChange={(e) => { formInputChange("password", e.target.value) }}
                        />
                    </Form.Group>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="secondary" type="submit" onClick={(e) => handleClick(e)}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
            {isLoading && (
                <div className="spinner-backdrop">
                    <Spinner animation="border" role="status" variant="light">
                        <span className="visually-hidden"></span>
                    </Spinner>
                </div>
            )}
            <ToastContainer
        limit={1}
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ minWidth: "100px" }}
        transition={Zoom}
      />
        </>
    )
}

export default Login;