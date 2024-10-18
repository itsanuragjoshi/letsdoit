import "./globals.css";

export const metadata = {
  title:
    "LetsDoIt - Simple Task Management App for Easy To-Do Lists & Productivity",
  description:
    "Stay organized and boost productivity with LetsDoIt, the easy-to-use task management app. Create, manage, and complete your to-do lists effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
