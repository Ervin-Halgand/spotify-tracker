import React from "react";
import { useEffect, useState } from "react";
import { Select } from "../../select/Select";
import { RadarChart } from "./RadarChart"
import '../style.css'
import { countGenre } from "./countGenre";

export const RadarChartManager = ({ spotifyData, title }: any) => {
    const [selectData, setSelectData] = useState<string>('Recent');
    const [topGenre, setTopGenre] = useState<{ 'genre': string[], 'value': Number[] }>();

    useEffect(() => {
        if (selectData === "Recent" && !spotifyData.topArtist.recent.isLoading)
            setTopGenre(countGenre(spotifyData.topArtist.recent.artist))
        else if (!spotifyData.topArtist.ever.isLoading)
            setTopGenre(countGenre(spotifyData.topArtist.ever.artist))
        else setTopGenre({ 'genre': [], 'value': [] });
        // eslint-disable-next-line
    }, [selectData, spotifyData.topArtist.recent.isLoading, spotifyData.topArtist.ever.isLoading])
    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <RadarChart labels={topGenre?.genre} data={topGenre?.value} isLoading={spotifyData.topArtist.ever.isLoading && spotifyData.topArtist.recent.isLoading} />
        </div>
    )
}