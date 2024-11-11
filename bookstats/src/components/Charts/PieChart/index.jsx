import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data }) => {
    return (
        <div style={{ height: 400 }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabel={(d) => `${d.id}: ${d.value}`}
                enableArcLinkLabels={true}
                enableArcLabels={true}
                arcLinkLabel={(d) => `${d.id}`}
                sortByValue={true}                
            />
        </div>
    );
};

export default PieChart;