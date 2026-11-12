import { redirect } from "next/navigation";

/** Legacy /courses route → Florida Real Estate category (primary published catalog). */
export default function CoursesPage() {
  redirect("/florida-real-estate");
}
