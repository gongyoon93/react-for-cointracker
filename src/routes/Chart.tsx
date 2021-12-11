import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
time_close: string;
open: number;
high: number;
low: number;
close: number;
volume: number;
market_cap: number;
}

function Chart({coinId} : ChartProps) {
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],() => fetchCoinHistory(coinId),
    {
        refetchInterval: 10000,
    });
    return <div>{isLoading ? "Loading chart..." : <ApexChart 
    type="line" 
    series={[
        {
            name: "Price",
            data : data?.map(price => price.close),
        }
    ]}
    options={{
        theme: {
           mode: "dark", 
        },
        chart: {
            width: 500,
            height: 400,
            toolbar: {
                show: false,
            },
            background: "transparent",
        },
        grid: {
            show: false,
        },
        stroke: {
            curve:"smooth",
            width: 5,
        },
        yaxis: {
            show: false,
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisTicks:{
                show: false,
            },
            axisBorder: {
                show: false,
            },
            categories: data?.map((price) => price.time_close),
            type: "datetime",
        },
        fill: {
            type:"gradient",
            gradient:{gradientToColors: ["rgb(71,66,63)"], stops: [0, 100]}
        },
        colors: ['rgb(179,177,178)'],
        tooltip: {
            y: {
                formatter: (value) => `$ ${value.toFixed(3)}`
            }
        },
    }}/>}</div>;
}

export default Chart;