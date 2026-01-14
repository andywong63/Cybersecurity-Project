import { createSignal, Show } from "solid-js";
import "./HintBox.css";

export default function HintBox(props: { hint: string }) {
  const [showHint, setShowHint] = createSignal(false);

  return (
    <div class="hint-container">
      <button 
        class="hint-button" 
        onClick={() => setShowHint(!showHint())}
      >
        {showHint() ? "Hide Hint" : "Show Hint"}
      </button>
      <Show when={showHint()}>
        <div class="hint-box">
          <p>{props.hint}</p>
        </div>
      </Show>
    </div>
  );
}