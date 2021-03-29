import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { datasetOptions, option } from './option'
import { SkeletonBarChart } from "./SkeletonBarChart/SkeletonBarChart";

interface PolarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const BarChart = ({ labels, data, isLoading }: PolarChartProps) => {
    const currentUser = useSelector((state: any) => state.userLogin);
    let chartReference: any;
    useEffect(() => {
        if (currentUser.isDarkTheme) {
            option.scales.xAxes[0].ticks.fontColor = '#FFFFFF'
            option.scales.yAxes[0].ticks.fontColor = '#FFFFFF'
        }
        else {
            option.scales.xAxes[0].ticks.fontColor = '#000000'
            option.scales.yAxes[0].ticks.fontColor = '#000000'
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (chartReference) chartReference.chartInstance.update();
    }, [data, chartReference])
    useEffect(() => {
        if (currentUser.isDarkTheme && chartReference) {
            option.scales.xAxes[0].ticks.fontColor = '#FFFFFF'
            option.scales.yAxes[0].ticks.fontColor = '#FFFFFF'
            chartReference.chartInstance.options.scales.xAxes[0].ticks.fontColor = '#FFFFFF'
            chartReference.chartInstance.options.scales.yAxes[0].ticks.fontColor = '#FFFFFF'
            chartReference.chartInstance.update();
        }
        else if (chartReference) {
            option.scales.xAxes[0].ticks.fontColor = '#000000'
            option.scales.yAxes[0].ticks.fontColor = '#000000'
            chartReference.chartInstance.options.scales.xAxes[0].ticks.fontColor = '#000000'
            chartReference.chartInstance.options.scales.yAxes[0].ticks.fontColor = '#000000'
            chartReference.chartInstance.update();
        }
        // eslint-disable-next-line
    }, [currentUser.isDarkTheme])
    return (
        <div>
            {
                isLoading ? <SkeletonBarChart /> :
                    <Bar
                        ref={(reference) => chartReference = reference}
                        data={{
                            legend: { display: false },
                            labels: labels,
                            datasets: [{
                                ...datasetOptions,
                                data: data
                            }]
                        }}
                        width={100}
                        height={340}
                        options={option}
                    />
            }
            {
                (!isLoading && !data?.length) && <div className="nav__lenght">You haven't listened spotify enought</div>
            }
        </div>
    )
}
