import * as React from "react";
import { Map } from "../../components/Map";
import { Card } from "../../components/Card";
import { Waypoints } from "../../components/Waypoints";
import { Controls } from "../../components/Controls";
import { GoogleMapsApi } from "../../GoogleApi";


const API_KEY = 'NONO';

interface State {
  hub: object;
  waypoints: object[];
  selectedPoint: object;
}

export class Container extends React.Component<{}, State> {

  private distanceMatrixService;
  constructor(props) {
    super(props);
    this.state = {
      hub: { lat: -12.157434, lng: -76.957163 },
      waypoints: [],
      selectedPoint: null
    };
    this.distanceMatrixService = null;
  }

  componentDidMount() {
    GoogleMapsApi.load(this.initializeGoogleMapsService, API_KEY);
  }

  initializeGoogleMapsService = () => {
    this.distanceMatrixService = new (window as any).google.maps.DistanceMatrixService();
  }

  setSelectedPoint = point => {
    this.setState({ selectedPoint: point });
  };

  addPointHandler = () => {
    let { waypoints } = this.state;
    if (!this.state.selectedPoint) {
      return;
    }
    waypoints = [
      ...waypoints,
      {
        ...this.state.selectedPoint
      }
    ];
    this.setState({
      waypoints
    });
  };

  rutingPointsHandler = () => {
    let { hub, waypoints } = this.state;
    const pointToString = point => `[lat: ${point.lat} | lng: ${point.lng}]`;
    const total = [hub, ...waypoints];
    const pointsAsString = total.map(point => pointToString(point)).join(",");
    const message = `Los puntos a rutear son: ${pointsAsString}`;
    console.log(message);
    if(total.length <= 1) {
        return;
    }
    const googlePoints = total.map(point => {
        return new (window as any).google.maps.LatLng(point.lat, point.lng)
    });

    const origin = googlePoints[0];
    const destinations = googlePoints.slice(1);
    console.log(googlePoints);
    this.distanceMatrixService.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: (window as any).google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: true
    }, (response, status) => {
        console.log('response', response);
        console.log('status', status);
    })
  };

  render() {
    return (
      <>
        <h1>Routing</h1>
        <Map setSelectedPoint={this.setSelectedPoint} />
        <div style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            <Card
              title="hub"
              position="0"
              latitude={this.state.hub.lat}
              longitude={this.state.hub.lon}
              color={"blue"}
            />
            <Waypoints points={this.state.waypoints} />
          </div>
          <Controls
            addClickhandler={this.addPointHandler}
            routingClickHandler={this.rutingPointsHandler}
          />
        </div>
      </>
    );
  }
}
