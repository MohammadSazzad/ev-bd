import { redirect } from "next/navigation";

// Keep links/bookmarks that include the former English locale prefix working.
export default function EnglishLocalePage() {
  redirect("/");
}
