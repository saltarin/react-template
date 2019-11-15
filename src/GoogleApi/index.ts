export class GoogleMapsApi {
    static callBacks = [];
    static scriptLoaded = false;
    static load(callback, key) {
        GoogleMapsApi.callBacks.push(callback);
        if(!GoogleMapsApi.scriptLoaded) {
            const apiUrl = GoogleMapsApi.getApiUrl(key);
            GoogleMapsApi.appendScript(apiUrl);
        }
        (window as any).mapCallbacks = GoogleMapsApi.mapCallbacks.bind(this);
    }
    static getApiUrl(key) {
        return `https://maps.googleapis.com/maps/api/js?key=${key}&callback=mapCallbacks&libraries=geometry`;
    }
    static appendScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
        GoogleMapsApi.scriptLoaded = true;
    }

    static mapCallbacks() {
        this.triggerCallbacks();
        delete (window as any).mapCallbacks;
    }

    static triggerCallbacks() {
        GoogleMapsApi.callBacks.forEach(callback => callback());
        GoogleMapsApi.callBacks = [];
    }
}