import React, { useEffect, useState } from 'react';
import { KeplerGl } from 'kepler.gl/dist/components';
import { connect, useDispatch } from 'react-redux';
import Mapbar from '../Components/Navigators/Mapbar';
import { PointsState } from '../Redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';
import * as Unicons from '@iconscout/react-unicons';
import { logout } from '../utils/logout';
import { useHistory } from 'react-router-dom';
import ProjectsList from '../Components/ProjectsList';

const { REACT_APP_MAPBOX_TOKEN } = process.env;

function Map({ isSelected }: any) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [mapPoints, setMapPoints] = useState();
    const [error, setError] = useState(false);

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({
        name: undefined,
    });
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // @ts-ignore
        document.getElementById('root').style.overflowY = 'hidden';
        return () => {
            // @ts-ignore
            document.getElementById('root').style.overflowY = 'initial';
        };
    }, []);





    return (
        <>
            {!isSelected? (
               <ProjectsList/>
            ) : null}

            {error ? (
                <div className='loading-content'>
                    <h5>No presentas datos</h5>
                    <p>Recarga para volver a intentar</p>
                    <div
                        style={{ cursor: 'pointer' }}
                        className='d-flex justify-content-between text-danger'
                        onClick={() => {
                            history.replace('/');
                            logout();
                        }}
                    >
                        <p className='mx-2'>Cerrar sesión</p>
                        <Unicons.UilSignOutAlt />
                    </div>
                </div>
            ) : (
                <>
                    <Mapbar />
                    <KeplerGl
                        id='keplerMap'
                        appName='UrbanSensor'
                        appWebsite=''
                        version='0.5'
                        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                    />
                </>
            )}
        </>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Map);