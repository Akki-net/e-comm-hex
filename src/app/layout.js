import AuthProvider from "@/components/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

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