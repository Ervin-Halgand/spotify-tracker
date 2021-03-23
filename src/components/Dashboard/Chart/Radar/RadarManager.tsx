import React from "react";
import { useEffect, useState } from "react";
import { spotifyGetTopArtists } from "../../../../helpers/axios/Axios";
import { TimeRangeType } from "../../../../helpers/axios/constants";
import { Select } from "../../select/Select";
import { RadarChart } from "./RadarChart"
import '../style.css'
import { shuffleArray } from "../../../../helpers/chart/shuffleChart";

interface RadarChartManagerProps {
    access_token: string,
    title: string
}

const countGenre = (items: any) => {
    const genres: any[] = [];
    let tmpGenreName: string[] = [];
    let tmpValue: Number[] = []
    const { innerWidth: width } = window;

    items?.forEach((item: any) => {
        item?.genres.forEach((genre: any) => {
            genres.filter(e => e.genre === genre).length > 0 ? genres?.forEach((elem: any) => {
                if (elem.genre === genre)
                    elem.count++;
            }) : genres.push({ 'genre': genre, count: 1 })
        })
    })
    let slicedArray = genres.sort((a, b) => a.count - b.count).reverse();
    if (slicedArray.length >= 10) slicedArray = slicedArray.slice(0, 10)
    else slicedArray = slicedArray.slice(0, slicedArray.length);
    if (slicedArray.length >= 5 && width < 1000)
        slicedArray = slicedArray.slice(0, 5)
    else if (width < 1000)
        slicedArray = slicedArray.slice(0, slicedArray.length)
    slicedArray.forEach(item => {
        tmpGenreName.push(item.genre);
        tmpValue.push(item.count);
    })
    tmpValue = shuffleArray(tmpValue, 1);
    tmpGenreName = shuffleArray(tmpGenreName, 1);
    return {
        'genre': tmpGenreName,
        'value': tmpValue
    }
}

export const RadarChartManager = ({ access_token, title }: RadarChartManagerProps) => {
    const [topGenreRecent, setTopGenreRecent] = useState<{ 'genre': string[], 'value': Number[] }>();
    const [topGenreEver, setTopGenreEver] = useState<{ 'genre': string[], 'value': Number[] }>();
    const [topGenreLoading, setTopGenreLoading] = useState<Boolean>(true);
    const [selectData, setSelectData] = useState<string>('Recent');
    const [topGenre, setTopGenre] = useState<{ 'genre': string[], 'value': Number[] }>();
    useEffect(() => {
        setTopGenreLoading(true);
        spotifyGetTopArtists(access_token, TimeRangeType.SHORT, 50).then(res => {
            const data = countGenre(res.data.items);
            setTopGenreRecent(data);
        }).finally(() => setTopGenreLoading(false));
        spotifyGetTopArtists(access_token, TimeRangeType.LONG, 50).then(res => {
            const data = countGenre(res.data.items);
            setTopGenreEver(data);
        });
    }, [access_token])
    useEffect(() => {
        if (selectData === "Recent")
            setTopGenre(topGenreRecent)
        else
            setTopGenre(topGenreEver)
        // eslint-disable-next-line
    }, [selectData, topGenreLoading])
    return (
        <div>
            <div className="chartHeader">
                <span className="data__card__header__title">{title}</span>
                <Select data={['Recent', 'Ever']} onChange={setSelectData} />
            </div>
            <RadarChart labels={topGenre?.genre} data={topGenre?.value} isLoading={topGenreLoading} />
        </div>
    )
}