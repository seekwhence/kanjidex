/*global chrome*/
import React, { useEffect, useState } from "react";
import { search } from "../helpers/search";
import SearchForm from "./SearchForm";
import Loader from "./layout/Loader";
import DisplayKanji from "./kanji/DisplayKanji";
import DisplayPhrase from "./phrase/DisplayPhrase";
import KawaiiCat from "./KawaiiCat";

const Home = () => {
  const [kanji, setKanji] = useState([]);
  const [phrase, setPhrase] = useState([]);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("kanji");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mood, setMood] = useState("happy");
  const isOnline = navigator.onLine;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      search(
        queryType,
        setError,
        setMood,
        setLoading,
        setKanji,
        setPhrase,
        query
      );
    } else {
      setError("Sorry, but you haven't entered anything!");
    }
  };
  const handleQueryType = (value) => {
    setQueryType(value);
    setError("");
  };
  const deleteKanji = (item) => {
    setKanji(kanji.filter((kanji) => kanji.kanji.query !== item));
  };
  useEffect(() => {}, [kanji, phrase, error]);

  // chrome specific
  // when user selects text upon browser action
  // immediately start search for the selection
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", (e) => {
      chrome.tabs.executeScript(
        {
          code: "window.getSelection().toString();",
        },
        function (selection) {
          const selectedText = selection[0];
          if (selectedText) {
            const input = document.getElementById("main-search");
            input.setAttribute("value", selectedText);
            input.focus();
            search(
              queryType,
              setError,
              setMood,
              setLoading,
              setKanji,
              setPhrase,
              selectedText
            );
          }
        }
      );
    });
  }

  return isOnline ? (
    <div className="column is-half is-offset-one-quarter">
      <SearchForm
        query={query}
        setQuery={setQuery}
        setMood={setMood}
        queryType={queryType}
        handleSubmit={handleSubmit}
        handleQueryType={handleQueryType}
      />
      {loading && <Loader />}
      {!loading && queryType === "kanji" && (
        <DisplayKanji
          kanji={kanji}
          setKanji={setKanji}
          deleteKanji={deleteKanji}
          queryType={queryType}
          mood={mood}
          error={error}
        />
      )}
      {!loading && queryType === "phrase" && (
        <DisplayPhrase
          phrase={phrase}
          mood={mood}
          setMood={setMood}
          error={error}
          setPhrase={setPhrase}
        />
      )}
      {!loading && queryType === "english" && (
        <DisplayKanji
          kanji={kanji}
          setKanji={setKanji}
          deleteKanji={deleteKanji}
          queryType={queryType}
          mood={mood}
          error={error}
        />
      )}
    </div>
  ) : (
    <div
      className="column is-half is-offset-one-quarter"
      style={{ textAlign: "center" }}
    >
      <KawaiiCat mood="happy" />
      <h2 className="title is-5">Sorry, you're currently offline.</h2>
      <p>You need to be online to be able to search.</p>
      <p>
        You can still check your vocabulary on{" "}
        <a
          target="_blank"
          className="vocab-icon"
          href="./index.html#/kanjidex/vocabulary"
        >
          this link
        </a>{" "}
        as well as get{" "}
        <a
          target="_blank"
          className="vocab-icon"
          href="./index.html#/kanjidex/help"
        >
          help on this link
        </a>
        .
      </p>
    </div>
  );
};

export default Home;
