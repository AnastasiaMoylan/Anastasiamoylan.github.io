import ReactGA from "react-ga4";
import AppRouter from "./router";

if (typeof window !== "undefined") {
  ReactGA.initialize("G-7CVPZRVJQ5");
}

export default function App() {
  return <AppRouter />;
}
