export function mapConfig(dataId, type) {
  return {
    visState: {
      filters: [],
      layers: [
        {
          id: "xbbp4of3",
          type: "heatmap",
          config: {
            dataId: "reportes_id",
            label: "Reportes HeatMap",
            columns: {
              lat: "lat",
              lng: "lon"
            },
            isVisible: false,
            visConfig: {
              worldUnitSize: 12, // hexagon Radius (KM)
              coverage: 1
            }
          }
        },
        {
          id: "xbbp4of2",
          type: "point",
          config: {
            dataId: "reportes_id",
            label: "Reportes Point",
            columns: {
              lat: "lat",
              lng: "lon"
            },
            color: [227, 26, 26],
            isVisible: true,
            visConfig: {
              worldUnitSize: 12, // hexagon Radius (KM)
              coverage: 1,
              label: "Latitude",
              strokeColor: [0, 0, 0],
              outline: false,
              radius: 40,
              zoom: 11
            }
          }
        }
      ],
      layerBlending: "normal",
      interactionConfig: {
        geocoder: {
          enabled: false
        }
      }
    },
    mapState: {
      zoom: 11
    }
  };
}

export function welokatLayerConfig(dataId, name) {
  return [{
    id: "welocatLayerId",
    type: "geojson",
    config: {
      animate: {
        enabled: true
      },
      dataId: dataId || "welocat_id",
      label: name || "WELOCAT",
      columns: {
        geojson: "_geojson"
      },
      isVisible: false,
      visConfig: {
        filled: true,
        thickness: 0.5,
        strokeColor: [0, 0, 0],

        colorRange: {
          name: "Global Warming",
          type: "sequential",
          category: "Uber",
          colors: [
            "#FFC300",
            "#F1920E",
            "#E3611C",
            "#C70039",
            "#900C3F",
            "#5A1846"
          ],
          reversed: true
        }

      },
      colorField: {
        id: "welokat_index",
        name: "welokat_index"
      },
      colorUI: {
        color: {
          colorRangeConfig: {
            custom: false,
            reversed: true
            // steps: 4
          }
        },
        colorRange: {
          colorRangeConfig: {
            custom: false,
            reversed: true
            // steps: 4
          }
        }
      }
    }
  }];

}

export function pointsLayerConfig(dataId, name) {
  return [
    {
      id: "xbbp4of3",
      type: "heatmap",
      config: {
        dataId: dataId || "reportes_id",
        label: `${name} HeatMap`,
        columns: {
          lat: "Latitude",
          lng: "Longitude"
        },
        isVisible: false,
        visConfig: {
          worldUnitSize: 12, // hexagon Radius (KM)
          coverage: 1
        }
      }
    },
    {
      id: "xbbp4of2",
      type: "point",
      config: {
        dataId: dataId || "reportes_id",
        label: `${name} Puntos`,
        columns: {
          lat: "Latitude",
          lng: "Longitude"
        },
        color: [227, 26, 26],
        isVisible: true,
        visConfig: {
          worldUnitSize: 12, // hexagon Radius (KM)
          coverage: 1,
          label: "Latitude",
          strokeColor: [0, 0, 0],
          outline: false,
          radius: 40,
          zoom: 11
        }
      }
    }
  ];

}


export function tmaLayerConfig(dataId, name) {
  return [
    {
      id: "tmaLayerId",
      type: "geojson",
      config: {
        animate: {
          enabled: true
        },
        dataId: dataId || "tma_id",
        label: name || "Tma",
        columns: {
          geojson: "_geojson"
        },
        isVisible: true,
        visConfig: {
          filled: false,
          thickness: 2,
          strokeColor: [227, 26, 26]
        }
      }
    }
  ];

}
