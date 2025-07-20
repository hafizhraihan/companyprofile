import "./globals.css";

export const metadata = {
  title: "Company Profile",
  description: "This is a company profile website mockup",
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
