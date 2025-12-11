import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { FeeProvider } from "./hooks/useFee.tsx";

function App() {
  return (
    <FeeProvider>
      <RouterProvider router={router} />
    </FeeProvider>
  );
}

export default App;
