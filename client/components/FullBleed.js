// components/FullBleed.jsx
export default function FullBleed({ className = "", children }) {
  return (
    <div
      className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${className}`}
    >
      {children}
    </div>
  );
}
