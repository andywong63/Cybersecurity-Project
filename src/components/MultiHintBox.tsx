import { createSignal, For, Show } from "solid-js";
import "./HintBox.css";

export default function MultiHintBox(props: { hints: string[] }) {
  const [revealedHints, setRevealedHints] = createSignal(0);
  const [showHintCooldown, setShowHintCooldown] = createSignal(false);

  const showNextHint = () => {
    if (showHintCooldown()) {
      return;
    }
    if (revealedHints() < props.hints.length) {
      setRevealedHints(revealedHints() + 1);
      setShowHintCooldown(true);
      setTimeout(() => {
        setShowHintCooldown(false);
      }, 10000);
    }
  };

  const showHintText = () => {
    if (revealedHints() === 0) {
      return "Show Hint";
    } else if (revealedHints() < props.hints.length - 1) {
      return "Show Next Hint";
    } else {
      return "Show Solution";
    }
  };

  return (
    <div class="hint-container">
      <Show when={revealedHints() < props.hints.length}>
        <button
          class="hint-button"
          classList={{ "show-solution": revealedHints() === props.hints.length - 1 }}
          onClick={showNextHint}
          disabled={showHintCooldown()}
        >
          {showHintText()}
        </button>
      </Show>
      
      <For each={props.hints.slice(0, revealedHints())}>
        {(hint, index) => (
          <div 
            class="hint-box" 
            classList={{ "hint-solution": index() === props.hints.length - 1 }}
          >
            <strong>Hint {index() + 1}:</strong> <span innerHTML={hint}></span>
          </div>
        )}
      </For>
    </div>
  );
}