import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className={"px-10 py-10 w-full mx-auto sticky top-[100vh] left-0 shadow-md"}>
      <div className="text-gray-900 text-center">
        <p>
          Made by{" "}
          <Link href="https://www.devkrishna.in" target="_blank" rel="noopener noreferrer" className="underline">
            DevKrishna
          </Link>
        </p>
      </div>
    </footer>
  );
};
