import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { datasetOptions, option } from './option'

interface PolarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const BarChart = ({ labels, data, isLoading }: PolarChartProps) => {
    let chartReference: any;
    useEffect(() => {
        if (chartReference) chartReference.chartInstance.update();
    }, [data, chartReference])
    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
                    <Bar
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
        </div>
    )
}
