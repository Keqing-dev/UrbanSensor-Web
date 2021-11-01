import React, { useEffect, useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { useHistory } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { logout } from '../../utils/logout';
import { connect, useDispatch } from 'react-redux';
import { UserState } from '../../Redux';
import { Link } from 'react-router-dom';
import Charts from '../Charts';
import { setExportImageSetting } from 'kepler.gl/actions';
import { Puff } from '@agney/react-loading';
import { AlertDispatchToProps } from '../../Redux/Actions/AlertAction';

function Mapbar({ isAdmin, exportImage, setAlertAct, client }: any) {
    const history = useHistory();
    const [isExpanded, setExpanded] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const dispatch = useDispatch();

    async function screenShot() {
        setLoading(true);
        await dispatch(
            setExportImageSetting({
                error: undefined,
                legend: false,
                mapW: window.screen.width,
                mapH: window.screen.height,
                imageSize: { imageH: window.screen.height, imageW: window.screen.width, scale: 1 },
                exporting: true,
                processing: true,
                resolution: 'ONE_X',
                ratio: 'SCREEN',
            }),
        );
    }

    useEffect(() => {
        if (exportImage !== undefined) {
            if (exportImage.imageDataUri.trim() !== '') {
                let screenshotDiv = document.getElementById('screenshot-map');
                setImageUri(exportImage.imageDataUri);
                screenshotDiv?.classList.remove('d-none');
                dispatch(
                    setExportImageSetting({
                        imageDataUri: '',
                        imageSize: { imageH: 0, imageW: 0, scale: 0 },
                        exporting: false,
                        processing: true,
                    }),
                );
            }
        }
    }, [exportImage, dispatch]);

    useEffect(() => {
        if (imageUri.trim() !== '') {
            html2canvas(document.body, {
                allowTaint: true,
                foreignObjectRendering: true,
            }).then((canvas) => {
                saveAs(canvas.toDataURL(), `${client.toLowerCase().replace(/ /gm, '')}-screenshot.png`);
                setLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [imageUri]);

    function saveAs(uri: any, filename: any) {
        let link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
        let screenshotDiv = document.getElementById('screenshot-map');
        screenshotDiv?.classList.add('d-none');
        setImageUri('');
        setAlertAct({ isActive: true, message: 'Captura exitosa.' });
    }

    function handleFloatPane() {
        let floatButtonGroup = document.getElementById('float-button-group-section');
        let floatPane = document.getElementById('float-pane-section');

        if (floatButtonGroup?.classList.contains('float-button-group-active')) {
            floatButtonGroup.classList.remove('float-button-group-active');
            floatPane?.classList.add('float-pane-active');
            setExpanded(false);
        } else {
            floatButtonGroup?.classList.add('float-button-group-active');
            floatPane?.classList.remove('float-pane-active');
            setExpanded(true);
        }
    }

    return (
        <div>
            <div id='screenshot-map' className='screenshot-container d-none'>
                <img src={imageUri} alt='' />
            </div>
            {isLoading ? (
                <div className='loading-content' data-html2canvas-ignore>
                    {/*//@ts-ignore*/}
                    <Puff width={50} />
                    <p>Generando captura</p>
                </div>
            ) : null}

            <div id='float-button-group-section' className='float-button-group '>
                {isAdmin ? (
                    <Link to={'/admin'} className='button-square'>
                        <span menu-name='Dashboard'>
                            <Unicons.UilEstate />
                        </span>
                    </Link>
                ) : null}

                <div className='button-square' id='butt' onClick={screenShot}>
                    <span menu-name='Capturar pantalla'>
                        <Unicons.UilFileExport />
                    </span>
                </div>
                <div className='button-square' onClick={handleFloatPane}>
                    <span menu-name='Graficos'>
                        {isExpanded ? <Unicons.UilArrowRight /> : <Unicons.UilChartLine />}
                    </span>
                </div>
                <div
                    className='button-square'
                    onClick={() => {
                        logout();
                        history.replace('/');
                    }}
                >
                    <span menu-name='Cerrar Sesion'>
                        <Unicons.UilSignOutAlt />
                    </span>
                </div>
            </div>

            <Charts />
        </div>
    );
}

export default connect(UserState, AlertDispatchToProps)(Mapbar);
