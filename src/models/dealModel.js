import { ObjectId } from "mongodb";

class Deals {
    constructor(data){
        this.car_id = data.car_id ? ObjectId(data.car_id) : undefined
        this.deal_info = data.deal_info;
    };
};

export default Deals;