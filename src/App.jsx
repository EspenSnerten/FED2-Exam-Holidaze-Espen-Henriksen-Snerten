import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { Fade } from "react-awesome-reveal";

function App() {
  return (
    <>
      <Fade>
        <main>
          <Outlet />
        </main>
      </Fade>
    </>
  );
}

export default App;