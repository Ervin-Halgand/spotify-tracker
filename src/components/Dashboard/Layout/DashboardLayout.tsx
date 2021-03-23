import { useEffect, useState } from "react";
import { spotifyGetFollowingArtist, spotifyGetSavedAlbum } from "../../../helpers/axios/Axios";
import { BarChartManager } from "../Chart/Bar/BarManager";
import { PolarChartManager } from "../Chart/Polar/PolarManager";
import { RadarChartManager } from "../Chart/Radar/RadarManager";
import { ScrollableList } from "../list/ScrollableList";
import './style.css'

interface DashboardLayoutProps {
    access_token: string
}

export const DashboardLayout = ({ access_token }: DashboardLayoutProps) => {
    const [followingArtist, setFollowingArtist] = useState();
    const [savedAlbum, setSavedAlbum] = useState();

    useEffect(() => {
        spotifyGetFollowingArtist(access_token, 50).then(res => {
            setFollowingArtist(res.data.artists.items);
        }).catch(err => {
            console.error(err)
        })
        spotifyGetSavedAlbum(access_token, 50).then(res => {
            setSavedAlbum(res.data.items);
        }).catch(err => {
            console.error(err)
        })
    }, [access_token])
    return (
        <div className="layout">
            <div className="data__card data__card__1">
                <BarChartManager access_token={access_token} title="Top tracks" />
            </div>
            <div className="data__card data__card__2">
                <h3 className="data__card__2__title">
                    Followed Artist
                </h3>
                <ScrollableList type="Artist" listItem={followingArtist} />
            </div>
            <div className="layout__items">
                <div className="layout__items__item data__card">
                    <RadarChartManager access_token={access_token} title="Top genre" />
                </div>
                <div className="layout__items__item data__card">
                    <PolarChartManager access_token={access_token} title="Top artist" />
                </div>
            </div>
            <div className="data__card data__card__2">
                <h3 className="data__card__2__title">
                    Followed Album
                </h3>
                <ScrollableList type="Album" listItem={savedAlbum} />
            </div>
        </div>
    )
}