import { ObjectId } from "mongodb";

class dealership {
    constructor(data){
        this.dealership_email = data.dealership_email;
        this.dealership_name = data.dealership_name;
        this.dealership_location = data.dealership_location;
        this.dealer_password = data.dealership_password;
        this.dealership_info = data.dealership_info;
        this.cars = data.cars;
        this.deals = data.deals;
        this.sold_vehicles = data.sold_vehicles;
    };
};

export default dealership;


// {
//  location : data.dealership_location,
//  offers : data.dealership_offers
// };