import './style.css'
import '../../../../Header/SkeletonHeader/style.css'

export const SkeletonRadarChart = () => {
    return (
        <div className="radar_chart_container">
            <div className="radar_chart_radius loading"></div>
        </div>
    )
}