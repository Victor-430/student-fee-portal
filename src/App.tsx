import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { FeeProvider } from "./hooks/useFee.tsx";
import { Toaster } from "sonner";

function App() {
  return (
    <FeeProvider>
      <Toaster />
      <RouterProvider router={router} />
    </FeeProvider>
  );
}

export default App;
