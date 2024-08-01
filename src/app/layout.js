import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import styles from "./app.module.scss";
import { CombinedProviders } from "./providers";
import MainHeader from "@/components/Common/mainHeader/MainHeader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export const metadata = {
  title: "Do.er - E Learning",
  description: "E-Learning app",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],

  authors: [
    {
      name: "prvnlhr",
      url: "https://www.linkedin.com/in/praveen-lohar-338620208/",
    },
  ],

  icons: [
    { rel: "apple-touch-icon", url: "../../public/icons/apple-icon-180.png" },
    { rel: "icon", url: "../../public/icons/favicon.svg" },
  ],
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0e0e0e" }],
  colorScheme: "dark",
};

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
});

export default function RootLayout({ children, search }) {
  return (
    <html lang="en">
      <CombinedProviders>
        <body
          className={`
          ${satoshi.className} antialiased`}
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
