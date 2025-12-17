import { test } from "@db/users";
import { Title } from "@solidjs/meta";

async function serverFormSubmit(e: Event) {
  "use server";
  console.log(e);
  console.log("Form submitted on server");
  try {
    await test();
  } catch (err) {
    console.error("serverFormSubmit error:", err);
  }
}

function formSubmit(e: Event) {
    e.preventDefault();
    console.log(e);
    console.log("Form submitted");
    serverFormSubmit(e);
}

export default function LogIn() {
  return (
    <main>
      <Title>Log In</Title>
      <h1>Log In</h1>
      <form onSubmit={formSubmit}>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Log In</button>
      </form>
    </main>
  );
}
