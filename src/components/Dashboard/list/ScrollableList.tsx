import { ScrollableListItem } from "./item/ScrollableListItem";
import './style.css'

interface ScrollableListProps {
    listItem: any,
    type: "Artist" | "Album"
}

export const ScrollableList = ({ listItem, type }: ScrollableListProps) => {
    return (
        <nav className="nav">
            <ul>
                {type === 'Artist' && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.images[0].url} name={item.name} subName={`Popularity: ${item.popularity}`} />)}
                {type === 'Album' && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.album.images[0].url} name={item.album.name} subName={item.album.release_date} />)}
            </ul>
        </nav>
    )
}