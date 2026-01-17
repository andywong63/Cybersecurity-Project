import { createSignal, Show } from "solid-js";
import "./SubmitPass.css";
import { b } from "util/stuff";

export default function SubmitPass(props: { c: string[], nextPage?: string }) {
  const [enteredPassword, setEnteredPassword] = createSignal("");
  const [isCorrect, setIsCorrect] = createSignal<boolean | null>(null);

  return (
      <main class="enter-password">
        <h2>Enter Password</h2>
        <input
          classList={{ correct: isCorrect() === true, incorrect: isCorrect() === false }}
          placeholder="Enter the password you found"
          value={enteredPassword()}
          onInput={(e) => {setEnteredPassword(e.target.value)}}
        />
        <button
          class="submit"
          onClick={() => {
            const storedPassword = atob(b(...props.c));
            setIsCorrect(enteredPassword() === storedPassword);
            console.log(isCorrect());
          }}
        >Submit</button>
        <Show when={isCorrect() === true}>
          <div class="success">
            <button
              onClick={() => {
                if (props.nextPage) {
                  window.location.href = props.nextPage;
                }
              }}
            >Next</button>
          </div>
        </Show>
      </main>
  );
}