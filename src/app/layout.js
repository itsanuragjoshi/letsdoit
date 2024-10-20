import SearchBar from "@app/components/SearchBar";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title:
    "LetsDoIt - Simple Task Management App for Easy To-Do Lists & Productivity",
  description:
    "Stay organized and boost productivity with LetsDoIt, the easy-to-use task management app. Create, manage, and complete your to-do lists effortlessly.",
};

const currentYear = new Date().getFullYear();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 p-3 h-[100vh] w-[100vw] box-border flex flex-col gap-3">
        <header className="bg-white border border-gray-600 rounded-md flex justify-between px-3 py-5 gap-4 items-center">
          <Link href="/">
            <h1 className="text-3xl uppercase cursor-pointer">LetsDoIt</h1>
          </Link>
          <SearchBar />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <pre>
            <span>LetsDoIt © {currentYear}, </span>
            <span>Developed with ❤️ by </span>
            <a
              href="https://github.com/itsanuragjoshi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anurag Joshi
            </a>
          </pre>
        </footer>
      </body>
    </html>
  );
}
