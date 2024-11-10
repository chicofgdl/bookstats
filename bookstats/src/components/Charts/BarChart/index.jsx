import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data }) => {
    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                data={data}
                keys={['value']}
                indexBy="genre"
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Gêneros ou Anos',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
            />
        </div>
    );
};

export default BarChart;
