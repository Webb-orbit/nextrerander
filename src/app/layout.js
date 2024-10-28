"use client"
import MyApp from "./_app";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MyApp>
          {children}
        </MyApp>
      </body>
    </html>
  );
}
