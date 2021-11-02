import { injectComponents, MapPopoverFactory } from 'kepler.gl/dist/components';
import LocationTooltipFactory from './LocationTooltip';

const KeplerGl = injectComponents([[MapPopoverFactory, LocationTooltipFactory]]);

export default KeplerGl;
