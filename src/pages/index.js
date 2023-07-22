import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { TimeRanges, useState } from "react";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [marker, setMarker] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [work, setWork] = useState(true);
  const [menu, setMenu] = useState(false);
  const [plusplace, setPlusplace] = useState(false);
  const [add, setAdd] = useState(false);
  const [plus, setPlus] = useState(false);

  const router = useRouter();
  const handleClick = (path) => {
    router.push(path);
  };

  const handleMapClick = (e) => {
    if (!work) return;

    let lat = e.latLng.lat();
    let lng = e.latLng.lng();

    setMarker([...marker, { lat, lng }]);
    setIsShow(true);
    setWork(false);
  };

  const handleAdd = () => {
    setAdd(true);
    setPlus(false);
  };

  const handlePlus = () => {
    setPlus(true);
    setPlusplace(true);
    setWork(false);
    // setMenu(true);
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
    setAdd(false);
    setPlus(false);
    setPlusplace(false);
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
                !add &&
                  !isShow &&
                  (setMenu((menu) => !menu), setWork((work) => !work)),
              ]}
              src="7612954.png"
              width="46px"
              height="46px"
              cursor="pointer"
            />
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 9,
              width: "50px",
              marginLeft: "38px",
              marginTop: "40px",
              minHeight: menu ? "400px" : "0px",
              maxHeight: TimeRanges > 0.2 ? "auto" : "0px",
              transition: "0.5s ",
              borderRadius: "30px",
              backgroundColor: "#E86A33",
              visibility: menu ? "visible" : "hidden",
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr",
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
              <img src="search.png" height="36px" className="zoom"></img>
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
                className="zoom"
              ></img>
            </div>
            <div
              style={{
                cursor: "pointer",
                marginLeft: "2px",
                transitionDelay: menu ? "0.25s" : "0s",
                display: menu ? "block" : "none",
              }}
            >
              <img
                src="plus.png"
                width="auto"
                height="36px"
                color="white"
                className="zoom"
              ></img>
            </div>
            {/* <div
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
                className="zoom"
              ></img>
            </div> */}
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
      {/* <View style={styles.container}>
        <MapView style={styles.map} />
      </View> */}
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
            <MarkerF position={item} onClick={() => handlePlus()} />
          ))}
        </GoogleMap>
      )}
      <div
        style={{
          zIndex: 99,
          width: "100%",
          height: isShow ? "60vh" : "0px",
          transition: "0.5s",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          visibility: isShow ? "visible" : "hidden",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // height: "60vh",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <h1>เพิ่มสถานที่ใหม่</h1>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <form class="w3-container w3-card-4 w3-light-grey">
            <label for="name">ชื่อสถานที่</label>
            <br></br>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                width: "430px",
                color: "black",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#F8F8FF",
                border: "solid",
              }}
            ></input>
            <br></br>
            <br></br>
            <label for="name">รายละเอียด</label>
            <br></br>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                width: "430px",
                color: "black",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#F8F8FF",
                border: "solid",
              }}
            ></input>
          </form>
        </div>
        <div
          style={{
            marginTop: "15px",
            marginRight: "351px",
          }}
        >
          เพิ่มรูปภาพ
        </div>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "16px",
            marginRight: "351px",
          }}
        >
          <img src="camera.svg" style={{ height: "30px", cursor: "pointer" }} />
          <img src="images.svg" style={{ height: "30px", cursor: "pointer" }} />
        </div>
        <div className="create">
          <button
            onClick={onClose}
            style={{
              width: "430px",
              marginTop: "50px",
              height: "46px",
              borderRadius: "10px",
              backgroundColor: "#E86A33",
              border: "none",
              cursor: "pointer",
              color: "white",
              letterSpacing: "0.15em",
            }}
          >
            สร้างสถานที่
          </button>
        </div>
      </div>
      <div
        style={{
          zIndex: 99,
          width: "100%",
          height: plusplace ? "60vh" : "0px",
          transition: "0.5s",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          visibility: plusplace ? "visible" : "hidden",
          color: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // width: "100%",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // marginTop: "329px",
            visibility: plus ? "visible" : "hidden",
          }}
        >
          <button
            onClick={() => handleAdd()}
            style={{
              width: add ? "0px" : "100px",
              height: "100px",
              display: "flex",
              border: "solid",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "1000px",
              backgroundColor: "#E86A33",
              fontSize: "50px",
              cursor: "pointer",
              bottom: "0px",
            }}
          >
            +
          </button>
        </div>
      </div>
      <div
        style={{
          zIndex: 99,
          width: "100%",
          height: add ? "60vh" : "0px",
          transition: "0.5s",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          visibility: add ? "visible" : "hidden",
          color: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: "430px",

            marginTop: "50px",
            height: "46px",
            borderRadius: "10px",
            backgroundColor: "#E86A33",
            border: "none",
            cursor: "pointer",
            color: "white",
            letterSpacing: "0.15em",
          }}
        >
          สร้างกิจกรรม
        </button>
      </div>
    </div>
  );
};

export default App;
