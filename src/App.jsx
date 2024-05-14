import { Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {

  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
