import { Title } from "@solidjs/meta";
import { createSignal, onMount, Show } from "solid-js";
import "./search.css";
import SubmitPass from "components/SubmitPass";

export default function Search() {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal("");
  const [enteredPassword, setEnteredPassword] = createSignal("");
  const [isCorrect, setIsCorrect] = createSignal<boolean>(false);

  onMount(() => {
    const oldAlert = window.alert;
    window.alert = (...args) => {
      console.log("Alert called");
      oldAlert(...args);
    }
    window.localStorage.setItem("password", "supersecretpassword#123");
  });

  const handleSearch = () => {
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
      </main>
      <SubmitPass nextPage="/clicker" />
    </>
  );
}