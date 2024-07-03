import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  )
}