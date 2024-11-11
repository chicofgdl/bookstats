import React, { useContext } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ThemeContext } from "../../../context/ThemeContext";

const PieChart = ({ data }) => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div style={{ height: 400 }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: "nivo" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                radialLabel={(d) => `${d.id}: ${d.value}`}
                enableArcLinkLabels={true}
                enableArcLabels={true}
                arcLinkLabel={(d) => `${d.id}`}
                sortByValue={true}
                radialLabelsSkipAngle={10}
                radialLabelsLinkColor={{ from: "color" }}
                sliceLabelsSkipAngle={10}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                arcLinkLabelsTextColor="#D1D1D1"
                sliceLabelsTextColor="#D1D1D1"
                radialLabelsTextColor="#D1D1D1"
            />
        </div>
    );
};

export default PieChart;
