import React from 'react';
import Chart from 'react-google-charts';

const Data = ({ data, type }) => {
    return (
        <Chart 
            width="100%"
            height="400px"
            chartType={type}
            loader={ 
                <div className="font-semibold text-sm text-center">
                    Loading Chart...
                </div> 
            }
            data={data}
        />
    )
};

export default Data;