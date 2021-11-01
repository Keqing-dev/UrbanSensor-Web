import React from 'react';
import {
    Bars
} from '@agney/react-loading';
function LoadingScreen() {
    return (
        <div className='vh-100 d-flex'>

            <div className='m-auto text-white text-center'>
                {/*// @ts-ignore*/}
                <Bars width="100" color={'white'} />
            </div>
        </div>
    );
}

export default LoadingScreen;