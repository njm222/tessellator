"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="errorContainer">
      <h1>Something went wrong!</h1>
      <h4>{error.message}</h4>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
