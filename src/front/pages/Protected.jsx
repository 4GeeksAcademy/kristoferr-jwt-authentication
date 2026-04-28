import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Protected = () => {
    
    const [user, setUser] = useState();
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("testing useeffefect");

        //Get token from local storage
        const token = sessionStorage.getItem("access_token");
        console.log(token);

        if(token){
            // Access protected area
            const url = "https://studious-guide-wrp4qrrx56j7cvgpr-3001.app.github.dev/api/protected";

            fetch(url,{
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`
                }
            }).then((response)=>{
                return response.json();
            }).then((body)=>{
                setUser(body);
            });
        }else{
            navigate("/login");
        }
        

    },[]);
    
    
    return (
        <div className="container">
            this is a protected area for: 
            {user?.email}
            
        </div>
    );
};