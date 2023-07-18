import express from 'express';

const router = express.Router();

import {createUser,viewCars} from "../controllers/users.js";
import { createCars } from '../controllers/cars.js';
import { sold_vehicles } from '../controllers/vehicles.js';
import { deals } from '../controllers/deal.js';
import { dealership } from '../controllers/dealership.js';

router.post('/createUser',createUser);
router.post('/cars',createCars);
router.post('/sold/vehicles',sold_vehicles);
router.post('/deals', deals);
router.post('/dealership',dealership);

router.get('/viewcars',viewCars);


export default router;