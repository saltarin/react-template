import * as React from "react";
import { Map } from "../../components/Map";
import { Card } from "../../components/Card";
import { Waypoints } from "../../components/Waypoints";
import { Controls } from "../../components/Controls";
import { GoogleMapsApi } from "../../GoogleApi";
import { GoogleMap } from "@app/src/components/GoogleMap";

const API_KEY = 'DODO';

interface State {
  hub: object;
  waypoints: object[];
  selectedPoint: object;
}

export class Container extends React.Component<{}, State> {

  private distanceMatrixService;
  private directionsService;
  private directionsRenderer;
  private $googleMap = React.createRef();
  private googleMap;

  constructor(props) {
    super(props);
    this.state = {
      hub: { lat: -12.157434, lng: -76.957163, distanceToHub: 0 },
      waypoints: [],
      selectedPoint: null
    };
    this.distanceMatrixService = null;
    this.directionsService = null;
  }

  componentDidMount() { 
    GoogleMapsApi.load(this.initializeGoogleMapsService, API_KEY);
    GoogleMapsApi.load(this.initializeGoogleMaps, API_KEY);
  }

  initializeGoogleMaps = () => {
    this.googleMap = new (window as any).google.maps.Map(this.$googleMap.current, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    this.directionsRenderer = new (window as any).google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.googleMap);
  }

  initializeGoogleMapsService = () => {
    this.distanceMatrixService = new (window as any).google.maps.DistanceMatrixService();
    this.directionsService = new (window as any).google.maps.DirectionsService();
    
  }

  setSelectedPoint = point => {
    this.setState({ selectedPoint: point });
  };

  addPointHandler = () => {
    let { waypoints } = this.state;
    if (!this.state.selectedPoint) {
      return;
    }
    const hubAsGooglePoint = new (window as any).google.maps.LatLng(this.state.hub.lat, this.state.hub.lng);
    const selectedAsGooglePoint = new (window as any).google.maps.LatLng(this.state.selectedPoint.lat, this.state.selectedPoint.lng);
    const dist = (window as any).google.maps.geometry.spherical.computeDistanceBetween(hubAsGooglePoint, selectedAsGooglePoint);
    waypoints = [
      ...waypoints,
      {
        ...this.state.selectedPoint,
        distanceToHub: dist
      }
    ];
    console.log('dist', dist);
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

    const longestPoint = total.reduce((largest, current) => {
      return largest.distanceToHub < current.distanceToHub ? current : largest;
    },total[0]);

    console.log('longestPoint to Hub', longestPoint);
    const googlePoints = total.map(point => {
        return new (window as any).google.maps.LatLng(point.lat, point.lng)
    });

    const getDepartureTime = () => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 30);
        return currentTime;
    }

    const origin = googlePoints[0];
    const destinations = googlePoints.slice(1);
    const waypointsAsGooglePoints = googlePoints.filter((gp => gp.distance !== longestPoint.distance));
    const destinationAsGooglePoint = new (window as any).google.maps.LatLng(longestPoint.lat, longestPoint.lng);

    console.log('origin', origin);
    console.log('destinations', destinations);
    console.log('waypointsAsGooglePoints', waypointsAsGooglePoints);
    console.log('destinationAsGooglePoint', destinationAsGooglePoint);
    
    this.distanceMatrixService.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: (window as any).google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: true
    }, (response, status) => {
        console.log('distanceMatrixService.getDistanceMatrix >>', response);
        console.log('status', status);
    });

    this.directionsService.route({
      avoidHighways: false,
      avoidTolls: false,
      origin: origin,
      destination: destinationAsGooglePoint,
      waypoints: waypointsAsGooglePoints.map(gp => ({
        location: gp,
        stopover: true
      })),
      drivingOptions: {
        departureTime: getDepartureTime(),
        trafficModel: (window as any).google.maps.TrafficModel.BEST_GUESS
      },
      travelMode: 'DRIVING',
      unitSystem: (window as any).google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true
    }, (response, status) => {
      console.log('directionsService.route >>', response);
      console.log('json', JSON.stringify(response));
      console.log('status', status);
      this.directionsRenderer.setDirections(response);
    })
  };

  render() {
    return (
      <>
        <h1>Routing</h1>
        <Map
            setSelectedPoint={this.setSelectedPoint}
            hub={this.state.hub}
            waypoints={this.state.waypoints} />
        <div style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            <Card
              title="hub"
              position="0"
              latitude={this.state.hub.lat}
              longitude={this.state.hub.lng}
              distance={this.state.hub.distanceToHub}
              color={"blue"}
            />
            <Waypoints points={this.state.waypoints} />
          </div>
          <Controls
            addClickhandler={this.addPointHandler}
            routingClickHandler={this.rutingPointsHandler}
          />
        </div>
        <GoogleMap ref={this.$googleMap}/>
      </>
    );
  }
}
