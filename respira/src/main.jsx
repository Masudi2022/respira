import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

import heroEN from "./i18n/en/translation.json";
import heroIT from "./i18n/it/translation.json"; // ✅ FIXED

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: heroEN
      },
      it: {
        translation: heroIT
      }
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
