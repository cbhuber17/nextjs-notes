import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import PocketBase from "pocketbase";
import DeleteButton from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

// DB Details
const url = "https://next-notes.pockethost.io";
const db = new PocketBase(url);

async function getNotes() {
  try {
    const res = await db.collection("notes").getFullList({
      sort: "-created",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default async function NotesPage() {
  const notes = await getNotes();

  if (!notes) return;

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes!.map((note) => (
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
    <div className={styles.note}>
      {/* <DeleteButton onClick={() => handleDelete(id)} /> */}
      <DeleteButton />
      <Link href={`/notes/${id}`}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </Link>
    </div>
  );
}

async function handleDelete(id: string) {
  try {
    await db.collection("notes").delete(id);
    console.log(`Deleted ${id}`);
  } catch (error) {
    console.error(error);
  }
}
