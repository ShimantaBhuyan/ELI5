import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { Footer } from "../components/Footer";
import { LoaderIcon } from "../components/LoaderIcon";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const explainIt = async () => {
    let promptSearch = searchValue.trim();
    if (!promptSearch.endsWith("?")) {
      promptSearch += "?";
    }

    setIsGenerating(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchValue: promptSearch }),
    });

    if (!response.ok) {
      setIsGenerating(false);
      alert("Something went wrong. Please try again.");
    } else {
      const data = await response.json();
      const { output } = JSON.parse(data);

      setExplanation(output);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen max-w-[100%]">
      <Head>
        <title>ELI5 | Explain like i&apos;m 5</title>
        <meta name="description" content="Explain anything in simple words, like you're 5" />
        <meta name="og:url" content="https://eli5.devkrishna.in/" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="ELI5 | Explain like i'm 5" />
        <meta name="og:description" content="Explain anything in simple words, like you're 5" />
        <meta name="og:image" content="https://ik.imagekit.io/colorContrast/eli5.png" />
        <meta name="og:image:type" content="image/png" />
        <meta name="og:image:width" content="410" />
        <meta name="og:image:height" content="436" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="https://eli5.devkrishna.in/" />
        <meta name="twitter:url" content="https://eli5.devkrishna.in/" />
        <meta name="twitter:title" content="ELI5 | Explain like i'm 5" />
        <meta name="twitter:description" content="Explain anything in simple words, like you're 5" />
        <meta name="twitter:image" content="https://ik.imagekit.io/colorContrast/eli5.png" />
        <meta name="og:image:type" content="image/png" />
        <meta name="og:image:width" content="410" />
        <meta name="og:image:height" content="436" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Short+Stack&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>

      <main
        className={
          "flex flex-1 flex-col items-center px-6 pt-[80px] pb-16 overscroll-none w-[95%] sm:w-[75%] self-center"
        }
      >
        <div className="bgImage flex flex-col justify-center items-center h-[420px] rounded-lg w-full">
          <h1 className="text-5xl sm:text-8xl childish text-center font-bold text-white">explain like i&apos;m 5</h1>
        </div>

        <div className="mb-6 w-full mt-10">
          <label htmlFor="searchPrompt" className="block mb-2 text-md font-medium text-gray-900">
            Explain this to me like I&apos;m 5
          </label>
          <div className="flex justify-center items-center bg-gray-700 rounded-lg px-3 focus:ring-blue-500 focus:border-blue-500">
            <input
              type="text"
              id="searchPrompt"
              className="text-sm rounded-lg block pr-3 py-4 w-full bg-gray-700 border-gray-600 placeholder-gray-300 text-white outline-none"
              placeholder="Black hole or Quantum Mechanics"
              value={searchValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="relative overflow-hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-36 text-sm max-h-[38px] text-center px-5 py-2"
              onClick={explainIt}
            >
              <span className={`z-20 ${isGenerating ? "text-gray-200" : "text-white"}`}>
                {isGenerating ? "Searching" : "Submit"}
              </span>
              {isGenerating ? (
                <div className="-ml-6 -mt-4 absolute z-10 overflow-hidden bg-transparent rounded-lg">
                  <LoaderIcon />
                </div>
              ) : null}
            </button>
          </div>
        </div>

        {explanation != undefined && explanation.length > 0 && !isGenerating ? (
          <div className="w-[100%]">
            <p className="block mb-2 text-md font-medium text-gray-900">Explanation</p>
            <h2 className="w-full mb-6 border border-dashed border-4 rounded-lg px-4 py-8 text-md">{explanation}</h2>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
