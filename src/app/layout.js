import { Inter } from "next/font/google";

import "./globals.css";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import styles from "./app.module.scss";
import { CombinedProviders } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Do.er - E Learning",
  description: "E-Learning app",
};

export default function RootLayout({ children, search }) {
  return (
    <html lang="en">
      <CombinedProviders>
        <body
          className={`
          ${inter.className} antialiased`}
        >
          <div className={styles.rootLayoutWrapper}>
            <MainHeader />
            <div className={styles.contentWrapper}>
              {search}
              {children}
            </div>
          </div>
        </body>
      </CombinedProviders>
    </html>
  );
}
