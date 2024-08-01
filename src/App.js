import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <>
      <h1> Hello , world , again !</h1>
      <SuperButton />
    </>
  );
}
function SuperButton() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <button className="mb-3"> Button without Botstrap</button>
        <Button variant="primary">Button with Botstrap CSS</Button>{" "}
      </div>
    </>
  );
}

export default App;
