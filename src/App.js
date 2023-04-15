import "./App.css";
import Converter from "./components/Converter";
import CurrencyConverter from "./components/CurrencyConverter";
import MoneyExchange from "./components/MoneyExchange";

function App() {
  return (
    <div className="App">
      {/* <Converter /> */}
      {/* <MoneyExchange /> */}
      <CurrencyConverter />
    </div>
  );
}

export default App;
