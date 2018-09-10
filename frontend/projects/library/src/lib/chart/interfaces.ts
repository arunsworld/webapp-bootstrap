import { format, formatLocale } from 'd3';
import { symbolCircle, symbolDiamond, symbolSquare, symbolTriangle, symbolStar } from 'd3';
import { duration } from 'moment';
import { curveLinear, curveStepBefore, curveBasis, curveCardinal} from 'd3';

export const NaturalColors = {
    blue: '#0087BD',
    green: '#009F6B',
    red: '#C40233',
    yellow: '#FFD300'
};

export const Formatters = {
    percentage: (decimals = 0) => format('.' + decimals + '%'),
    currency: (currency = '$') => {
        const locale = formatLocale({
            decimal: '.',
            thousands: ',',
            grouping: [3],
            currency: [currency, '']
        });
        return locale.format('($.0f');
    },
    timeDuration: (units: any) => {
        return (value: any) => duration(value, units).format();
    },
    thousands: () => format(','),
    generic: (specifier: string) => format(specifier)
};

export const Symbols = {
    circle: symbolCircle,
    diamond: symbolDiamond,
    square: symbolSquare,
    triangle: symbolTriangle,
    star: symbolStar
};

export const CurveOptions = {
    linear: curveLinear,
    step: curveStepBefore,
    basis: curveBasis,
    cardinal: curveCardinal
};

export * from './ab-chart/interfaces';
export * from './ab-bubble/interfaces';
