import { Title } from "@solidjs/meta";
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

export default async function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      {/* comments */}
      <div>
        <h2>Comments</h2>
        <ul>
          {getComments().map((comment: string) => (
            <li>{comment}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
