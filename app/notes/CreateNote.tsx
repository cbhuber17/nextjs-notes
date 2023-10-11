"use client";

import PocketBase from "pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const url = "https://next-notes.pockethost.io";
const db = new PocketBase(url);

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function create(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    try {
      await db.collection("notes").create({ title, content });
    } catch (error) {
      console.log("Error:", error);
    }

    setContent("");
    setTitle("");

    router.refresh();
  }

  return (
    // @ts-ignore //
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
