import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LocationTooltipState, store } from '../Redux';
import { LocationTooltipDispatchToProps } from '../Redux/Actions/LocationTooltipAction';
import { FormControl, FormControlLabel, Radio, RadioGroup, Slider } from '@mui/material';

function LocationTooltip({
    latitude,
    longitude,
    setLocationTooltipAct,
    viewport,
    setPointSelectedAct,
    pointSelected,
}: any) {
    const [rValue, setRValue] = useState<string>('isolinea');
    /**
     * uValue se refiere a Unity Value para seleccionar la unidad de medida de
     * la isolinea
     */
    const [uValue, setUValue] = useState<string>('tiempo');
    const [slValue, setSlValue] = useState<number>(5);
    useEffect(() => {
        let tooltip = document.getElementById('lngLatTooltip');

        if (viewport !== undefined) {
            if (viewport.info !== null) {
                let locationTooltipState = store.getState().LocationReducer;
                if (viewport.info.layer === null) {
                    tooltip?.style.setProperty('--x', viewport.info.x + 'px');
                    tooltip?.style.setProperty('--y', viewport.info.y + 'px');

                    if (locationTooltipState.isActive) {
                        tooltip?.classList.add('d-flex');
                        tooltip?.classList.remove('d-none');
                    } else {
                        tooltip?.classList.add('d-none');
                        tooltip?.classList.remove('d-flex');
                    }

                    setLocationTooltipAct({
                        latitude: viewport.info.lngLat[1],
                        longitude: viewport.info.lngLat[0],
                        x: viewport.info.x,
                        y: viewport.info.y,
                        isActive: !locationTooltipState.isActive,
                    });
                } else {
                    tooltip?.classList.add('d-none');
                    tooltip?.classList.remove('d-flex');
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewport]);

    useEffect(() => {
        if (viewport !== undefined) {
            if (viewport.info != null) {
                if (viewport.info.picked !== undefined) {
                    if (viewport.info.object.position) {
                        let id = `${viewport.info.object.position[1]}${viewport.info.object.position[0]}`;
                        setPointSelectedAct({
                            id: id,
                            name: 'name',
                            isSelected: true,
                        });
                    }
                }
            }
        }
    }, [viewport, pointSelected, setPointSelectedAct]);

    function sendArea() {
        console.log('sendArea');
        console.log({
            slValue,
            rValue,
            uValue,
            latitude,
            longitude,
        });
    }

    return (
        <div className='lngLat-tooltip d-none' id={'lngLatTooltip'}>
            <div className='d-flex justify-content-between'>
                <p>Punto de interés</p>
                <p
                    onClick={() => {
                        document.getElementById('lngLatTooltip')?.classList.add('d-none');
                        document.getElementById('lngLatTooltip')?.classList.remove('d-flex');
                    }}
                >
                    cerrar
                </p>
            </div>
            <hr />
            <div className={'label'}>
                <span>Latitud</span>
                <p>{latitude}</p>
            </div>
            <div className={'label'}>
                <span>Longitud</span>
                <p>{longitude}</p>
            </div>
            <div className='my-2'>
                <p>Tipo</p>
                <FormControl component='fieldset'>
                    <RadioGroup
                        row
                        aria-label='Tipo'
                        name='controlled-radio-buttons-group'
                        value={rValue}
                        onChange={(event) => {
                            setRValue(event.target.value);
                        }}
                    >
                        <FormControlLabel value='isolinea' control={<Radio />} label='Isolínea' />
                        <FormControlLabel value='isoarea' control={<Radio />} label='IsoArea' />
                    </RadioGroup>
                </FormControl>
                {rValue === 'isolinea' && (
                    <>
                        <p>Unidad de Isolinea</p>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                row
                                aria-label='Tipo'
                                name='controlled-radio-buttons-group'
                                value={uValue}
                                onChange={(event) => {
                                    setUValue(event.target.value);
                                    setSlValue(event.target.value === 'tiempo' ? 5 : 300);
                                }}
                            >
                                <FormControlLabel value='tiempo' control={<Radio />} label='Tiempo' />
                                <FormControlLabel value='area' control={<Radio />} label='Área' />
                            </RadioGroup>
                        </FormControl>
                    </>
                )}
            </div>
            <div>
                <p>{rValue === 'isolinea' && uValue === 'tiempo' ? 'Tiempo (minutos)' : 'Area(metros)'}</p>
                <Slider
                    valueLabelDisplay='auto'
                    value={slValue}
                    step={null}
                    marks={
                        rValue === 'isolinea' && uValue === 'tiempo'
                            ? [
                                  { value: 5, label: '5 mins' },
                                  { value: 10, label: '10 mins' },
                                  { value: 15, label: '15 mins' },
                                  { value: 20, label: '20 mins' },
                              ]
                            : [
                                  { value: 300, label: '300m' },
                                  { value: 500, label: '500m' },
                                  { value: 700, label: '700m' },
                                  { value: 1000, label: '1000m' },
                              ]
                    }
                    // onBlur={(evt) => {
                    //     setSlValue(evt);
                    // }}
                    onChange={(evt, newValue) => {
                        setSlValue(newValue as number);
                    }}
                    min={rValue === 'isolinea' && uValue === 'tiempo' ? 5 : 300}
                    max={rValue === 'isolinea' && uValue === 'tiempo' ? 20 : 1000}
                    disabled={false}
                />
            </div>

            <div className='ms-auto'>
                <button onClick={sendArea}>
                    Capturar {rValue === 'isolinea' && uValue === 'tiempo' ? 'tiempo' : 'area'}
                </button>
            </div>
        </div>
    );
}

export default connect(LocationTooltipState, LocationTooltipDispatchToProps)(LocationTooltip);
