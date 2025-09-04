/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import FileStats from "./file-stats";

export default function FileDashboard() {
  return (
    <div className="mt-2 @container">
      <FileStats className="mb-5 2xl:mb-8" />
    </div>
  );
}
