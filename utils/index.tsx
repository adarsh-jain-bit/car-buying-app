import { FilterProps , CarProps } from "@/types";


export async function fetchCars( filters : FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
  
    // Set the required headers for the API request
    const url =   `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b30d67755fmsh51942e87b98c245p166965jsn2320103c8ec8',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result
    } catch (error) {
      console.error(error);
    }
  }

  export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };
  
  export const  generateCarImageUrl = async () => {
    const query = 'car';
    let accesskey = process.env.NEXT_PUBLIC_ACCESSTOKEN;
    // console.log(accesskey)
    const url = `https://api.unsplash.com/photos/random?query=car&client_id=${accesskey}`;

    try {
        const response = await fetch(url);  
        if (response.ok) {
            const data = await response.json();
            // console.log(data)
            const imageUrl = data.urls.regular;
            return imageUrl;
        } else {
            throw new Error('Failed to retrieve images: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  } 


  
  