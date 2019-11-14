import * as React from "react";
import { L } from "../../Leaflet";

const DEFAULT_TILE_API = "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
const WIKI_TILE_API = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";
const MONO_TILE_API = "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png";

const XY = [-12.157427, -76.957175];

interface Props {
  setSelectedPoint: React.MouseEventHandler;
}

export class Map extends React.Component<Props> {
  private $map = React.createRef();
  private map;
  private cord;
  private marker;

  componentDidMount() {
    const defaultTile = L.tileLayer(DEFAULT_TILE_API, {
      maxZoom: 19,
      id: "default"
    });
    const wikiTile = L.tileLayer(WIKI_TILE_API, {
      maxZoom: 19,
      id: "wiki"
    });

    const monoTile = L.tileLayer(MONO_TILE_API, {
      maxZoom: 19,
      id: "mono"
    });

    console.log("consumiendo api tile");
    this.map = L.map(this.$map.current, {
      layers: [defaultTile, wikiTile, monoTile],
      attributionControl: false
    });

    this.map.on("click", e => {
      this.cord = e.latlng;
      this.map.setView(this.cord);
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.props.setSelectedPoint(this.cord);
      this.marker = this.createMarker(this.cord);
      this.marker.addTo(this.map);
      const popup = ({ lat, lng }) => `latitud: ${lat} | longitud: ${lng}`;
      this.marker
        .bindPopup(popup(this.cord), {
          maxWidth: 420
        })
        .openPopup();
    });

    this.map.setView(XY, 18);

    const span = str =>
      `<span style='width: 40px; display:inline-block'>${str}</span>`;
    L.control
      .layers(
        {
          [span(defaultTile.options.id)]: defaultTile,
          [span(wikiTile.options.id)]: wikiTile,
          [span(monoTile.options.id)]: monoTile
        },
        {},
        {
          position: "bottomleft"
        }
      )
      .addTo(this.map);

    L.control.customButton({ position: "topcenter" }).addTo(this.map);

    L.control
      .scale({ position: "bottomright", imperial: false })
      .addTo(this.map);
    /*
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider
    }).addTo(this.map);
    */
  }

  createMarker = latlng => {
    return L.marker(latlng);
  };

  render() {
    return (
      <div
        ref={this.$map}
        style={{ height: "400px", border: "1px solid #000" }}
      />
    );
  }
}
