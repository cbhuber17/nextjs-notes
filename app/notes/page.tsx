import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import PocketBase from "pocketbase";

async function getNotes() {
  const url = "https://next-notes.pockethost.io";
  const db = new PocketBase(url);
  const res = await db.collection("notes").getFullList({
    sort: "-created",
  });
  return res;
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes.map((note) => (
          <Note key={note.id} note={note}></Note>
        ))}
      </div>

      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
