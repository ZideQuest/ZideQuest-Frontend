import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { TimeRanges, useState } from "react";

function menubar({ h }) {
  return (
    <div
      style={{
        position: "absolute",
      }}
    ></div>
  );
}

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [marker, setMarker] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [work, setWork] = useState(true);
  const [menu, setMenu] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const handleMapClick = (e) => {
    if (!work) return;

    let lat = e.latLng.lat();
    let lng = e.latLng.lng();

    setMarker([...marker, { lat, lng }]);
    setIsShow(true);
    setWork(false);
  };

  const mapOptions = {
    center: { lat: 13.84829, lng: 100.569342 },
    zoom: 16,
    minZoom: 16,
    restriction: {
      latLngBounds: {
        north: 13.858535,
        south: 13.839878,
        west: 100.560613,
        east: 100.586167,
      },
      strictBounds: false,
    },
  };

  const onClose = () => {
    setIsShow(false);
    setWork(true);
  };

  const onMarkerEvent = (event) => {
    setIsShow((current) => !current);
  };

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "10vh",
          backgroundColor: "white",
          boxShadow: "1px 1px 30px 1px black !important",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              cursor: "pointer",
              width: "46px",
              height: "46px",
              marginLeft: "40px",
              transform: menu ? "rotate(90deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          >
            <img
              onClick={() => [
                !isShow && (setMenu((menu) => !menu), setWork((work) => !work)),
              ]}
              src="7612954.png"
              width="46px"
              height="46px"
              cursor="pointer"
            />
          </div>

          <div
            style={{
              className: "MENU",
              position: "absolute",
              zIndex: 9,
              width: "50px",
              marginLeft: "38px",
              marginTop: "40px",
              minHeight: menu ? "400px" : "0px",
              maxHeight: TimeRanges > 0.2 ? "auto" : "0px",
              height: "auto",
              transition: "0.5s ",
              borderRadius: "30px",
              backgroundColor: "#E86A33",
              visibility: menu ? "visible" : "hidden",
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr 1fr",
              alignItems: "center",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                marginLeft: "4px",
                transitionDelay: menu ? "0.25s" : "0s",
                display: menu ? "block" : "none",
              }}
            >
              <img
                src="search.png"
                width="auto"
                height="36px"
                color="white"
              ></img>
            </div>
            <div
              style={{
                cursor: "pointer",
                marginLeft: "9px",
                transitionDelay: menu ? "0.25s" : "0s",
                display: menu ? "block" : "none",
              }}
            >
              <img
                src="filter.png"
                width="auto"
                height="36px"
                color="white"
              ></img>
            </div>
            <div
              style={{
                cursor: "pointer",
                marginLeft: "3px",
                transitionDelay: menu ? "0.25s" : "0s",
                display: menu ? "block" : "none",
              }}
            >
              <img
                src="plus.png"
                width="auto"
                height="36px"
                color="white"
              ></img>
            </div>
            <div
              style={{
                cursor: "pointer",
                marginLeft: "6px",
                transitionDelay: menu ? "0.25s" : "0s",
                display: menu ? "block" : "none",
              }}
            >
              <img
                src="shoot.png"
                width="auto"
                height="36px"
                color="white"
              ></img>
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: "10px",
            fontFamily: "Kanit",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "32px",
            lineHeight: "36px",
            color: "#E86A33",
          }}
        >
          ZideQuest
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "40px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            style={{
              width: "106px",
              height: "46px",
              borderRadius: "10px",
              backgroundColor: "#E86A33",
              border: "none",
              cursor: "pointer",
              color: "white",
              letterSpacing: "0.15em",
            }}
          >
            Login
          </button>
        </div>
      </div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={{
            margin: "auto",
            width: "100%",
            height: "90vh",
          }}
          zIndex="95"
          position="relative"
          mapContainerClassName="map-container"
          center={{ lat: 13.84829, lng: 100.569342 }}
          zoom={16}
          options={mapOptions}
          onClick={(e) => handleMapClick(e)}
        >
          {marker.map((item, index) => (
            <MarkerF position={item} />
          ))}
        </GoogleMap>
      )}
      <div
        style={{
          zIndex: 99,
          width: "100%",
          height: "60vh",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          visibility: isShow ? "visible" : "hidden",
        }}
      >
        <div style={{ color: "black" }} onClick={onClose}>
          click to close
        </div>
      </div>
    </div>
  );
};

export default App;
