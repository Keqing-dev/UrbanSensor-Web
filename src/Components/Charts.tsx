import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'moment/locale/es';
import { parseCharts } from '../utils/chartutils';
import * as Unicons from '@iconscout/react-unicons';
import { connect, useDispatch } from 'react-redux';
import { PointsState } from '../Redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';
import { processGeojson } from 'kepler.gl/processors';
import { addDataToMap } from 'kepler.gl/actions';

type chartConfig = {
    datasets: any;
    type: any;
    isHorizontal: boolean;
    keys?: any;
    labels: any;
    daysLabels?: any;
};

function Charts({ pointSelected, setMapDatasetAct, client, mapDatasets }: any) {
    const dispatch = useDispatch();

    const chart = useRef<Array<any>>([]);

    function initChart(chartConfig: chartConfig, id: string, chartTitle: string, yTitle: string) {
        let ctx = document.getElementById(id);
        let myChart = new Chart(ctx, {
            type: chartConfig.type,
            data: {
                labels: chartConfig.labels,
                datasets: chartConfig.datasets,
            },
            options: {
                responsive: true,
                // indexAxis: chartConfig.isHorizontal ? 'y' : 'x',
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: yTitle,
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: chartConfig.isHorizontal
                                ? `${chartConfig.labels[0]}`
                                : `${chartConfig.labels[0]} - ${chartConfig.labels[chartConfig.labels.length - 1]}`,
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: chartTitle,
                    },
                },
            },
        });
        chart.current = [...chart.current, myChart];
    }



    const destroyCharts = () => {
        if (chart.current.length !== 0) {
            for (let i = 0; i < chart.current.length; i++) {
                const value = chart.current[i];
                value.destroy();
            }
            chart.current = [];
        }
        if (pointSelected.lat && pointSelected.lon) showChart();
    };

    function showChart() {
        const { destiny, origin, nse, visitas }: any = parseCharts(pointSelected);
        const visitsChartConfig: chartConfig = {
            datasets: visitas.datasets,
            type: 'line',
            isHorizontal: false,
            labels: visitas.labels,
        };
        const destinyChartConfig: chartConfig = {
            datasets: destiny.datasets,
            type: 'bar',
            isHorizontal: false,
            labels: destiny.labels,
        };
        const originChartConfig: chartConfig = {
            datasets: origin.datasets,
            type: 'bar',
            isHorizontal: false,
            labels: origin.labels,
        };
        const nseChartConfig: chartConfig = {
            datasets: nse.datasets,
            type: 'bar',
            isHorizontal: false,
            labels: nse.labels,
        };
        initChart(visitsChartConfig, 'visitsChart', 'Gráfico de Visitas', '');
        initChart(originChartConfig, 'originChart', 'Gráfico de Origen', '0 - 100%');
        initChart(destinyChartConfig, 'destinyChart', 'Gráfico de Destino', '0 - 100%');
        initChart(nseChartConfig, 'nseChart', 'Gráfico de NSE (Nivel Socio Económico)', '0 - 100%');
    }

    return (
        <div id='float-pane-section' className='float-pane float-pane-active scroll'>
            <header>
                <div className='d-flex chart-type justify-content-between align-content-center align-items-center'>
                    <h1>Gráficos</h1>
                </div>
            </header>
            <div className='chart-pane'>

            </div>
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Charts);
