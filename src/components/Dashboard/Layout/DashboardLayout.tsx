import { getRecommandationBuilder } from "../../../helpers/axios/SpotifyRequestBuilder";
import { setRecommandationModal } from "../../../redux/actions/spotifyAction";
import { BarChartManager } from "../Chart/Bar/BarManager";
import { PolarChartManager } from "../Chart/Polar/PolarManager";
import { RadarChartManager } from "../Chart/Radar/RadarManager";
import { ScrollableList } from "../list/ScrollableList";
import { CardItem } from "../Modal/CardItem/cardItem";
import './style.css'

export const DashboardLayout = ({ spotifyData, currentUser }: any) => {
    return (
        <div className="layout">
            <div className={`layout_modal ${spotifyData.recommandation.modalIsOpen ? 'layout_modal_open' : 'layout_modal_close'}`}>
                <div className="layout_modal_card_container">
                    <button className="layout_modal_button" onClick={() => setRecommandationModal(false)}>
                        X
                    </button>
                    {spotifyData.recommandation.data.length && spotifyData.recommandation.data.map((recommandation: any, i: number) => {
                        return (<CardItem key={i} data={recommandation} />)
                    })}
                </div>
            </div>
            <div className="layout__items">
                <div className="layout__items__item data__card">
                    <RadarChartManager spotifyData={spotifyData} title="Top genre" />
                </div>
                <div className="layout__items__item data__card">
                    <PolarChartManager spotifyData={spotifyData} title="Top artist" />
                </div>
            </div>
            <div className="recommandation_and_scrollable_list">
                <button className="layout_recommandation_button" disabled={spotifyData.topTrack.ever.isLoading} onClick={() => getRecommandationBuilder(spotifyData, currentUser.access_token)}>SEE RECOMMANDATION</button>
                <div className="data__card data__card__2">

                    <h3 className="data__card__2__title">
                        Followed Artist
                    </h3>
                    <ScrollableList type="Artist" listItem={spotifyData.following.artist.data} isLoading={spotifyData.following.artist.isLoading} />

                </div>
            </div>
            <div className="data__card data__card__1">
                <BarChartManager spotifyData={spotifyData} title="Top tracks" />
            </div>
            <div className="data__card data__card__2">
                <h3 className="data__card__2__title">
                    Followed Album
                </h3>
                <ScrollableList type="Album" listItem={spotifyData.following.album.data} isLoading={spotifyData.following.album.isLoading} />
            </div>
        </div>
    )
}