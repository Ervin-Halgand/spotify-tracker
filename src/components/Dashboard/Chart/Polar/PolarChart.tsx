import { useEffect } from "react";
import { Polar } from "react-chartjs-2";
import { option } from "./option"

interface PolarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const PolarChart = ({ labels, data, isLoading }: PolarChartProps) => {
    let chartReference: any;
    useEffect(() => {
        if (chartReference) chartReference.chartInstance.update();
    }, [data, chartReference])
    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
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
        </div>
    )
}
