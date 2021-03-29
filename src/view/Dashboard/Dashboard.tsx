import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { spotifyData } from '../../redux/reducer/spotifyReducer'
import { Header } from '../../components/Header/Header';
import { DashboardLayout } from '../../components/Dashboard/Layout/DashboardLayout';
import './style.css'
import { fillSpotifyData } from '../../helpers/axios/InitializationDashboardData';

export const Dashboard: FunctionComponent = () => {
    const currentUser = useSelector((state: any) => state.userLogin);
    const spotifyData: spotifyData = useSelector((state: any) => state.spotifyData);
    const history = useHistory()
    useEffect(() => {
        if (!currentUser.access_token) {
            history.replace('/login');
            return;
        }
        fillSpotifyData(currentUser.access_token, currentUser.refresh_token, history);
    }
        // eslint-disable-next-line
        , []);
    return (
        (spotifyData.user) ?
            <div className="dashboard__root">
                <Header user={spotifyData.user.info} isLoading={spotifyData.user.isLoading} />
                <DashboardLayout spotifyData={spotifyData} currentUser={currentUser} />
            </div> : <div></div>
    )
}