import "./App.css";
import { AngleQuestion } from "./components/AngleQuestion";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider>
      <AngleQuestion />
    </Provider>
  );
}

export default App;
