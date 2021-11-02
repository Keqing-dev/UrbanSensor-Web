import styled from 'styled-components';
import { CenterFlexbox } from 'kepler.gl/dist/components/common/styled-components';
import { Layers } from 'kepler.gl/dist/components/common/icons';
import { notNullorUndefined } from 'kepler.gl/dist/utils/data-utils';
import { getTooltipDisplayDeltaValue, getTooltipDisplayValue } from 'kepler.gl/dist/utils/interaction-utils';
import React from 'react';

export const StyledLayerName = styled(CenterFlexbox)`
    color: ${(props) => props.theme.textColorHl};
    font-size: 12px;
    letter-spacing: 0.43px;
    text-transform: capitalize;

    svg {
        margin-right: 4px;
    }
`;

const StyledTable = styled.table`
    & .row__delta-value {
        text-align: right;

        &.positive {
            color: ${(props) => props.theme.primaryBtnBgd};
        }

        &.negative {
            color: ${(props) => props.theme.negativeBtnActBgd};
        }
    }
`;

const Row = ({ name, value, deltaValue, url }: any) => {
    // Set 'url' to 'value' if it looks like a url
    if (!url && value && typeof value === 'string' && value.match(/^http/)) {
        url = value;
    }

    const asImg = /<img>/.test(name);

    let fileComponent;
    if (asImg)
        switch (value) {
            case value.match(/.aac/)?.input:
                fileComponent = (
                    <audio controls>
                        <source src={value} />
                    </audio>
                );
                break;
            case value.match(/.jpg/)?.input:
                fileComponent = <img src={value} alt='' />;
                break;
            case value.match(/.mp4/)?.input:
                fileComponent = (
                    <video height='384' width='216' controls>
                        <source src={value} />
                    </video>
                );
                break;
            default:
                fileComponent = <img src={value} alt='' />;
        }
    return (
        <tr className='row' key={name}>
            <td className='row__name'>{name}</td>
            <td className='row__value'>
                {asImg ? (
                    fileComponent
                ) : url ? (
                    <a target='_blank' rel='noopener noreferrer' href={url}>
                        {value}
                    </a>
                ) : (
                    value
                )}
            </td>
            {notNullorUndefined(deltaValue) && (
                <td className={`row__delta-value ${deltaValue.toString().charAt(0) === '+' ? 'positive' : 'negative'}`}>
                    {deltaValue}
                </td>
            )}
        </tr>
    );
};

const EntryInfo = ({ fieldsToShow, fields, data, primaryData, compareType }: any) => (
    <tbody>
        {fieldsToShow.map((item: any) => (
            <EntryInfoRow
                key={item.name}
                item={item}
                fields={fields}
                data={data}
                primaryData={primaryData}
                compareType={compareType}
            />
        ))}
    </tbody>
);

const EntryInfoRow = ({ item, fields, data, primaryData, compareType }: any) => {
    const fieldIdx = fields.findIndex((f: any) => f.name === item.name);
    if (fieldIdx < 0) {
        return null;
    }
    const field = fields[fieldIdx];
    const displayValue = getTooltipDisplayValue({ item, field, data, fieldIdx });

    const displayDeltaValue = getTooltipDisplayDeltaValue({
        item,
        field,
        data,
        fieldIdx,
        primaryData,
        compareType,
    });

    return <Row name={field.displayName || field.name} value={displayValue} deltaValue={displayDeltaValue} />;
};

const CellInfo = ({ data, layer }: any) => {
    const { colorField, sizeField } = layer.config;

    return (
        <tbody>
            <Row name={'total points'} key='count' value={data.points && data.points.length} />
            {colorField && layer.visualChannels.color ? (
                <Row
                    name={layer.getVisualChannelDescription('color').measure}
                    key='color'
                    value={data.colorValue || 'N/A'}
                />
            ) : null}
            {sizeField && layer.visualChannels.size ? (
                <Row
                    name={layer.getVisualChannelDescription('size').measure}
                    key='size'
                    value={data.elevationValue || 'N/A'}
                />
            ) : null}
        </tbody>
    );
};

type LayerHoverInfo = {
    fields: Array<any>;
    fieldsToShow: Array<any>;
    layer: any;
    data: Array<any> | object;
};

const LayerHoverInfoFactory = () => {
    return (props: LayerHoverInfo) => {
        const { data, layer } = props;

        if (!data || !layer) {
            return null;
        }

        return (
            <div className='map-popover__layer-info'>
                <StyledLayerName className='map-popover__layer-name'>
                    <Layers height='12px' />
                    {props.layer.config.label}
                </StyledLayerName>
                <StyledTable>
                    {props.layer.isAggregated ? <CellInfo {...props} /> : <EntryInfo {...props} />}
                </StyledTable>
            </div>
        );
    };
};

export default LayerHoverInfoFactory;
