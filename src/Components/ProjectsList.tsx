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

function ProjectsList({setProjectAct}:any) {

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
        });
        return () => {
            setProjects([]);
        };
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
                <header>Selecciona un proyecto</header>
                   <InfiniteScroll
                       className={'row row-cols-2'}
                       dataLength={projects.length}
                       next={() => handleInfiniteScroll()}
                       hasMore={hasMore}
                       scrollThreshold={0.65}
                       loader={<p>cargando...</p>}
                       scrollableTarget='scrollableMiddleContainer'
                       endMessage={
                           <p className='text-center my-4'>
                               <b>{''}</b>
                           </p>
                       }
                   >
                       {
                           projects.map((value: any) => (
                               <div className='col'>
                                   <div className='project' onClick={() => handleProject(value)}>
                                       <Unicons.UilFolder />
                                       <div>
                                           <p>{value.name}</p>
                                           <p>{value.reportsCount} reportes</p>
                                       </div>
                                   </div>
                               </div>
                           ))
                       }
                   </InfiniteScroll>
            </div>
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(ProjectsList);