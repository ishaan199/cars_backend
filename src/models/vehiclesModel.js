import { ObjectId } from "mongodb";


class Sold_vehicles {
    constructor(data){
        this.car_id = data.car_id;
        this.vehicles_info = data.vehicles_info
    };
};

export default Sold_vehicles