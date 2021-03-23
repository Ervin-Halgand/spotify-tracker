import React from "react";
import { useEffect, useState } from "react";
import { spotifyGetTopTracks } from "../../../../helpers/axios/Axios";
import { TimeRangeType } from "../../../../helpers/axios/constants";
import { Select } from "../../select/Select";
import { BarChart } from "./BarChart";
//import { Polar } from "./PolarChart"
import '../style.css'
import { shuffleArray } from "../../../../helpers/chart/shuffleChart";

interface PolarChartManagerProps {
    access_token: string,
    title: string
}

const BarFormater = (items: any, recusriveShuffle: number) => {
    let names: string[] = [];
    let values: Number[] = [];
    const { innerWidth: width } = window;
    if (items.length >= 15 && width < 1000)
        items = items.slice(0, 15);
    else if (width < 1000)
        items = items.slice(0, items.length);
    let length = items.length;
    items.forEach((item: any) => {
        names.push(item.name.split('(')[0]);
        values.push(length);
        length--;
    })
    names = shuffleArray(names, recusriveShuffle);
    values = shuffleArray(values, recusriveShuffle);
    return ({ 'tracks': names, 'value': values });
}


export const BarChartManager = ({ access_token, title }: PolarChartManagerProps) => {
    const [topTracksRecent, setTopTracksRecent] = useState<{ 'tracks': string[], 'value': Number[] }>();
    const [topTracksEver, setTopTracksEver] = useState<{ 'tracks': string[], 'value': Number[] }>();
    const [topTracks, setTopTracks] = useState<{ 'tracks': string[], 'value': Number[] }>();
    const [topTracksLoading, setTopTracksLoading] = useState<Boolean>(true);
    const [selectData, setSelectData] = useState<string>('Recent');
    useEffect(() => {
        setTopTracksLoading(true);
        spotifyGetTopTracks(access_token, TimeRangeType.SHORT, 50).then(res => {
            const formatedData = BarFormater(res.data.items, 3);
            setTopTracksRecent(formatedData);
        }).finally(() => setTopTracksLoading(false));
        spotifyGetTopTracks(access_token, TimeRangeType.LONG, 50).then(res => {
            const formatedData = BarFormater(res.data.items, 5);
            setTopTracksEver(formatedData);
        });
    }, [access_token])
    useEffect(() => {
        if (selectData === "Recent")
            setTopTracks(topTracksRecent)
        else
            setTopTracks(topTracksEver)
        // eslint-disable-next-line
    }, [selectData, topTracksLoading])
    return (
        <div>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <BarChart labels={topTracks?.tracks} data={topTracks?.value} isLoading={topTracksLoading} />
        </div>
    )
}