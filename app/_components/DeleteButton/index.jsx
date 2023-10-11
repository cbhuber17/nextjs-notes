"use client";
import styles from "./DeleteButton.module.css";

// function DeleteButton({ onClick }) {
function DeleteButton() {
  return (
    <button
      className={styles.closebutton}
      title="Delete (currently not functional)"
    >
      X
    </button>
  );
}

export default DeleteButton;
