import React from "react";
import { Dropdown } from "react-bootstrap";
import { Globe } from "react-bootstrap-icons";

export default function LanguageDropdown() {
  const languages = {
    English: "en",
    Italian: "it",
    French: "fr",
    Spanish: "es",
    German: "de",
    Arabic: "ar",
  };

  const handleLanguageSelect = (lang) => {
    const googleFrame = document.querySelector("iframe.goog-te-menu-frame");
    if (!googleFrame) return;

    const innerDoc = googleFrame.contentDocument || googleFrame.contentWindow.document;
    const langElements = innerDoc.querySelectorAll(".goog-te-menu2-item span.text");

    langElements.forEach((el) => {
      if (el.innerHTML.toLowerCase().indexOf(lang.toLowerCase()) > -1) {
        el.click();
      }
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-light"
        style={{
          borderRadius: "30px",
          border: "1px solid #2FB6A6",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 500
        }}
      >
        <Globe size={18} /> Language
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(languages).map((label) => (
          <Dropdown.Item
            key={label}
            onClick={() => handleLanguageSelect(languages[label])}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
