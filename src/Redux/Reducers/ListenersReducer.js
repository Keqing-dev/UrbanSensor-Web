import { ActionTypes } from 'kepler.gl/actions';
import { handleActions } from 'redux-actions';

const appReducer = handleActions(
    {
        [ActionTypes.LAYER_CLICK]: (state, action) => {
            // console.log(action.payload);
            /* let found = false;

            const regex = /id/gm;
            let tooltipPoint = document.querySelector('.map-popover__layer-info');
            let valueId, name, m;

            if (tooltipPoint !== undefined && tooltipPoint !== null) {
                let rows = tooltipPoint.querySelectorAll('.row');
                rows.forEach((value) => {
                    let text = value.querySelector('.row__name').innerHTML.toString();
                    while ((m = regex.exec(text)) !== null) {
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        // eslint-disable-next-line
                        m.forEach(() => {
                            valueId = value.querySelector('.row__value').innerText;
                            name = value.querySelector('.row__name').innerText;
                            found = true;
                        });
                    }
                });
            }*/

            return {
                ...state,
                viewport: { ...action.payload },
                /* selectedPoint: {
                    id: valueId || '',
                    name: name || '',
                    isSelected: found,
                },*/
            };
        },
        [ActionTypes.LAYER_CONFIG_CHANGE]: (state, action) => {
            // Evento de configuracion de un layer
            // console.log('AAA');
            return {
                ...state,
                // viewport: { ...action.payload },
            };
        },
        [ActionTypes.LAYER_VIS_CONFIG_CHANGE]: (state, action) => {
            // Evento de configuracion de un layer
            // console.log(state);
            // console.log(action);
            return {
                ...state,
                // viewport: { ...action.payload },
            };
        },
        [ActionTypes.MODAL]: (state, action) => {
            return {
                ...state,
                // viewport: { ...action.payload },
            };
        },
        [ActionTypes.INTERACTION_CONFIG_CHANGE]: (state, action) => {
            // example: change on geocoder
            // console.log(action);
            let floatButtons = document.getElementById('float-button-group-section');
            let floatPaneSection = document.getElementById('float-pane-section');

            if (action.payload.config != null) {
                if (action.payload.config.enabled && action.payload.config.id === 'geocoder') {
                    floatButtons.style.setProperty('--float-button-group-top', '52px');
                    floatPaneSection.style.setProperty('--float-pane-top', '64px');
                } else {
                    floatButtons.style.setProperty('--float-button-group-top', '0');
                    floatPaneSection.style.setProperty('--float-pane-top', '12px');
                }
            }
            return {
                ...state,
                // viewport: { ...action.payload },
            };
        },
        [ActionTypes.ADD_LAYER]: (state, action) => {
            // console.log('ADD_LAYER');

            return {
                ...state,
            };
        },
        [ActionTypes.SET_CLOUD_PROVIDER]: (state, action) => {
            // Evento de configuracion de un layer
            // console.log('AAA');
            console.log('SET_CLOUD_PROVIDER');
            console.log(action);
            return {
                ...state,
                // viewport: { ...action.payload },
            };
        },
    },
    {},
);

export default appReducer;
