import "./globals.css";

import React from "react";
import { Assistant } from "next/font/google";

import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Main from "@/components/main";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--assistant-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | קמפוס גורו",
    default: "קמפוס גורו",
    absolute: "עמוד הבית | קמפוס גורו",
  },
  description:
    "אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה! אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה! אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. ",
};

// function Main({
//   children,
//   modal,
// }: Record<"children" | "modal", React.ReactNode>) {
//   const [loadingAuth, setLoadingAuth] = useState(true);

//   useEffect(() => {
//     const fetchToken = async () => {
//       let Token = null;
//       try {
//         Token = await localStorage.getItem("campus-guro-jwt");
//       } catch (e) {
//         console.log("Error Fetching jwt Token");
//         setLoadingAuth(false);
//       }

//       if (Token != null) {

//       } else {
//         setLoadingAuth(false);
//       }
//     };
//   }, []);
// }

export default function RootLayout({
  children,
  modal,
  params: { lng } = { lng: "he" },
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { lng: string };
}) {
  // const { i18n } = useTranslation();
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${assistant.variable} font-sans `}>
        <Toaster
          position={"top-right"}
          toastOptions={{
            style: {
              margin: "15px",
              background: "#828282",
              color: "#fff",
              width: "340px",
            },
            className: "text-base",
            duration: 3000,
          }}
        />
        <Main>
          <Header />
          {children}
        </Main>
        <Footer />

        {modal && modal}
      </body>
    </html>
  );
}
