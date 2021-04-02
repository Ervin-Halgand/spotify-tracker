import { ScrollableListItem } from "./item/ScrollableListItem";
import { SkeletonScrollableListItem } from "./item/SkeletonScrollableListItem/SkeletonScrollableListItem";
import './style.css'

interface ScrollableListProps {
    listItem: any,
    type: "Artist" | "Album",
    isLoading: boolean
}

export const ScrollableList = ({ listItem, type, isLoading }: ScrollableListProps) => {

    return (
        <nav className="nav">
            {isLoading ? (() => {
                let loaderComponents = [];
                for (let i = 0; i < 6; i++)
                    loaderComponents.push(<SkeletonScrollableListItem key={i} />);
                return loaderComponents
            })() :
                <ul>
                    {type === 'Artist' && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.images[item.images.length - 1]} name={item.name} subName={`Popularity: ${item.popularity}%`} />)}
                    {type === 'Album' && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.album.images[item.album.images.length - 1]} name={item.album.name} subName={item.album.release_date} />)}
                    {!listItem.length && <div className="nav__lenght">You haven't listened spotify enought</div>}
                </ul>}
        </nav>
    )
}