import Get from "../data/Get";
import "./NutritionFact.css";
import { useCallback, useEffect, useState } from "react";
import search_icon from "../assets/search.png";

export default function NutritionFact() {

  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState('apple')

  const fetchNutrition = useCallback(async (q) => {
    try {
      const data = await Get(q);
      setNutritionData(data);
      setError("");
    } catch {
      setError("Error");
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    Get("apple")
      .then((data) => {
        if (!isCancelled) {
          setNutritionData(data);
          setError("");
        }
      })
      .catch(() => {
        if (!isCancelled) setError("Error");
      });

    return () => {
      isCancelled = true;
    };
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
            <p>Calories: {Math.floor(firstItem?.calories ?? 0)} kcal</p>
            <p>Serving size: {Math.floor(firstItem?.serving_size_g ?? 0)}g</p>
          </div>

          <div className="col">
            <span>Macros</span>
            <p>Protein: {Math.floor(firstItem?.protein_g ?? 0)}g</p>
            <p>Carbohydrates: {Math.floor(firstItem?.carbohydrates_total_g ?? 0)}g</p>
            <p>Fat: {Math.floor(firstItem?.fat_total_g ?? 0)}g</p>
            <p>Fiber: {Math.floor(firstItem?.fiber_g ?? 0)}g</p>
          </div>
          <div className="col">
            <span>Micro</span>
            <p>Potassium: {Math.floor(firstItem?.potassium_mg ?? 0)}mg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
