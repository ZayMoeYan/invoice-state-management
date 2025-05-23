import type { Metadata } from "next";
import {redirect} from "next/navigation";

export default function IndexPage() {
  redirect('/invoices');
}

// export const metadata: Metadata = {
//   title: "Redux Toolkit",
// };
