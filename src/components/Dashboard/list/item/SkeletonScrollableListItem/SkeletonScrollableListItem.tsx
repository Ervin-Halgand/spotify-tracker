import '../style.css'
import './style.css'
import '../../../../Header/SkeletonHeader/style.css'

export const SkeletonScrollableListItem = () => {
    return (
        <li>
            <div className="list__item_loading loading">
            </div>
        </li>
    )
}