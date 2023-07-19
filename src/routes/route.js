import express from 'express';

const router = express.Router();

import {createUser,viewCars,delearshipCars,showDealershipAccToCarid, getAllSoldCars, dealsAcctoCarId, dealsAccToDealership} from "../controllers/users.js";
import { createCars } from '../controllers/cars.js';
import { sold_vehicles } from '../controllers/vehicles.js';
import { deals } from '../controllers/deal.js';
import { addCarsToDealership, dealership, viewAllCarsDealership, viewDealsByDealership, viewSoldCarsDealership } from '../controllers/dealership.js';

//Post
router.post('/createUser',createUser);
router.post('/cars',createCars);
router.post('/sold/vehicles',sold_vehicles);
router.post('/deals', deals);
router.post('/dealership',dealership);

//Get
router.get('/viewcars',viewCars);
router.get('/view/cars/dealership/:dealerId',delearshipCars);
router.get('/view/dealership/:carsId',showDealershipAccToCarid);
router.get('/sold/cars',getAllSoldCars);
router.get('/deals/:carId', dealsAcctoCarId);
router.get("/dealswithdealership/:dealerId", dealsAccToDealership);
router.get('/cars/dealership',viewAllCarsDealership);
router.get('/view/sold/dealercars/:dealerId',viewSoldCarsDealership);
router.get('/dealership/:dealerId/deals', viewDealsByDealership);


//Put
router.put('/add/cars/:carId/dealership/:dealerId',addCarsToDealership);


//Delete



export default router;