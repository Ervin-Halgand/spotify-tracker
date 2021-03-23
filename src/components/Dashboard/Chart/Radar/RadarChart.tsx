import { Radar } from "react-chartjs-2";
import { option } from './option'

interface RadarChartProps {
    labels: string[] | undefined,
    data: Number[] | undefined,
    isLoading: Boolean
}

export const RadarChart = ({ labels, data, isLoading }: RadarChartProps) => {
    return (
        <div>
            {isLoading ? <div>Loading...</div> : <Radar options={option} data={{
                labels: labels,
                hidden: true,
                datasets: [{
                    borderColor: "#1ED760",
                    fill: false,
                    data: data,
                }]
            }} />}
        </div>
    )
}
