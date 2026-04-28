import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [formData, setFormData] = useState({
        "email": "", 
        "password": ""
    });


    // const handleSubmit = () => {
    //     console.log(formData); // ✅ works
    // };

    const navigate = useNavigate();

    async function handleSubmit(){
        //get form data and send to backend with a fetch request
        const url = "https://studious-guide-wrp4qrrx56j7cvgpr-3001.app.github.dev/api/login";

        const response = await fetch(url,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        const token = await response.json();
        console.log("testing token", token);

        //Save token to local storage
        sessionStorage.setItem("access_token", token.access_token)

        //Redirect user to frontend
        navigate("/protected");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="signup">
                        <form action="">
                            <input 
                            type="email"
                            name="email"
                            label="email"
                            placeholder="add your email"
                            defaultValue={formData.email} 
                            onChange={(event)=>{
                                setFormData({
                                    ...formData,
                                    email: event.target.value
                                });
                            }}
                            />

                            <input 
                            type="password" 
                            name="password"
                            label="password"
                            placeholder="password"
                            defaultValue={formData.password}
                            onChange={(event)=>{
                                setFormData({
                                    ...formData,
                                    password: event.target.value
                                });
                            }}
                            />

                            <button 
                            type="button"
                            onClick={(event)=>{
                                handleSubmit();
                            }} 
                            className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
};