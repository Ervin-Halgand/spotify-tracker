import { useDispatch } from "react-redux";
import { getRecommandationBuilder } from "../../../helpers/axios/SpotifyRequestBuilder";
import { setFollowingArtist, setSavedAlbum } from "../../../redux/actions/followingAction";
import { setRecommandationModal } from "../../../redux/actions/recommandationAction";
import { BarChartManager } from "../Chart/Bar/BarManager";
import { PolarChartManager } from "../Chart/Polar/PolarManager";
import { RadarChartManager } from "../Chart/Radar/RadarManager";
import { ScrollableList } from "../list/ScrollableList";
import { CardItem } from "../Modal/CardItem/cardItem";
import './style.css'

export const DashboardLayout = ({ spotifyData, currentUser }: any) => {
    const dispatch = useDispatch();
    return (
        <div className="layout">
            <div className="ligne">
                <div className={`layout_modal ${spotifyData.recommandation.modalIsOpen ? 'layout_modal_open' : 'layout_modal_close'}`}>
                    <div className="layout_modal_card_container">
                        <button className="layout_modal_button" onClick={() => dispatch(setRecommandationModal(false))} >
                            X
                        </button>
                        {spotifyData.recommandation.data.length && spotifyData.recommandation.data.map((recommandation: any, i: number) => {
                            return (<CardItem key={i} data={recommandation} />)
                        })}
                    </div>
                </div>
                <div className="layout__items layout__items__1">
                    <div className="layout__items__item data__card">
                        <RadarChartManager spotifyData={spotifyData} title="Top genre" />
                    </div>
                    <div className="layout__items__item data__card">
                        <PolarChartManager spotifyData={spotifyData} title="Most listened artists" />
                    </div>
                </div>
                <div className="recommandation_and_scrollable_list">
                    <button className="layout_recommandation_button" disabled={spotifyData.recommandation.isLoading} onClick={() => getRecommandationBuilder(dispatch, spotifyData)}>
                        {spotifyData.recommandation.isLoading && <img width="30" height="30" src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading..." />}SEE RECOMMANDATION</button>
                    <div className="data__card data__card__2">

                        <h3 className="data__card__2__title">
                            Followed Artist
                        </h3>
                        <ScrollableList type="Artist" listItem={spotifyData.following.artist.data}
                            isLoading={spotifyData.following.artist.isLoading} hasError={spotifyData.following.artist.error} errorCallback={() => dispatch(setFollowingArtist())} />
                    </div>
                </div>
            </div>
            <div className="ligne">
                <div className="layout__items layout__items__2">
                    <div className="data__card">
                        <BarChartManager spotifyData={spotifyData} title="Most listened tracks" />
                    </div>
                </div>
                <div className="recommandation_and_scrollable_list">
                    <div className="data__card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 className="data__card__2__title">
                            Followed Album
                        </h3>
                        <ScrollableList type="Album" listItem={spotifyData.following.album.data}
                            isLoading={spotifyData.following.album.isLoading} hasError={spotifyData.following.album.error} errorCallback={() => dispatch(setSavedAlbum())} />
                    </div>
                </div>
            </div>
        </div>
    )
}