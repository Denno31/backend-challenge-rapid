import { Router } from 'express';
import { getTripDetails, searchTrips } from '../controllers/tripController';


const router: Router = Router();

router.get('/search', searchTrips);
router.get('/:id', getTripDetails);

export default router;
