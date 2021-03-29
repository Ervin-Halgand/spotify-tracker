import { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom';
import logoLogout from '../../../assets/images/logout.png';
import { clearStore } from '../../../redux/actions/spotifyAction';
import './style.css'
import '../style.css'

export const SkeletonHeader: FunctionComponent = () => {
    const history = useHistory();
    return (

        <div className="header__identity">
            <div className="header__identity__avatar loading"></div>
            <div className="header__identity__contact">
                <span className="header__identity__contact__name__loading loading"></span>
                <span className="header__identity_contact__follower__loading loading"></span>
            </div>
            <button className="header__identity__button" onClick={() => { clearStore(); history.replace('/login') }}>
                <img width="20" height="20" className="header__identity__button__logoutImg" src={logoLogout} alt="logout icon" />
            </button>
        </div>

    )
}