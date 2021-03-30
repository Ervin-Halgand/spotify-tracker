import { useEffect } from "react";
import { Polar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { option } from "./option"
import { SkeletonPolarChart } from "./SkeletonPolar/SkeletonPolar";

interface PolarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const PolarChart = ({ labels, data, isLoading }: PolarChartProps) => {
    let chartReference: any;
    const currentUser = useSelector((state: any) => state.userLogin);

    useEffect(() => {
        if (currentUser.isDarkTheme) {
            option.scale.ticks.fontColor = "#FFFFFF";
            option.scale.pointLabels.fontColor = "#FFFFFF";
            option.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            option.legend.labels.fontColor = "#FFFFFF";
        }
        else {
            option.scale.ticks.fontColor = "#000000";
            option.scale.pointLabels.fontColor = "#000000";
            option.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            option.legend.labels.fontColor = "#000000";
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (currentUser.isDarkTheme && chartReference) {
            option.scale.ticks.fontColor = "#FFFFFF";
            option.scale.pointLabels.fontColor = "#FFFFFF";
            option.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            option.legend.labels.fontColor = "#FFFFFF";
            chartReference.chartInstance.options.scale.ticks.fontColor = "#FFFFFF"
            chartReference.chartInstance.options.scale.pointLabels.fontColor = "#FFFFFF";
            chartReference.chartInstance.options.scale.gridLines.color = "rgba(255, 255, 255, 0.3)";
            chartReference.chartInstance.options.legend.labels.fontColor = "#FFFFFF";
            chartReference.chartInstance.update();
        }
        else if (chartReference) {
            option.scale.ticks.fontColor = "#000000";
            option.scale.pointLabels.fontColor = "#000000";
            option.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            option.legend.labels.fontColor = "#000000";
            chartReference.chartInstance.options.scale.ticks.fontColor = "#000000"
            chartReference.chartInstance.options.scale.pointLabels.fontColor = "#000000";
            chartReference.chartInstance.options.scale.gridLines.color = "rgba(0, 0, 0, 0.3)";
            chartReference.chartInstance.options.legend.labels.fontColor = "#000000";
            chartReference.chartInstance.update();
        }
        // eslint-disable-next-line
    }, [currentUser.isDarkTheme])
    return (
        <article>
            {
                isLoading ? <SkeletonPolarChart /> :
                    <Polar ref={(reference) => chartReference = reference} options={option} data={{
                        labels: labels,
                        datasets: [{
                            label: '',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(37, 200, 64, 0.2)',
                                'rgba(255, 10, 200, 0.2)',
                                'rgba(155, 200, 200, 0.2)',
                                'rgba(200, 255, 100, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(37, 200, 64, 1)',
                                'rgba(255, 10, 200, 1)',
                                'rgba(155, 200, 200, 1)',
                                'rgba(200, 255, 100, 1)'
                            ],
                            data: data
                        }]
                    }} />
            }
            {
                (!isLoading && !data?.length) && <div className="nav__lenght">You haven't listened spotify enought</div>
            }
        </article>
    )
}
