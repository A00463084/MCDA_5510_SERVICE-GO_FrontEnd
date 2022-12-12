import React,{Component} from 'react';
import bg from "./background2.jpg";

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: '',
            time_slot:'',
            name:'',
            category:'',
            cost:''
            

        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        fetch(process.env.REACT_APP_ORDERS)
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log(response);
                
            });
    }

    render() {

        return (

            <div>
                <div>
                    <img className='bg' alt="Homepage Design" src={bg}/>
                </div>
                <div>
                    <h1><i>My Bookings</i></h1>
                    

                </div>

                <div>
                    <h1><i>Edit Profile</i></h1>
                    
                </div>

                <div>
                    <h1><i>Delete Account</i></h1>
                    
                </div>
                
            </div>

        )
    }
}

export default Profile;