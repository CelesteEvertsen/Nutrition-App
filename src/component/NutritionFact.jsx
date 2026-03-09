import Get from "../data/Get";
import "./NutritionFact.css";
import { useEffect, useState } from "react";
import search_icon from "../assets/search.png";

export default function NutritionFact() {

  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState('apple')

  const fetchNutrition = async (q = query) => {
    try {
      const data = await Get(q);
      setNutritionData(data);
      setError("");
    } catch {
      setError("Error");
    }
  };
  useEffect(() => {
    fetchNutrition('apple');
  }, []);

  const firstItem = nutritionData?.items[0];
  return (
    <div className="nutrition">
      <div className="searchbar">
        <input type="text" placeholder="Search item" value={query}
         onChange={(e)=>setQuery(e.target.value)}  onKeyDown={(e)=>{if(e.key === 'Enter')fetchNutrition(query)}}/>
        <img onClick={() => fetchNutrition(query)} src={search_icon} alt="Search" />
      </div>

      <div className="nutrition-fact">
        {error && <p className="error">{error}</p>}
        <h2 className="food-item">Nutrition Fact : {firstItem?.name?.[0]?.toUpperCase() + firstItem?.name?.slice(1) || '-'}</h2>

        <div className="container">
          <div className="col">
            <span>Energy</span>
            <p>Calories: {firstItem?.calories ?? "-"} kcal</p>
            <p>Serving size: {firstItem?.serving_size_g ?? "-"}g</p>
          </div>

          <div className="col">
            <span>Macros</span>
            <p>Protein: {firstItem?.protein_g ?? "-"}g</p>
            <p>Carbohydrates: {firstItem?.carbohydrates_total_g ?? "-"}g</p>
            <p>Fat: {firstItem?.fat_total_g ?? "-"}g</p>
            <p>Fiber: {firstItem?.fiber_g ?? "-"}g</p>
          </div>
          <div className="col">
            <span>Micro</span>
            <p>Potassium: {firstItem?.potassium_mg ?? "-"}mg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
