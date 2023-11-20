import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DrfApiFetch from "./components/DrfApiFetch";

function App() {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
        <DrfApiFetch />
      </div>
    </>
  );
}

export default App;
