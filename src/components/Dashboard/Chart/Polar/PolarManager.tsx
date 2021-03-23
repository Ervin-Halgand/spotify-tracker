import React from "react";
import { useEffect, useState } from "react";
import { spotifyGetTopArtists } from "../../../../helpers/axios/Axios";
import { TimeRangeType } from "../../../../helpers/axios/constants";
import { Select } from "../../select/Select";
import { PolarChart } from "./PolarChart";
//import { Polar } from "./PolarChart"
import '../style.css'
import { shuffleArray } from "../../../../helpers/chart/shuffleChart";

interface PolarChartManagerProps {
    access_token: string,
    title: string
}

const formatArtist = (artist: any) => {
    let names: string[] = [];
    let value: Number[] = [];
    const { innerWidth: width } = window;
    let slicedNumber = 7;
    if (artist.length >= 5 && width < 1000)
        slicedNumber = 5;

    let length: number = artist.length;
    const recusriveShuffle = 7;
    artist.forEach((item: any, i: Number) => {
        names.push(item.name);
        value.push(length);
        length--;
    })

    if (artist.length >= slicedNumber) {
        names = names.slice(0, slicedNumber);
        value = value.slice(0, slicedNumber);
    }
    else {
        names = names.slice(0, names.length);
        value = value.slice(0, names.length);
    }
    names = shuffleArray(names, recusriveShuffle);
    value = shuffleArray(value, recusriveShuffle);
    return ({ 'artist': names, 'value': value })
}

export const PolarChartManager = ({ access_token, title }: PolarChartManagerProps) => {
    const [topArtistRecent, setTopArtistRecent] = useState<{ 'artist': string[], 'value': Number[] }>();
    const [topArtistEver, setTopArtistEver] = useState<{ 'artist': string[], 'value': Number[] }>();
    const [topArtist, setTopArtist] = useState<{ 'artist': string[], 'value': Number[] }>();
    const [topArtistLoading, setTopArtistLoading] = useState<Boolean>(true);
    const [selectData, setSelectData] = useState<string>('Recent');
    useEffect(() => {
        setTopArtistLoading(true);
        spotifyGetTopArtists(access_token, TimeRangeType.SHORT, 50).then(res => {
            const formatedArtist = formatArtist(res.data.items);
            setTopArtistRecent(formatedArtist);
        }).finally(() => setTopArtistLoading(false));
        spotifyGetTopArtists(access_token, TimeRangeType.LONG, 50).then(res => {
            const formatedArtist = formatArtist(res.data.items);
            setTopArtistEver(formatedArtist);
        });
    }, [access_token])
    useEffect(() => {
        if (selectData === "Recent")
            setTopArtist(topArtistRecent)
        else
            setTopArtist(topArtistEver)
        // eslint-disable-next-line
    }, [selectData, topArtistLoading])
    return (
        <div>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <PolarChart labels={topArtist?.artist} data={topArtist?.value} isLoading={topArtistLoading} />
        </div>
    )
}