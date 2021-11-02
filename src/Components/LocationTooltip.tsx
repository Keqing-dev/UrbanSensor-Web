import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Pin } from 'kepler.gl/dist/components/common/icons';
import { CoordinateInfoFactory } from 'kepler.gl/dist/components';
import { FormattedMessage } from 'kepler.gl/dist/localization';
import Tippy from '@tippyjs/react';
import styled from 'styled-components';
import LayerHoverInfoFactory from './LayerHoverInfo';

const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

const StyledMapPopover = styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${MAX_WIDTH}px;
    max-height: ${MAX_HEIGHT}px;
    padding: 14px;
    & > * + * {
        margin-top: 6px;
    }
    ${(props: any) => props.theme.scrollBar};
    font-family: ${(props: any) => props.theme.fontFamily};
    font-size: 11px;
    font-weight: 500;
    background-color: ${(props: any) => props.theme.panelBackground};
    color: ${(props: any) => props.theme.textColor};
    z-index: 1000;
    overflow-x: auto;
    box-shadow: ${(props: any) => props.theme.panelBoxShadow};
    :hover {
        background-color: ${(props: any) => `${props.theme.panelBackground}dd`};
    }
    .primary-label {
        color: ${(props: any) => props.theme.notificationColors.success};
        font-size: 10px;
    }
    .map-popover__layer-info,
    .coordingate-hover-info {
        & > * + * {
            margin-top: 7px;
        }
    }
    table {
        width: auto;
        display: grid;
        border-collapse: collapse;
        row-gap: 5px;
        column-gap: 5px;
    }
    .coordingate-hover-info > table {
        grid-template-columns: auto auto auto;
    }
    .map-popover__layer-info > table {
        grid-template-columns: auto auto;
    }
    tbody,
    tr {
        display: contents;
    }
    td {
        border-color: transparent;
        color: ${(props: any) => props.theme.textColor};
    }
    td.row__value {
        text-align: right;
        font-weight: 500;
        color: ${(props: any) => props.theme.textColorHl};
    }
`;

const PinnedButtons = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
    justify-items: center;
    & > * + * {
        margin-left: 10px;
    }
`;

const PopoverContent = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 12px;
    }
`;

const StyledIcon = styled.div`
    color: ${(props: any) => props.theme.activeColor};
    :hover {
        cursor: pointer;
        color: ${(props: any) => props.theme.linkBtnColor};
    }
`;

function createVirtualReference(container: any, x: any, y: any, size = 0) {
    const bounds = container && container.getBoundingClientRect ? container.getBoundingClientRect() : {};
    const left = (bounds.left || 0) + x - size / 2;
    const top = (bounds.top || 0) + y - size / 2;
    return {
        left,
        top,
        right: left + size,
        bottom: top + size,
        width: size,
        height: size,
    };
}

function getOffsetForPlacement({ placement, reference, popper }: any, gap = 20) {
    switch (placement) {
        case 'top-start':
        case 'bottom-start':
            return [gap, gap];
        case 'top-end':
        case 'bottom-end':
            return [-gap, gap];
        default:
            return [0, 0];
    }
}

function getPopperOptions(container: any) {
    return {
        modifiers: [
            {
                name: 'preventOverflow',
                options: {
                    boundary: container,
                },
            },
        ],
    };
}

LocationTooltipFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory];

function LocationTooltipFactory(LayerHoverInfo: any, CoordinateInfo: any) {
    const Tooltip = ({ x, y, frozen, coordinate, layerHoverProp, isBase, zoom, container, onClose }: any) => {
        const [horizontalPlacement, setHorizontalPlacement] = useState('start');
        const moveLeft = () => setHorizontalPlacement('end');
        const moveRight = () => setHorizontalPlacement('start');

        return (
            <Tippy
                popperOptions={getPopperOptions(container)}
                zIndex={999} /* should be below Modal which has zIndex=1000 */
                visible={true}
                interactive={true}
                // @ts-ignore
                getReferenceClientRect={() => createVirtualReference(container, x, y)}
                // @ts-ignore
                placement={`bottom-${horizontalPlacement}`}
                // @ts-ignore
                offset={getOffsetForPlacement}
                appendTo={document.body}
                render={(attrs) => (
                    <StyledMapPopover {...attrs} className='map-popover'>
                        {frozen ? (
                            <PinnedButtons>
                                {horizontalPlacement === 'start' && (
                                    <StyledIcon className='popover-arrow-left' onClick={moveLeft}>
                                        <ArrowLeft />
                                    </StyledIcon>
                                )}
                                <StyledIcon className='popover-pin' onClick={onClose}>
                                    <Pin height='16px' />
                                </StyledIcon>
                                {horizontalPlacement === 'end' && (
                                    <StyledIcon className='popover-arrow-right' onClick={moveRight}>
                                        <ArrowRight />
                                    </StyledIcon>
                                )}
                                {isBase && (
                                    <div className='primary-label'>
                                        <FormattedMessage id='mapPopover.primary' />
                                    </div>
                                )}
                            </PinnedButtons>
                        ) : null}
                        <PopoverContent>
                            {Array.isArray(coordinate) && <CoordinateInfo coordinate={coordinate} zoom={zoom} />}
                            {layerHoverProp && <LayerHoverInfo {...layerHoverProp} />}
                        </PopoverContent>
                    </StyledMapPopover>
                )}
            />
        );
    };

    return Tooltip;
}

export default LocationTooltipFactory;
