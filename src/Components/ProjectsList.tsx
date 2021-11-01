import React, { useEffect, useState } from 'react';
import { processCsvData } from 'kepler.gl/processors';
import { pointsLayerConfig } from '../utils/mapConfig';
import { addDataToMap } from 'kepler.gl/actions';
import { getCsvReports, getProjects } from '../Api/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect, useDispatch } from 'react-redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';
import { PointsState } from '../Redux';
import * as Unicons from '@iconscout/react-unicons';
import { Puff } from '@agney/react-loading';
import { logout } from '../utils/logout';
import { useHistory } from 'react-router-dom';

function ProjectsList({ setProjectAct }: any) {
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
        if (mapPoints !== undefined) {
            document.title = 'UrbanSensor ' + project.name;
            let DataToMap = {
                datasets: [
                    {
                        info: { label: `${project.name}`, id: 'points_id' },
                        data: processCsvData(mapPoints),
                    },
                ],
                options: { centerMap: true, readOnly: false },
                config: {
                    visState: {
                        layers: [
                            ...pointsLayerConfig('points_id', `${project.name}`),
                        ],
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
    }, [mapPoints, dispatch]);


    useEffect(() => {
        getProjects(page).then(res => {
            return res.data;
        }).then((data: any) => {
            if (data.paging.maxItems < 10) {
                setHasMore(false);
            }
            setProjects(projects.concat(data.content));
            setPage(page + 1);
        }).catch((err)=>{
            setError(true)
        })
        return () => {
            setProjects([]);
        };
        // eslint-disable-next-line
    }, []);

    function handleInfiniteScroll() {
        getProjects(page).then(res => {
            return res.data;
        }).then((data: any) => {
            if (data.content.length === 0) {
                setHasMore(false);
            }
            setProjects(projects.concat(data.content));
            setPage(page + 1);
        });
    }

    function handleProject(project: any) {
        setProject(project);
        getCsvReports(project.id).then(res => {
            return res.data;
        }).then((data: any) => {
            setMapPoints(data);
            setProjectAct(true);
        }).catch(() => {
            setError(true);
        });
    }


    return (
        <div className='loading-content'>
            <div className='projects-cards scroll' id={'scrollableMiddleContainer'}>
                {error ?
                    <div className='loading-content'>
                        <h5>No presentas proyectos</h5>
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
                        <p className='small text-success'>*Recueda que puedes crear proyectos y reportes en la app mobile</p>

                    </div> :
                    <>
                        <header>Selecciona un proyecto</header>
                        <InfiniteScroll
                            className={'row row-cols-2'}
                            dataLength={projects.length}
                            next={() => handleInfiniteScroll()}
                            hasMore={hasMore}
                            scrollThreshold={0.65}
                            loader={<div className='m-auto'>
                                {/*//@ts-ignore*/}
                                <Puff width={50} />
                            </div>}
                            scrollableTarget='scrollableMiddleContainer'
                            endMessage={
                                <p className='text-center'>
                                    <b>{''}</b>
                                </p>
                            }
                        >
                            {
                                projects.map((value: any, index) => {
                                    if (value.reportsCount !== '0') {
                                        return (
                                            <div key={index} className='col'>
                                                <div className='project' onClick={() => handleProject(value)}>
                                                    <Unicons.UilFolder />
                                                    <div>
                                                        <p>{value.name}</p>
                                                        <p>{value.reportsCount} reportes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return <></>;
                                    }
                                })
                            }
                        </InfiniteScroll>
                    </>

                }

            </div>
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(ProjectsList);