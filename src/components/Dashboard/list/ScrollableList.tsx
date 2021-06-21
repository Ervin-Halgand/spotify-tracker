import ButtonError from "../Button/ButtonError";
import { ScrollableListItem } from "./item/ScrollableListItem";
import { SkeletonScrollableListItem } from "./item/SkeletonScrollableListItem/SkeletonScrollableListItem";
import './style.css'

interface ScrollableListProps {
    listItem: any,
    type: "Artist" | "Album",
    isLoading: boolean,
    hasError: boolean,
    errorCallback: any
}

export const ScrollableList = ({ listItem, type, isLoading, hasError, errorCallback }: ScrollableListProps) => {
    return (
        <nav className="nav">
            {(isLoading && !hasError) ? (() => {
                let loaderComponents = [];
                for (let i = 0; i < 6; i++)
                    loaderComponents.push(<SkeletonScrollableListItem key={i} />);
                return loaderComponents
            })() :
                <ul>
                    {(type === 'Artist' && listItem) && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.images[item.images.length - 1]} name={item.name} subName={`Popularity: ${item.popularity}%`} />)}
                    {(type === 'Album' && listItem) && listItem?.map((item: any, i: number) => <ScrollableListItem key={i} image={item.album.images[item.album.images.length - 1]} name={item.album.name} subName={item.album.release_date} />)}
                    {(!listItem?.length && !hasError) && <div className="nav__lenght">You aren't following anyone</div>}
                    {hasError && <ButtonError text="Reload Here" callBack={errorCallback}/>}
                </ul>}
        </nav>
    )
}