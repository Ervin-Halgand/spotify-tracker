import React from "react";
import { useEffect, useState } from "react";
import { Select } from "../../select/Select";
import { PolarChart } from "./PolarChart";
import '../style.css'
import { formatArtist } from "../../../../helpers/chart/formatArtist";


export const PolarChartManager = ({ spotifyData, title }: any) => {

    const [topArtist, setTopArtist] = useState<{ 'artist': string[], 'value': Number[] }>();
    const [selectData, setSelectData] = useState<string>('Recent');

    useEffect(() => {
        if (selectData === "Recent" && !spotifyData.topArtist.recent.isLoading)
            setTopArtist(formatArtist(spotifyData.topArtist.recent.artist))
        else if (!spotifyData.topArtist.ever.isLoading)
            setTopArtist(formatArtist(spotifyData.topArtist.ever.artist))
        else setTopArtist({ 'artist': [], 'value': [] });
        // eslint-disable-next-line
    }, [selectData, spotifyData.topArtist.recent.isLoading, spotifyData.topArtist.ever.isLoading])

    return (
        <div>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <PolarChart labels={topArtist?.artist} data={topArtist?.value} isLoading={spotifyData.topArtist.recent.isLoading && spotifyData.topArtist.ever.isLoading} />
        </div>
    )
}