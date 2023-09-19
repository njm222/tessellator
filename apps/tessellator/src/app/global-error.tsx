"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to sentry
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <h4>{error.message}</h4>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
