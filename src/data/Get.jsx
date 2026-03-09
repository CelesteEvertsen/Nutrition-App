import axios from 'axios';
import { ApiKey } from './data';
export default async function Get(query){
    try{
const response = await axios.get(
   `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
    {headers: { 'X-Api-Key': ApiKey }}
);
const data = response.data;
console.log(data);
return data;
    }catch(error){
        console.error('Error fetching data:', error);
    }
}
