import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import "./index.scss"

const LanguageList = () => {
  const [languages] = useState([
    { name: "Java", progress: 100, className: "java-progress", years: 4 },
    { name: "Python", progress: 75, className: "python-progress", years: 3 },
    { name: "HTML/CSS/JS", progress: 75, className: "web-progress", years: 3 },
    { name: "SQL", progress: 37.5, className: "sql-progress", years: 1.5 },
    { name: "C", progress: 25, className: "c-progress", years: 1 },
    { name: "Type Script  ", progress: 30, className: "Type Script  -progress", years: 1.5 },
    { name: "NodeJS ", progress: 30, className: "NodeJS -progress", years: 1.5 },
  ]);

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>
            <span>{language.name}: {`${language.years} years`}</span>
            <ProgressBar progress={language.progress} className={language.className} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
