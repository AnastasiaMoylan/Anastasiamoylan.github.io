import { BrowserRouter } from "react-router";
import ReactGA from "react-ga4";
import AppRouter from "./router";

ReactGA.initialize("G-BMTYE03CNZ");

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
