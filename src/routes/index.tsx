import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main>
      <Title>DOM-Based XSS</Title>
      <h1>DOM-Based XSS</h1>
      <p>If you are here for the hands-on activities, please click <a href="/search">here</a>.</p>
    </main>
  );
}
