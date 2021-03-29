import '../../../../Header/SkeletonHeader/style.css'
import './style.css'
export const SkeletonBarChart = () => {
    return (
        <div className="barchart_container">
            <div className="barchart_container_loading loading"></div>
            {(() => {
                let loadingBar = []
                for (let index = 0; index < 30; index++)
                    loadingBar.push(<div key={index} className="barchart_container_loading loading"></div>)
                return loadingBar;
            })()}
        </div>
    )
}