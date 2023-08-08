import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source, MapRef, Marker } from "react-map-gl";
import React, {useRef, useState } from "react";
import { cellToBoundary } from "h3-js";



function MapBox() {

    const nycHexagonsObj = require('../data/nyc_hexagons_count.json');
    const [nycHexagonsArr, setNycHexagonsArr] = useState([]);

    const onLoad = () => {
        const nyc_HexagonsArr = [];

        for (const hexagon in nycHexagonsObj) {
            nyc_HexagonsArr.push({
              hexindex7: hexagon,
              bookingCount: nycHexagonsObj[hexagon]
            });
        }
        
        const rs = nyc_HexagonsArr.map((row) => {
            const style = getStyle(row);
            return {
              type: "Feature",
              properties: {
                color: style.color,
                opacity: style.opacity,
                id: row.hexindex7,
              },
              geometry: {
                type: "Polygon",
                coordinates: [cellToBoundary(row.hexindex7, true)],
              },
            };
        });
        setNycHexagonsArr(rs);
        
    };

    const getRandomStyle = (row) => {
        const styles = [
            {
              color: '#FEDD87',
              opacity: 0.2
            },
            {
              color: '#FED976',
              opacity: 0.4
            },
            {
              color: "#FC9653",
              opacity: 0.6,
            },
            {
              color: "#F77645",
              opacity: 0.7
            },
            {
              color: "#E14C48",
              opacity: 0.8
            }
          ];

          return styles[(Math.floor(Math.random()*styles.length))];
    }

    const getStyle = (row) => {

        // console.log(row);
    
        const styles = [
          {
            color: '#FEDD87',
            opacity: 0.2
          },
          {
            color: '#FED976',
            opacity: 0.4
          },
          {
            color: "#FC9653",
            opacity: 0.6,
          },
          {
            color: "#F77645",
            opacity: 0.7
          },
          {
            color: "#E14C48",
            opacity: 0.8
          }
        ];
    
    
        if (Number(row.bookingCount) === 0) {
          return {opacity: 0};
        }
    
        if (Number(row.bookingCount) < 5000) {
          return styles[0];
        }
        if (Number(row.bookingCount) < 10000) {
          return styles[1];
        }
        if (Number(row.bookingCount) < 15000) {
          return styles[2];
        }
        if (Number(row.bookingCount) < 200000) {
          return styles[3];
        }
        return styles[4];
    };
  
    return (
      
        <div>
          <div className="map">
            <Map
              initialViewState={{
                latitude: 40.73403288828138,
                longitude: -73.98740828720453,
                zoom: 10,
                bearing: 0,
                pitch: 0,
              }}
              mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxAccessToken="pk.eyJ1IjoiYWFzMDUwIiwiYSI6ImNsa2dwOWpydzAxd3YzZW84ZmUyN2Q0NTcifQ.y4ObPEznE60uGlA6ZKVgNA"
              style={{
                height: "100vh",
                width: "100vw",
              }}
              onLoad={onLoad}
            >
              <Source
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: nycHexagonsArr
                }}
              >
                <Layer
                  {...{
                    id: "polyline-layer",
                    type: "fill",
                    paint: {
                      'fill-outline-color': 'white',
                      "fill-color": ["get", "color"],
                      "fill-opacity": ["get", "opacity"],
                    },
                  }}
                />
              </Source>
              
  
  
            </Map>
          </div> 
        </div>
    );
  
};
  
export default MapBox;
