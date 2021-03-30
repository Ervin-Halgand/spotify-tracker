import './style.css'

interface ScrollableListItemProps {
    image: any,
    name: string,
    subName?: string,
}

export const ScrollableListItem = ({ image, name, subName }: ScrollableListItemProps) => {
    return (
        <li>
            <div className="list__item">
                <div className="list__item__img">
                    <img width={image.width} height={image.height} src={image.url} alt={`album ${name}`} />
                </div>
                <div className="list__item__information">
                    <span className="list__item__information__name">{name}</span>
                    {subName && <span className="list__item__information__subname">{subName}</span>}
                </div>
            </div>
        </li>
    )
}