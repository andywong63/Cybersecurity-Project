import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import "./clicker.css";
import SubmitPass from "components/SubmitPass";
import MultiHintBox from "components/MultiHintBox";
import { a, c } from "util/stuff";

let p1 = "OM+lZ=^bY";
let p2 = "b/mONDpZ";
let p3 = "(/oP<.&DJO3";

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
        c(data.clicks, p1, p2, p3);
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
      a();
      console.log("Alert called");
      oldAlert(...args);
    }
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

        <MultiHintBox hints={[
          "The click counter is dynamically displayed using innerHTML.",
          "Can you control what gets displayed in the counter?",
          'Try importing a malicious save file with an XSS payload. The <code>&lt;img&gt;</code> tag with <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#image_loading_errors" target="_blank">onerror</a> works well here.',
          'Solution: Create a JSON file with <code>{"clicks":"&lt;img src=x onerror=\'alert(localStorage.getItem(\\"password\\"))\' &gt;"}</code>, and import it.'
        ]} />
      </main>
      <SubmitPass nextPage="/url_preview" c={[p1, p2, p3]} />
    </>
  );
}