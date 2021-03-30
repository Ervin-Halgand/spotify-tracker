import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { option } from './option'
import { SkeletonRadarChart } from "./SkeletonRadar/SkeletonRadar";

interface RadarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const RadarChart = ({ labels, data, isLoading }: RadarChartProps) => {
    let chartReference: any;
    const currentUser = useSelector((state: any) => state.userLogin);

    useEffect(() => {
        if (currentUser.isDarkTheme) {
            option.scale.ticks.fontColor = "#FFFFFF";
            option.scale.pointLabels.fontColor = "#FFFFFF";
            option.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            option.scale.angleLines.color = "rgba(255, 255, 255, 0.3)";
        }
        else {
            option.scale.ticks.fontColor = "#000000";
            option.scale.pointLabels.fontColor = "#000000";
            option.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            option.scale.angleLines.color = "rgba(0, 0, 0, 0.3)";
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (chartReference) chartReference.chartInstance.update();
    }, [data, chartReference])

    useEffect(() => {
        if (currentUser.isDarkTheme && chartReference) {
            option.scale.ticks.fontColor = "#FFFFFF";
            option.scale.pointLabels.fontColor = "#FFFFFF";
            option.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            option.scale.angleLines.color = "rgba(255, 255, 255, 0.3)";
            chartReference.chartInstance.options.scale.angleLines.color = "rgba(255, 255, 255, 0.3)";
            chartReference.chartInstance.options.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            chartReference.chartInstance.options.scale.pointLabels.fontColor = "#FFFFFF";
            chartReference.chartInstance.options.scale.ticks.fontColor = "#FFFFFF";
            chartReference.chartInstance.update();
        }
        else if (chartReference) {
            option.scale.ticks.fontColor = "#000000";
            option.scale.pointLabels.fontColor = "#000000";
            option.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            option.scale.angleLines.color = "rgba(0, 0, 0, 0.3)";
            chartReference.chartInstance.options.scale.angleLines.color = "rgba(0, 0, 0, 0.3)";
            chartReference.chartInstance.options.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            chartReference.chartInstance.options.scale.pointLabels.fontColor = "#000000";
            chartReference.chartInstance.options.scale.ticks.fontColor = "#000000";
            chartReference.chartInstance.update();
        }
        // eslint-disable-next-line
    }, [currentUser.isDarkTheme])
    return (
        <article style={{flex: '1'}}>
            {isLoading ? <SkeletonRadarChart /> : <Radar ref={(reference) => chartReference = reference} options={option} data={{
                labels: labels,
                hidden: true,
                datasets: [{
                    borderColor: "#1ED760",
                    fill: false,
                    data: data,
                }]
            }} />}
            {
                (!isLoading && !data?.length) && <div className="nav__lenght">You haven't listened spotify enought</div>
            }
        </article>
    )
}
