
import { GiVanillaFlower } from "react-icons/gi";
import './index.css'
import NutritionFact from "./component/NutritionFact";
function App() {

  return (
    <>
      <GiVanillaFlower className='vanilla' />
    <div className="app">
      <NutritionFact/>
     {/*  <span className='first'></span>
      <span className='second'></span>
      <span className='third'></span>
      <span className='fourth'></span>
      <span className='fifth'></span>
      <span className='sixth'></span> */}
    </div>
   
    </>
  )
}

export default App
