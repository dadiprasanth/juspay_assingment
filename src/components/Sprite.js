import React, { useEffect, useState } from "react";

export default function Sprite(props) {
  const [styles, setStyles] = useState({
    top: 0,
    left: 0,
    angle: 0,
  });
  const [speech, setSpeech] = useState(null);
  const [thought, setThought] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const container = document.getElementById("container_play");
    const containerRect = container.getBoundingClientRect();

    // Calculate the offset between the mouse and the sprite's position
    setDragOffset({
      x: e.clientX - containerRect.left - styles.left,
      y: e.clientY - containerRect.top - styles.top,
    });

    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById("container_play");
    const containerRect = container.getBoundingClientRect();

    // Calculate new position
    let newLeft = e.clientX - containerRect.left - dragOffset.x;
    let newTop = e.clientY - containerRect.top - dragOffset.y;

    // Ensure the sprite stays within the container
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - 50));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - 50));

    setStyles((styles) => ({
      ...styles,
      left: newLeft,
      top: newTop,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const moving = () => {
    props.data.forEach((x, index) => {
      setTimeout(() => {
        if (x.key === "move") {
          const container = document.getElementById("container_play");
          const width = container.offsetWidth - 95.17; // Width of the cat sprite
          const height = container.offsetHeight - 100; // Height of the cat sprite

          const findTop = (styles) => {
            let tempT =
              styles.top + Math.sin(styles.angle * (Math.PI / 180)) * x.value;
            if (tempT <= 0) {
              return 0;
            } else if (tempT >= height) {
              return height;
            }
            return tempT;
          };

          const findLeft = (styles) => {
            let tempL =
              styles.left + Math.cos(styles.angle * (Math.PI / 180)) * x.value;
            if (tempL <= 0) {
              return 0;
            } else if (tempL >= width) {
              return width;
            }
            return tempL;
          };

          setStyles((styles) => ({
            angle: styles.angle,
            top: findTop(styles),
            left: findLeft(styles),
          }));
        }  else if (x.key === "turn") {
          setStyles((styles) => ({
            ...styles,
            angle: styles.angle + +x.value,
          }));
        } else if (x.key === "goto") {
          setStyles((styles) => ({
            ...styles,
            top: +x.value[1],
            left: +x.value[0],
          }));
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
          // repeat
          setTimeout(() => {
            moving();
          }, 1000);
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
          cursor: "grab",
        }}
        onMouseDown={handleMouseDown}
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
            top: styles.top,
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
            top: styles.top,
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