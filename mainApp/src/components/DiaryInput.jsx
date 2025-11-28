import { useEffect, useState } from "react";
import router from "../router/router";
import "../styles/User/Diary.css"

export default function DiaryInput({setEntry,entry}) {

  useEffect(() => {
    if (localStorage.getItem("userType") === "consultant") {
      router.navigate("/home");
    }
  }, []);
  
  return (
    <textarea
      required
      placeholder="Escribe tu entrada aquí..."
      value={entry}
      title="Escribe cómo fue tu día (obligatorio)"
      onChange={(e) => setEntry(e.target.value)}
      className="diary-textarea"
    />
  );
}