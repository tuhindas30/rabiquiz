import { Route, Routes } from "react-router";
import "./assets/css/global.css";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Error404 from "./pages/Error404/Error404";
import Wrapper from "./layout/Wrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper children={<Home />} />} />
      <Route path="/quizzes/:id" element={<Wrapper children={<Quiz />} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
