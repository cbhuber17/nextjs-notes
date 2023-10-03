import styles from "../Notes.module.css";
import PocketBase from "pocketbase";

async function getNote(noteId: string) {
  const url = "https://next-notes.pockethost.io";
  const db = new PocketBase(url);
  const res = await db.collection("notes").getOne(noteId);
  return res;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
