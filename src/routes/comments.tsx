import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";
import fs from "node:fs";

function getComments() {
    "use server"
    if (!fs.existsSync("comments.json")) {
        return [];
    }
    const data = fs.readFileSync("comments.json", "utf-8");
    return JSON.parse(data);
}
function addComment(comment: string) {
    "use server"
    const comments = getComments();
    comments.push(comment);
    fs.writeFileSync("comments.json", JSON.stringify(comments));
}

export default function Home() {
  const [comments, { refetch }] = createResource(getComments);

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      {/* comments */}
      <div>
        <h2>Comments</h2>
        <ul>
          {comments()?.map((comment: string) => (
            <li innerHTML={comment}></li>
          ))}
        </ul>
      </div>
      <button onClick={async () => {addComment("Test comment"); refetch();}}>Test</button>
      <button onClick={async () => {addComment("<b>test</b>"); refetch();}}>Unescaped HTML</button>
      <button onClick={async () => {addComment("<script>alert('XSS')</script>"); refetch();}}>XSS</button>
    </main>
  );
}
