
import "./globals.css";

export const metadata = {
  title: "NextJam",
  description: "AI-Powered Music Recommendation System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
