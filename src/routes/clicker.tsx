import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import "./clicker.css";
import SubmitPass from "components/SubmitPass";

let [clicks, setClicks] = createSignal(0);

function click() {
  setClicks((prev) => prev + 1);
}

function exportSave() {
  // Save the current state to a file
  const data = JSON.stringify({ clicks: clicks() });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clicker-save.json";
  a.click();
}

function importSave() {
  // Load the state from a file
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string);
        setClicks(data.clicks);
      };
      reader.readAsText(file);
    }
  }
  input.click();
}

export default function Clicker() {
  onMount(() => {
    const oldAlert = window.alert;
    window.alert = (...args) => {
      console.log("Alert called");
      oldAlert(...args);
    }
    window.localStorage.setItem("password", "another_password_456");
  });

  return (
    <>
      <main>
        <Title>Clicker</Title>
        <h1>Clicker</h1>
        <p innerHTML={`Clicks: ${clicks()}`}></p>
        <button class="clicker" onClick={click}>Click me!</button>
        <div class="save">
          <button class="export-save" onClick={exportSave}>Export Save</button>
          <button class="import-save" onClick={importSave}>Import Save</button>
        </div>
      </main>
      <SubmitPass />
    </>
  );
}