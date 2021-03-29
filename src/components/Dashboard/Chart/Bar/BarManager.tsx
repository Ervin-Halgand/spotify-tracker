import React from "react";
import { useEffect, useState } from "react";
import { Select } from "../../select/Select";
import { BarChart } from "./BarChart";
import '../style.css'
import { shuffleArray } from "../../../../helpers/chart/shuffleChart";

const BarFormater = (items: any, recusriveShuffle: number) => {
    let names: string[] = [];
    let values: Number[] = [];
    const { innerWidth: width } = window;
    if (items.length >= 30) items = items.slice(0, 30);
    if (items.length >= 15 && width < 1000)
        items = items.slice(0, 10);
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


export const BarChartManager = ({ spotifyData, title }: any) => {

    const [topTracks, setTopTracks] = useState<{ 'tracks': string[], 'value': Number[] }>();
    const [selectData, setSelectData] = useState<string>('Recent');

    useEffect(() => {
        if (selectData === "Recent" && !spotifyData.topTrack.recent.isLoading)
            setTopTracks(BarFormater(spotifyData.topTrack.recent.track, 3))
        else if (!spotifyData.topTrack.ever.isLoading)
            setTopTracks(BarFormater(spotifyData.topTrack.ever.track, 5))
        else setTopTracks({ 'tracks': [], 'value': [] });
        // eslint-disable-next-line
    }, [selectData, spotifyData.topTrack.recent.isLoading, spotifyData.topTrack.ever.isLoading])

    return (
        <div>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <BarChart labels={topTracks?.tracks} data={topTracks?.value} isLoading={spotifyData.topTrack.recent.isLoading && spotifyData.topTrack.ever.isLoading} />
        </div>
    )
}