import "./CircularProgress.scss";

interface CircularProgressProps {
    percentage: number; // 0 - 100
    total?: string; // text mô tả dưới (ví dụ: "0/172 bài học")
    size?: number; // đường kính circle
    strokeWidth?: number;
}

const CircularProgress = ({
    percentage,
    total,
    size = 50,
    strokeWidth = 5,
}: CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="circular-progress">
            <svg width={size} height={size}>
                <circle
                    className="circular-bg"
                    stroke="#ddd"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="circular-bar"
                    stroke="#00c0ff"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="#fff"
                >
                    {percentage}%
                </text>
            </svg>
            {total && <span className="circular-total">{total}</span>}
        </div>
    );
};

export default CircularProgress;
