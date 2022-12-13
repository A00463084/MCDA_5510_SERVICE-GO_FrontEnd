import { ContactSupportOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import background from "./background2.jpg";
import "./Home.css";


const Profile = () => {

    const [bookings, setBookings] = useState([]);

    const [isempty, setIsempty] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_ORDERS, {
            method: "POST",
            headers: {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                email: localStorage.getItem("email")

            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("test")
                console.log(data);
                setBookings(data);
                if(Object.hasOwn(data[0],"Status"))
                {
                    console.log("comint to this block");
                    setIsempty(true);
                }
                console.log(bookings);

            })
            .catch(function (error) {
                console.error(error);
            });
    },[])


    return (

        <div>
            <div>
                <img className="bg" src={background} alt="Background image" />
            </div>
            <div>
                    <h1><i>Hello {localStorage.getItem("name")}</i></h1>
                    
            </div>
            <div>
                <h1><i>My Bookings</i></h1>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost</th>
                    </tr>
                    {bookings?.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.date}</td>
                                <td>{val.time_slot}</td>
                                <td>{val.name}</td>
                                <td>{val.category}</td>
                                <td>{val.Cost}</td>
                            </tr>
                        )
                    })}
                </table>
                {isempty && (
                 <h3>No Orders </h3>
              )}
            </div>
        </div>

    );



};

export default Profile;