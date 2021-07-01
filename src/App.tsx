import { Route, Routes } from "react-router";
import "./assets/css/global.css";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Error404 from "./pages/Error404/Error404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes/:id" element={<Quiz />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
