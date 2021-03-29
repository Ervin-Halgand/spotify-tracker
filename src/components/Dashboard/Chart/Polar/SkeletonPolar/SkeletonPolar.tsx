import './style.css'
import '../../../../Header/SkeletonHeader/style.css'

export const SkeletonPolarChart = () => {
    return (
        <div className="polar_chart_container">
            <div className="polar_chart_labels_container">
                <div className="polar_chart_label_container">
                    <div className="polar_chart_label_box loading"></div>
                    <div className="polar_chart_label_name loading"></div>
                </div>
                <div className="polar_chart_label_container">
                    <div className="polar_chart_label_box loading"></div>
                    <div className="polar_chart_label_name loading"></div>
                </div>
                <div className="polar_chart_label_container">
                    <div className="polar_chart_label_box loading"></div>
                    <div className="polar_chart_label_name loading"></div>
                </div>
                <div className="polar_chart_label_container">
                    <div className="polar_chart_label_box loading"></div>
                    <div className="polar_chart_label_name loading"></div>
                </div>
            </div>
            <div className="polar_chart_radius loading"></div>
        </div>
    )
}