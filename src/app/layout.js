import { Raleway, Work_Sans, Poppins, Montserrat } from "next/font/google";

import "./globals.css";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import styles from "./app.module.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Do.er - E Learning",
  description: "E-Learning app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className={styles.rootLayoutWrapper}>
          <MainHeader />
          <div className={styles.contentWrapper}>{children}</div>
        </div>
      </body>
    </html>
  );
}
