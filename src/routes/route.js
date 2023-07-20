import express from 'express';

const router = express.Router();

import {createUser,viewCars,delearshipCars,showDealershipAccToCarid, getAllSoldCars, dealsAcctoCarId, dealsAccToDealership, userLogin} from "../controllers/users.js";
import { createCars } from '../controllers/cars.js';
import { sold_vehicles } from '../controllers/vehicles.js';
import { deals } from '../controllers/deal.js';
import { addCarsToDealership, addDealsToDealership, dealership, dealershipLogin, viewAllCarsDealership, viewDealsByDealership, viewSoldCarsDealership, viewSoldVehiclesDealership } from '../controllers/dealership.js';
import {userAuthentication} from '../middlewares/auth/userAuthentication.js';
import {dealerAuthentication} from '../middlewares/auth/dealerAuthentication.js';
//Post
router.post('/createUser',createUser);
router.post('/cars',createCars);
router.post('/sold/vehicles',sold_vehicles);
router.post('/deals', deals);
router.post('/dealership',dealership);
router.post('/user/login',userLogin);
router.post('/dealership/login',dealershipLogin);

//Get
router.get("/viewcars", userAuthentication, viewCars);
router.get('/view/cars/dealership/:dealerId',userAuthentication,delearshipCars);
router.get('/view/dealership/:carsId',userAuthentication,showDealershipAccToCarid);
router.get("/sold/cars", userAuthentication, getAllSoldCars);
router.get("/deals/:carId", userAuthentication, dealsAcctoCarId);
router.get("/dealswithdealership/:dealerId", userAuthentication,dealsAccToDealership);
router.get("/cars/dealership", dealerAuthentication, viewAllCarsDealership);
router.get('/view/sold/dealercars/:dealerId',dealerAuthentication,viewSoldCarsDealership);
router.get('/dealership/:dealerId/deals', dealerAuthentication,viewDealsByDealership);
router.get('/view/sold/vehicles/:dealerId',dealerAuthentication,viewSoldVehiclesDealership)

//Put
router.put('/add/cars/:carId/dealership/:dealerId',addCarsToDealership);
router.put('/add/deals/:dealsId/dealership/:dealerId',addDealsToDealership);


export default router;