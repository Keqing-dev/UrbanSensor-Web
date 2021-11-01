import React from 'react';
import 'moment/locale/es';
import { connect } from 'react-redux';
import { PointsState } from '../Redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';


function Charts() {



    return (
        <div id='float-pane-section' className='float-pane float-pane-active scroll'>
            <header>
                <div className='d-flex chart-type justify-content-between align-content-center align-items-center'>
                    <h1>...</h1>
                </div>
            </header>
            <div className='chart-pane'>

            </div>
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Charts);
