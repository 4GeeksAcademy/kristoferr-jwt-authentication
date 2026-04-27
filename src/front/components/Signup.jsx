import { Link } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {

    const [formData, setFormData] = useState({
        "email": "", 
        "password": ""
    });


    // const handleSubmit = () => {
    //     console.log(formData); // ✅ works
    // };

    function handleSubmit(){
        //get form data and send to backend with a fetch request
        const url = "https://studious-guide-wrp4qrrx56j7cvgpr-3001.app.github.dev/token";

        fetch(url,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        // fetch("http://localhost:3001/token", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: formData.email,
        //         password: formData.password
        //     })
        // });
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
                            onChange={()=>{
                                console.log("testing email");
                            }}
                            />

                            <input 
                            type="password" 
                            name="password"
                            label="password"
                            placeholder="password"
                            defaultValue={formData.password}
                            onChange={()=>{
                                console.log("testing password");
                            }}
                            />

                            <button 
                            type="button" 
                            className="btn btn-primary">Signup</button>
                        </form>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
};