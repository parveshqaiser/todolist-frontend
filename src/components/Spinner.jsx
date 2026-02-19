

const Spinner = ({ size = 40, color = "#4f46e5" }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="90"
                    strokeDashoffset="60"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.8s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );
};

export default Spinner;
