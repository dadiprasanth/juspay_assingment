import React, { useEffect, useState } from "react";

export default function Sprite(props) {
  const [styles, setStyles] = useState({   
    top: 0,
    left: 0,
    angle: 0
  });
  const [speech, setSpeech] = useState(null);
  const [thought, setThought] = useState(null);

  const moving = () => {
    props.data.forEach((x, index) => {
      setTimeout(() => {
        if (x.key === "move") {
          setStyles((styles) => ({
            angle: styles.angle,
            top: styles.top + Math.sin(styles.angle * (Math.PI / 180)) * x.value,
            left: styles.left + Math.cos(styles.angle * (Math.PI / 180)) * x.value
          }));
        } else if (x.key === "turn") {
          setStyles((styles) => ({...styles, angle: styles.angle + (+x.value)}));
        } else if (x.key === "goto") {
          setStyles((styles) => ({...styles, top: +x.value[1], left: +x.value[0]}));
        } else if (x.key === "say") {
          setSpeech(x.value[0]);
          setTimeout(() => {
            setSpeech(null);
          }, x.value[1] * 1000);
        } else if (x.key === "think") {
          setThought(x.value[0]);
          setTimeout(() => {
            setThought(null);
          }, x.value[1] * 1000);
        } else {
          //repeat
          setTimeout(()=>{
            moving()
          },1000 )
        }
      }, 1000 * (index + 1));
    });
  };

  useEffect(() => {
    if (props.flag) {
      moving();
    }
  }, [props.flag]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        version="1.1"
        xmlSpace="preserve"
        style={{
          position: "absolute",
          ...styles,
          transform: `rotate(${styles?.angle || 0}deg)`,
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="#FF5722"
          stroke="#E64A19"
          strokeWidth="2"
        />
      </svg>
      {speech && (
        <div
          style={{
            position: "absolute",
            top: styles.top ,
            left: styles.left,
            backgroundColor: "white",
            padding: "5px 10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {speech}
        </div>
      )}
      {thought && (
        <div
          style={{
            position: "absolute",
            top: styles.top ,
            left: styles.left,
            backgroundColor: "white",
            padding: "5px 10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "5px" }}>💭</div>
            {thought}
          </div>
        </div>
      )}
    </>
  );
}
