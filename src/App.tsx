import "./App.css";
import { Provider } from "./components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Question } from "./pages/question";
import { Home } from "./pages/home";

function App() {
  return (
    <BrowserRouter basename="/PAT-Practice"> 
      <Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:type" element={<Question/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
