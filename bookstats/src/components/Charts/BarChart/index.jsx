import React, {useContext} from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ThemeContext } from '../../../context/ThemeContext';

// Exemplo de dados para o gráfico de barras
// const barData = [
//     { genre: "Romance", value: 55 },
//     { genre: "Programação", value: 15 },
//     { genre: "Teror", value: 25 },
//     { genre: "Aventura", value: 20 },
// ];

const BarChart = ({ data }) => {
    const { darkMode } = useContext(ThemeContext);

    const theme = {
        axis: {
            ticks: {
                text: {
                    fill: darkMode ? '#fff' : '#000', // Cor do texto dos ticks
                },
            },
            legend: {
                text: {
                    fill: darkMode ? '#fff' : '#000', // Cor do texto da legenda
                },
            },
        },
    };
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
                    legend: 'Gêneros',
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
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={theme}  // Aplicando o tema
            />
        </div>
    );
};

export default BarChart;
