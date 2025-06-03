import "./App.css";
import MultiStepForm from "./components/forms/MultiStepForm";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <MultiStepForm />
      <Toaster />
    </>
  );
}

export default App;
