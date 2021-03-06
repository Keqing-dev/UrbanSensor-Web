import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { taskMiddleware } from 'react-palm/tasks';
import ListenersReducer from './Reducers/ListenersReducer';
import SubNavbarReducer from './Reducers/SubNavbarReducer';
import UserReducer from './Reducers/UserReducer';
import LocationTooltipReducer from './Reducers/LocationTooltipReducer';
import AlertReducer from './Reducers/AlertReducer';
import { LOCALE_CODES } from 'kepler.gl/localization';
// import logo from '../assets/img/mapoteca-logo.png';
import PointsReducer from './Reducers/PointsReducer';
import MapDatasetsReducer from './Reducers/MapDatasetsReducer';
const { REACT_APP_MAPBOX_STYLE_URL } = process.env;

export const PointsState = (state, props) => ({
    props: props,
    ...state.PointsReducer,
    ...state.UserReducer,
    ...state.MapDatasetsReducer,
    mapDatasets: state.MapDatasetsReducer,
});


export const AlertState = (state, props) => ({
    props: props,
    isActive: state.AlertReducer.isActive,
    message: state.AlertReducer.message,
});




const reducers = combineReducers({
    keplerGl: keplerGlReducer.initialState({
        uiState: {
            activeSidePanel: null,
            currentModal: null,
            locale: LOCALE_CODES.es,
        },
        mapStyle: {
            mapStyles: {
                mapotecaStyle: {
                    id: 'mapotecaStyle',
                    label: 'UrbanSensor',
                    // url: 'mapbox://styles/acarye/ckuviyawy0o4317t0djawr358',
                    url: REACT_APP_MAPBOX_STYLE_URL,
                    // icon: logo,
                },
            },
            styleType: 'mapotecaStyle',
        },
        mapState: {
            // latitude: -33.45694,
            // longitude: -70.64827,
            maxZoom: 24,
            altitude: 1.4,
            zoom: 15,
        },
    }),

    ListenersReducer,
    SubNavbarReducer,
    UserReducer,
    LocationReducer: LocationTooltipReducer,
    AlertReducer,
    PointsReducer,
    MapDatasetsReducer,
});

const enhancers = [applyMiddleware(taskMiddleware)];


export let store = createStore(reducers, {}, compose(...enhancers));
