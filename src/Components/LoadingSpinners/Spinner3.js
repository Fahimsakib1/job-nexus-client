import React from 'react';
import { RotatingLines } from 'react-loader-spinner';






const Spinner3 = () => {

    const style = { position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <div className='mt-[150px]' style={style}>
            <RotatingLines
                strokeColor="gray"
                strokeWidth="5"
                animationDuration="0.75"
                width="60"
                visible={true}
            />

        </div>
    );
};

export default Spinner3;