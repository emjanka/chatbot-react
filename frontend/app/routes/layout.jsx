import { Outlet, useLoaderData } from "react-router";
import Sidebar from "../components/Sidebar";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function clientLoader() {
  const url = `${supabaseUrl}/rest/v1/threads?select=*&order=created_at.desc`;

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load threads");
  }

  const threads = await response.json();
  return { threads };
}

export default function Layout() {
  const { threads } = useLoaderData();

  function deleteThread(id) {
    // Deleting for real is the optional "Going further" step
    console.log("Delete thread (not saved yet):", id);
  }

  return (
    <div className="app-layout">
      <Sidebar threads={threads} onDeleteThread={deleteThread} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}