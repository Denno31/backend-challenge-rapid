import axios from 'axios';

// Define the trip data interface
interface Trip {
  id: string;
  status: string;
  pickupLocation: string;
  dropoffLocation: string;
  startTime: string;
  finalCost: number;
  driverName: string;
  [key: string]: any; // For extra fields like car details
}

const getTripsData = async (): Promise<Trip[]> => {
  const url = 'https://rapidtechinsights.github.io/hr-assignment/recent.json';
  const response = await axios.get(url);
  return response.data;
};

// Filter trips based on the search criteria
export const filterTrips = async (
  keyword: string, 
  includeCanceled: boolean, 
  distance?: string, 
  time?: string
): Promise<Trip[]> => {
  const trips = await getTripsData();

  return trips.filter((trip: Trip) => {
    const matchKeyword = keyword
      ? Object.values(trip).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase()))
      : true;

    const matchStatus = includeCanceled ? true : trip.status === 'COMPLETE';

    return matchKeyword && matchStatus;
  });
};

export const findTripById = async (id: string): Promise<Trip | undefined> => {
  const trips = await getTripsData();
  return trips.find(trip => trip.id === id);
};
