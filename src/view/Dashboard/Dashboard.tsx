import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header } from '../../components/Header/Header';
import { DashboardLayout } from '../../components/Dashboard/Layout/DashboardLayout';
import './style.css'
import { setUser } from "../../redux/actions/userInfoAction";
import { setFollowingArtist, setSavedAlbum } from "../../redux/actions/followingAction";
import { setTopArtistEver, setTopArtistRecent } from "../../redux/actions/topArtistAction";
import { setTopTrackEver, setTopTrackRecent } from "../../redux/actions/topTrackAction";
import { refreshRefreshToken } from "../../redux/actions/userLoginAction";

export const Dashboard: FunctionComponent = () => {
    const currentUser = useSelector((state: any) => state.userLogin);
    const spotifyData = useSelector((state: any) => state.spotifyData);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentUser.access_token) {
            history.replace('/login');
            return;
        }
        const initDispacht = async () => {
            await dispatch(refreshRefreshToken(history));
            dispatch(setUser());
            dispatch(setFollowingArtist());
            dispatch(setSavedAlbum());
            dispatch(setTopArtistRecent());
            dispatch(setTopArtistEver());
            dispatch(setTopTrackRecent());
            dispatch(setTopTrackEver());
        }
        initDispacht();

    }
        // eslint-disable-next-line
        , []);
    return (
        (spotifyData.userInfo) ?
            <div className="dashboard__root">
                <Header user={spotifyData.userInfo.info} isLoading={spotifyData.userInfo.isLoading} />
                <DashboardLayout spotifyData={spotifyData} currentUser={currentUser} />
            </div> : <div></div>
    )
}