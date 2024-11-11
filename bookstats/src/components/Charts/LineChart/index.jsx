import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// Exemplo de dados para o gráfico de linhas
// const lineData = [
//     {
//         id: "Romance",
//         data: [
//             { x: "2020", y: 350 },
//             { x: "2021", y: 100 },
//             { x: "2022", y: 150 },
//             { x: "2023", y: 200 },
//         ],
//     },
//     {
//         id: "Terror",
//         data: [
//             { x: "2020", y: 150 },
//             { x: "2021", y: 200 },
//             { x: "2022", y: 250 },
//             { x: "2023", y: 300 },
//         ],
//     }
// ];

const LineChart = ({ data }) => {
    return (
        <div style={{ height: 400 }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Ano',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Média das Avaliações',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    },
                ]}
            />
        </div>
    );
};

export default LineChart;
