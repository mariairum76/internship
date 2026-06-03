import { useState } from "react";

import Navbar from "../components/Navbar";

import useAuthStore from "../store/authStore";

import { useProfile } from "../hooks/useProfile";

import { useAddNote } from "../hooks/useAddNote";

import {
  useQueryClient,
} from "@tanstack/react-query";

function Dashboard() {

  const token =
    useAuthStore(
      (state) =>
        state.accessToken
    );

  const {
    data,
    isLoading,
  } = useProfile(token);

  const [note, setNote] =
    useState("");

  const addNote =
    useAddNote();

  const queryClient =
    useQueryClient();

  const notes =
    queryClient.getQueryData([
      "notes",
    ]) || [];

  if (isLoading)
    return <h2>Loading...</h2>;

  return (
  <div
    style={{
      padding: "30px",
      maxWidth: "900px",
      margin: "auto",
    }}
  >
    <Navbar />

    <h1>Dashboard</h1>

    <div
      style={{
        background: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>User Profile</h3>

      <pre>
        {JSON.stringify(
          data,
          null,
          2
        )}
      </pre>
    </div>

    <br />

    <div
      style={{
        background: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Add Note</h3>

      <input
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        placeholder="Enter note"
        style={{
          padding: "10px",
          width: "70%",
        }}
      />

      <button
        onClick={() =>
          addNote.mutate(note)
        }
        style={{
          padding: "10px",
          marginLeft: "10px",
        }}
      >
        Add Note
      </button>

      <h3>Notes</h3>

      {notes.map((n, i) => (
        <p key={i}>{n}</p>
      ))}
    </div>
  </div>
);
}

export default Dashboard;