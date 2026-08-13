import "./OceanLoader.css";

interface OceanLoaderProps {
  label?: string;
}

export const OceanLoader = ({ label = "Loading articles" }: OceanLoaderProps) => {
  return (
    <div className="ocean-loader" role="status" aria-label={label}>
      <svg
        className="ocean-loader-anchor"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v13" />
        <path d="M7 13a5 5 0 0 0 10 0" />
        <path d="M5 13H2" />
        <path d="M22 13h-3" />
      </svg>

      <p className="ocean-loader-text">
        {label}
        <span className="ocean-loader-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
};
