import {
  Raleway,
  Work_Sans,
  Poppins,
  Montserrat,
  Source_Code_Pro,
  Inter,
} from "next/font/google";

import "./globals.css";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import styles from "./app.module.scss";
import { CombinedProviders } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

const WorkSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Do.er - E Learning",
  description: "E-Learning app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CombinedProviders>
        <body
          className={`
          ${inter.className} antialiased`}
        >
          <div className={styles.rootLayoutWrapper}>
            <MainHeader />
            <div className={styles.contentWrapper}>{children}</div>
          </div>
        </body>
      </CombinedProviders>
    </html>
  );
}
