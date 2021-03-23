import './style.css'

interface ScrollableListItemProps {
    image: string,
    name: string,
    subName?: string,
}

export const ScrollableListItem = ({ image, name, subName }: ScrollableListItemProps) => {
    return (
        <li>
            <div className="list__item">
                <img className="list__item__img" width="59" height="59" src={image} alt={`album ${name}`} />
                <div className="list__item__information">
                    <span className="list__item__information__name">{name}</span>
                    {subName && <span className="list__item__information__subname">{subName}</span>}
                </div>
            </div>
        </li>
    )
}