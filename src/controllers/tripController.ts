import { Request, Response } from 'express';
import { filterTrips, findTripById } from '../services/tripService';


export const searchTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword = '', includeCanceled = false, distance, time } = req.query;
    const filteredTrips = await filterTrips(
      keyword as string, 
      includeCanceled === 'true', 
      distance as string | undefined, 
      time as string | undefined
    );
    res.json(filteredTrips);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

export const getTripDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const tripId: string = req.params.id;
    const trip = await findTripById(tripId);
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching trip details', error: err.message });
  }
};
