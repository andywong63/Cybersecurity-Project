import { Title } from "@solidjs/meta";
import { createSignal, onMount, Show } from "solid-js";
import MultiHintBox from "components/MultiHintBox";
import SubmitPass from "components/SubmitPass";

export default function Gallery() {
  const [imageUrl, setImageUrl] = createSignal("");
  const [imageHtml, setImageHtml] = createSignal("");

  onMount(() => {
    const oldAlert = window.alert;
    window.alert = (...args) => {
      console.log("Alert called");
      oldAlert(...args);
    }
    window.localStorage.setItem("password", "final.secret_password@completed");
  });

  const handleAddImage = () => {
    setImageHtml(`<img src="${imageUrl()}" alt="User image" style="max-width: 400px; margin-top: 20px;" />`);
  };

  return (
    <>
      <main>
        <Title>Image Gallery</Title>
        <h1>Image Gallery</h1>
        <p>Enter an image URL to preview it:</p>
        
        <input
          type="text"
          value={imageUrl()}
          onInput={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          style={{ width: "80%" }}
        />
        <button onClick={handleAddImage}>Load</button>

        <Show when={imageHtml() !== ""}>
          <div class="image-preview" innerHTML={imageHtml()}></div>
        </Show>

        <MultiHintBox hints={[
          "The image URL is placed directly into the <code>src</code> attribute of an <code>&lt;img&gt;</code> tag.",
          'What happens if you close the <code>src</code> attribute with a quote (<code>"</code>) and add another attribute?',
          'Like the previous examples, <code><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#image_loading_errors" target="_blank">onerror</a></code> can be added as an attribute.',
          'Break out of the <code>src</code> attribute and add an <code>onerror</code> attribute to execute JavaScript.',
          'Solution: <code>" onerror="alert(localStorage.getItem(\'password\'))</code>'
        ]} />
      </main>
      <SubmitPass nextPage="/" />
    </>
  );
}