import L from "leaflet";

L.Control.CustomButton = L.Control.extend({
  onAdd: map => {
    var button = L.DomUtil.create("button");
    button.style.width = "100px";
    button.innerText = "Click!";
    L.DomEvent.on(button, "click", e => {
      L.DomEvent.stopPropagation(e);
      console.log("click");
    });
    L.DomEvent.on(button, "dblclick", e => {
      L.DomEvent.stopPropagation(e);
    });
    L.DomEvent.on(button, "dblclick", e => {
      L.DomEvent.stopPropagation(e);
    });

    L.DomEvent.on(button, "mouseover", e => {
      map.dragging.disable();
    });
    L.DomEvent.on(button, "mouseout", e => {
      map.dragging.enable();
    });

    return button;
  },
  onRemove: () => {}
});

L.control.customButton = props => {
  return new L.Control.CustomButton(props);
};
