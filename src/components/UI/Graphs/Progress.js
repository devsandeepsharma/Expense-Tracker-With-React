import "./progress.css";

const Progress = ({value, max}) => {
    const percentage = (value / max) * 100;
    return (
        <div class="progress-container">
            <div class="progress-fill" style={{width: `${percentage}%`}}></div>
        </div>
    )
}

export default Progress;