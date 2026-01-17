import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import SubmitPass from "components/SubmitPass";
import "./url_preview.css";
import MultiHintBox from "components/MultiHintBox";
import { a, c } from "util/stuff";

let p1 = "WMPoOM'bBN";
let p2 = "^Y)D)X)";
let p3 = "@aN(<_Op;oCoC`";

export default function IframePage() {
  const [url, setUrl] = createSignal("");
  const [iframeUrl, setIframeUrl] = createSignal("");

  onMount(() => {
    const oldAlert = window.alert;
    window.alert = (...args) => {
      a();
      console.log("Alert called");
      oldAlert(...args);
    }
  });

  const handleLoadUrl = () => {
    c(url(), p1, p2, p3);
    setIframeUrl(url());
  };

  return (
    <>
      <main>
        <Title>URL Loader</Title>
        <h1>URL Loader</h1>
        <p>Enter a URL to preview below:</p>
        <input
          type="text"
          value={url()}
          onInput={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: "80%" }}
        />
        <button onClick={handleLoadUrl}>Load URL</button>
        
        <div style={{ "margin-top": "20px" }}>
          <iframe 
            src={iframeUrl()} 
            style={{ 
              width: "100%", 
              height: "400px", 
              border: "2px solid #333" 
            }}
            title="URL Preview"
          />
        </div>
        
        <MultiHintBox hints={[
          'There is a special URL protocol, besides for <code>http://</code> or <code>https://</code>, that allows execution of JavaScript code directly.',
          'Try using the <code><a href="https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript" target="_blank">javascript:</a></code> protocol instead of <code>http://</code>',
          'Solution: <code>javascript:alert(localStorage.getItem(\'password\'))</code>'
        ]} />
      </main>
      <SubmitPass nextPage="/gallery" c={[p1, p2, p3]} />
    </>
  );
}

p1 += "8";