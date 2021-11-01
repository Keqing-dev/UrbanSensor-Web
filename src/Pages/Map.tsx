import React, { useEffect, useState } from 'react';
import { KeplerGl } from 'kepler.gl/dist/components';
import { addDataToMap } from 'kepler.gl/actions';
import { connect, useDispatch } from 'react-redux';
import { processRowObject } from 'kepler.gl/processors';
import Mapbar from '../Components/Navigators/Mapbar';
import LocationTooltip from '../Components/LocationTooltip';
import { pointsLayerConfig, tmaLayerConfig } from '../utils/mapConfig';
import { PointsState } from '../Redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';
import { Puff } from '@agney/react-loading';
import * as Unicons from '@iconscout/react-unicons';
import { logout } from '../utils/logout';
import { useHistory } from 'react-router-dom';

const { REACT_APP_MAPBOX_TOKEN } = process.env;

function Map({ setPointsAct, points}: any) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [mapPoints, setMapPoints] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        // @ts-ignore
        document.getElementById('root').style.overflowY = 'hidden';
        return () => {
            // @ts-ignore
            document.getElementById('root').style.overflowY = 'initial';
        };
    }, []);

    useEffect(() => {
            /*getProyectPoints(bucket, month.toString())
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setPointsAct(data);
                })
                .catch(() => {
                    setError(true);
                });*/
        // eslint-disable-next-line
    }, [setPointsAct]);

    useEffect(() => {
        if (points.length !== 0) {
            setMapPoints(points);
        }
    }, [points]);

    useEffect(() => {
        if (mapPoints !== undefined) {
            let DataToMap = {
                datasets: [
                    {
                        info: { label: `Puntos`, id: 'points_id' },
                        data: processRowObject([...mapPoints]),
                    },
                ],
                options: { centerMap: true, readOnly: false },
                config: {
                    visState: {
                        layers: [
                            ...pointsLayerConfig('points_id', ``),
                        ].reverse(),
                    },
                },
            };
            dispatch(
                addDataToMap({
                    ...DataToMap,
                }),
            );
        }
        return () => {
            document.title = 'UrbanSensor';
        };
        // eslint-disable-next-line
    }, [ mapPoints, dispatch]);


    return (
        <>
            {/*{mapPoints === undefined && !error ? (
                <div className='loading-content' >
                    //@ts-ignore
                    <Puff width={50} />
                    <p>Cargando datos</p>
                </div>
            ) : null}*/}
            {mapPoints === undefined && !error ? (
                <div className='loading-content' >
                   <div className='projects-cards'>
                       <header>Selecciona un proyecto</header>
                       <div className='project'>
                           <span>ico</span>
                           <div>
                               <p>Titulo del proyecto</p>
                               <p>10 reportes</p>
                           </div>
                       </div>
                   </div>
                </div>
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
                    <LocationTooltip />
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
