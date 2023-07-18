import {ObjectId} from 'mongodb';

class User  {
    constructor(data){
        this.user_email = data.user_email;
        this.user_location = data.user_location;
        this.user_info = data.user_info;
        this.password = data.password;
        this.vehicle_info = [data.vehicle_info];
    };
};

export default User;