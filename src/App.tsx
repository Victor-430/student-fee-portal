import { RouterProvider } from "react-router";
import router from "./components/routes/index.tsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
