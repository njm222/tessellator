export function PlayIcon({ height = "32px", width = "32px" }) {
  return (
    <svg height={height} role="img" width={width} viewBox="0 0 24 24">
      <polygon
        points="21.57 12 5.98 3 5.98 21 21.57 12"
        fill="currentColor"
      ></polygon>
    </svg>
  );
}

export function PauseIcon({ height = "32px", width = "32px" }) {
  return (
    <svg viewBox="-45 0 327 327" width={width} height={height}>
      <path
        fill="currentColor"
        d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
      />
      <path
        fill="currentColor"
        d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0"
      />
    </svg>
  );
}

export function NextIcon({ height = "32px", width = "32px" }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width, height }}>
      <path
        fill="currentColor"
        d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
      ></path>
    </svg>
  );
}

export function PrevIcon({ height = "32px", width = "32px" }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width, height }}>
      <path
        fill="currentColor"
        d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
      ></path>
    </svg>
  );
}
