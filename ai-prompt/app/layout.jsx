import "@/styles/globals.css";
import { Children } from "react";

export const metadata = {
    title: "promptai",
    description: "discover and share ai prompt"
}

const RootLayout = () => {
  return (
    <html lang="en">
      <body>
        <div className="main">
            <div className="gradient"></div>
        </div>
        <main className="app">
            {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
