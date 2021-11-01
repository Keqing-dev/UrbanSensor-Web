import 'moment/locale/es';
import * as _ from 'lodash';

type NSE = {
    NSE: string;
    percentage: number;
    week: number;
};

type Visitas = {
    visitas: number;
    week: number;
};

type Origin = {
    comuna: string;
    percentage: number;
    week: number;
};

type Destiny = Origin;

type PointChart = NSE & Visitas & Origin & Destiny;

type PointCharts = Map<string, Array<PointChart>>;

export function parseCharts(pointSelected: any) {
    const getGroupedOriginOrDestiny = (data: Array<Origin | Destiny>) => {
        return _.groupBy(
            Object.values(_.groupBy(data, (data: Origin | Destiny) => data.week))
                .map((value) => _.orderBy(value, ['percentage'], ['desc']))
                .map((data) => _.slice(data, 0, 5))
                .flat(),
            (data: Destiny) => data.comuna,
        ) as unknown as PointCharts;
    };

    const getWeeks = (groupedOrigin: Map<string, Array<PointChart>>) => {
        return Math.max.apply(
            Math,
            Object.entries(groupedOrigin).map(([_, value]) => Math.max(...value.map((data: PointChart) => data.week))),
        );
    };

    const fillEmptyWeeks = (weeks: number, grouped: Map<string, Array<PointChart>>) => {
        for (let i = 1; i <= weeks; i++) {
            let keys = Object.values(grouped)
                .map((data) => data.map((data: any) => Object.keys(data)).flat())
                .flat();
            keys = _.uniqWith(keys, _.isEqual);
            Object.values(grouped).forEach((data, _) => {
                if (data[i - 1]?.week !== i)
                    data.splice(i - 1, 0, { [keys[0]]: data[0][keys[0]], percentage: 0, week: i });
            });
        }
    };

    if (pointSelected.lat && pointSelected.lon) {
        const groupedDestiny = getGroupedOriginOrDestiny(pointSelected.destiny);
        const groupedOrigin = getGroupedOriginOrDestiny(pointSelected.origin);
        const groupedNse = _.groupBy(pointSelected.nse, (data: NSE) => data.NSE) as unknown as PointCharts;

        const destinyWeeks = getWeeks(groupedDestiny);
        const originWeeks = getWeeks(groupedOrigin);
        const nseWeeks = getWeeks(groupedNse);

        fillEmptyWeeks(destinyWeeks, groupedDestiny);
        fillEmptyWeeks(originWeeks, groupedOrigin);
        fillEmptyWeeks(nseWeeks, groupedNse);

        const destiny = parseChart(groupedDestiny, (data) => data.percentage * 100);
        const origin = parseChart(groupedOrigin, (data) => data.percentage * 100);
        const nse = parseChart(groupedNse, (data) => data.percentage * 100);
        const visitas = parseChart(pointSelected.visitas, (data) => data.visitas);

        return {
            destiny,
            origin,
            nse,
            visitas,
        };
    }
}

function parseChart(grouped: PointCharts, callback: (data: PointChart) => number) {
    let datasets: Array<any> = [];
    let labels: Array<string> = [];
    let weeks: number;

    // noinspection SuspiciousTypeOfGuard
    if (grouped instanceof Array) {
        datasets.push({
            label: Object.keys(grouped[0])[0],
            data: grouped.map(callback),
            backgroundColor: getChartColors(1),
            borderColor: getChartColors(1),
            borderWidth: 1,
        });
        weeks = Math.max.apply(
            Math,
            grouped.map((data) => data.week),
        );
    } else {
        Object.entries(grouped).forEach(([key, value]: [string, Array<PointChart>], index) => {
            datasets.push({
                label: key,
                data: value.map(callback),
                backgroundColor: getChartColors(index),
                borderColor: getChartColors(index),
                borderWidth: 1,
            });
        });
        weeks = Math.max.apply(
            Math,
            Object.entries(grouped).map(([_, value]) => Math.max(...value.map((data: PointChart) => data.week))),
        );
    }

    for (let i = 1; i <= weeks; i++) {
        labels.push(`Semana ${i}`);
    }

    return { datasets, labels, weeks };
}

function getChartColors(num: number) {
    switch (num) {
        case 0:
            return ['rgba(255, 99, 132, 0.5)'];
        case 1:
            return ['rgba(255, 159, 64, 0.5)'];
        case 2:
            return ['rgba(255, 205, 86, 0.5)'];
        case 3:
            return ['rgba(75, 192, 192, 0.5)'];
        case 4:
            return ['rgba(54, 162, 235, 0.5)'];
        default:
            return ['rgba(153, 102, 255, 0.5)'];
    }
}

// function isChartHorizontal(num: number): boolean {
//     if (num <= 5) {
//         return false;
//     }
//     return true;
// }
