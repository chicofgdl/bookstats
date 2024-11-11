import React from 'react';
import { ResponsivePie } from '@nivo/pie';

// Exemplo de dados para o gráfico de pizza
// const pieData = [
//     { id: "Romance", label: "A", value: 55 },
//     { id: "Programação", label: "A", value: 15 },
//     { id: "Teror", label: "B", value: 25 },
//     { id: "Aventura", label: "C", value: 20 },
// ];

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
                
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: "color" }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
};

export default PieChart;
