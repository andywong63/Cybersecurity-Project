import { Title } from "@solidjs/meta";
import { createSignal, onMount, Show } from "solid-js";
import "./search.css";
import SubmitPass from "components/SubmitPass";
import MultiHintBox from "components/MultiHintBox";
import { a, c } from "util/stuff";

let p1 = "Y)LmPN@";
let p2 = "PMD";
let p3 = "oPNHmONDpZ";
let p4 = "(/oP9CnC`C3";

export default function Search() {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal("");

  onMount(() => {
    const oldAlert = window.alert;
    window.alert = (...args) => {
      a();
      console.log("Alert called");
      oldAlert(...args);
    }
  });

  const handleSearch = () => {
    c(query(), p1, p2, p3, p4);
    setResults(query());
  };

  return (
    <>
      <main class="clicker-app">
        <Title>Search</Title>
        <h1>Search</h1>
        <input
          type="text"
          value={query()}
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Enter search query" />
        <button class="search" onClick={handleSearch}>Search</button>
        <Show when={results() !== ""}>
          <p class="no-results" innerHTML={`No results found for ${results()}`}></p>
        </Show>

        <MultiHintBox hints={[
          "The search results are displayed using innerHTML",
          'Try using an &lt;img&gt; tag with an <code>onerror</code> attribute. Learn more about <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#image_loading_errors" target="_blank">image loading errors</a>.',
          'You can access localStorage using <code>localStorage.getItem(\'password\')</code>',
          'Solution: <code>&lt;img src=x onerror="alert(localStorage.getItem(\'password\'))"&gt;</code>'
        ]} />
      </main>
      <SubmitPass nextPage="/clicker" c={[p1, p2, p3, p4]} />
    </>
  );
}

p2 = p2.slice(0, 1).toLowerCase() + p2