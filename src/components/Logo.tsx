export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 266.82 266.82"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <polygon points="214.7 0 193.44 21.26 172.18 42.52 42.51 42.52 42.51 172.19 21.26 193.44 0 214.7 0 0 214.7 0" />
      <polygon points="266.82 52.11 266.82 266.82 52.11 266.82 94.63 224.3 224.3 224.3 224.3 94.63 266.82 52.11" />
      <polygon points="266.82 0 266.82 30.06 245.56 51.32 72.58 224.3 51.32 245.56 30.06 266.82 0 266.82 0 236.75 236.75 0 266.82 0" />
    </svg>
  );
}
