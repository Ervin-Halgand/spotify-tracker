import './style.css'

export const CardItem = ({ data }: any) => {
    return (
        <section className="card_item" onClick={() => window.open(data.external_urls.spotify, "_blank")}>
            <img className="card_item_img" src={data.album.images[0].url} alt={`${data.album.album_type} ${data.album.name}`} />
            <div className="card_item_info">
                <h1 className="card_item_info_artist_name">{data.artists[0].name}</h1>
                <span className="card_item_info_name">
                    {data.name}
                </span>
            </div>
        </section>
    )
}