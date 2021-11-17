import { useEffect, useRef } from "react";

interface RenderMapProp {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const RenderMap: React.FC<RenderMapProp> = ({ center, zoom }) => {
  const googleMapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(googleMapRef.current, {
      center,
      zoom: zoom,
    });

    new google.maps.Marker({
      position: center,
      map: map,
    });
  });

  return (
    <div ref={googleMapRef} id="map" className="w-full h-full">
      <p>Please enter your address.</p>
    </div>
  );
};

export default RenderMap;
