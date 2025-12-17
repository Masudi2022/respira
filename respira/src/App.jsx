import { RespiraHeader, RespiraFooter } from "./components/lrespira_layout"; 
import Maskani from "./Virtue/Pages/Home/maskani";
import './App.css';

function App() {
  return (
    <>
      <RespiraHeader />
     <Maskani />
      {/* other sections */}
      <RespiraFooter />
    </>
  );
}
export default App;