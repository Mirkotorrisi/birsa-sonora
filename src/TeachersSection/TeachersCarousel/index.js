import "./index.scss";
import React, { useState } from "react";
import { teachers } from "../resources.js";

export default function TeachersCarousel({ index, setIndex, interval }) {
  const [isTouch, setisTouch] = useState(false);
  const [startPress, setstartPress] = useState(0);
  const tz = Math.round(500 / 2 / Math.tan(Math.PI / teachers.length));
  const basicAngle = 360 / teachers.length;

  const handleStartAction = (e) => {
    clearInterval(interval);
    setstartPress({ x: e.clientX, y: e.clientY });
  };

  const handleSwipeOrPress = (e, indexPressed) => {
    if (e.clientX - startPress.x > 100) setIndex(index - 1);
    else if (e.clientX - startPress.x < -100) setIndex(index + 1);
    else setIndex(indexPressed);
  };
  return (
    <div
      className="mb-10 teacher-carousel"
      style={{
        perspective: "1000px",
        maxwidth: "50%",
        height: 500,
      }}
    >
      <div
        style={{
          width: 500,
          height: 500,

          position: "absolute",
          transform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index * -1
          }deg)`,
          WebkitTransform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index * -1
          }deg)`,
          MozTransform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index * -1
          }deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
        }}
      >
        {teachers.map((pic, indexTeach) => {
          return (
            <div
              className="teachers-section__picture"
              style={{
                position: "absolute",
                transform: `rotateY(${basicAngle * indexTeach}deg) translateZ(${
                  tz - 100
                }px)`,
                WebkitTransform: `rotateY(${
                  basicAngle * indexTeach
                }deg) translateZ(${tz - 100}px)`,

                width: 500,
                height: 300,
              }}
              key={`div_parent${indexTeach}`}
            >
              <div
                onMouseDown={(e) => !isTouch && handleStartAction(e)}
                onTouchStart={(e) => {
                  setisTouch(true);
                  handleStartAction(e.changedTouches[0]);
                }}
                onMouseUp={(e) => {
                  !isTouch && handleSwipeOrPress(e, indexTeach);
                }}
                onTouchEnd={(e) =>
                  handleSwipeOrPress(e.changedTouches[0], indexTeach)
                }
                style={{
                  position: "absolute",
                  width: 500,
                  height: 300,
                  // background: "rgba(100, 100, 100, 0.3)",
                }}
                key={`div_child_touch${indexTeach}`}
              />

              <img
                src={pic?.instrument}
                alt={pic?.altInstr}
                className={`teachers-section__picture__instrument noselect`}
                style={{
                  position: "absolute",
                  transform: `rotateY(180deg)`,
                  WebkitTransform: `rotateY(180deg)`,
                  width: 400,
                  height: 400,
                }}
                key={`img${indexTeach}`}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          width: 500,
          height: 500,
          position: "absolute",
          transform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index
          }deg)`,
          WebkitTransform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index
          }deg)`,
          MozTransform: `translateZ(-${tz}px) rotateY(${
            (360 / teachers.length) * index
          }deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 1s",
        }}
      >
        {teachers.map((pic, indexTeach) => {
          return (
            <div
              className="teachers-section__picture"
              style={{
                transform: `rotateY(${basicAngle * indexTeach}deg) translateZ(${
                  tz - 250
                }px)`,
                WebkitTransform: `rotateY(${
                  basicAngle * indexTeach
                }deg) translateZ(${tz - 250}px)`,
                position: "absolute",
                width: 500,
                height: 300,
              }}
              key={`div_child${indexTeach}2`}
            >
              <div
                onMouseDown={(e) => !isTouch && handleStartAction(e)}
                onTouchStart={(e) => {
                  setisTouch(true);
                  handleStartAction(e.changedTouches[0]);
                }}
                onMouseUp={(e) => {
                  !isTouch && handleSwipeOrPress(e, indexTeach);
                }}
                onTouchEnd={(e) =>
                  handleSwipeOrPress(e.changedTouches[0], indexTeach)
                }
                style={{
                  position: "absolute",
                  width: 500,
                  height: 300,
                }}
                key={`div_touch${indexTeach}2`}
              />
              <img
                src={pic?.src}
                alt={pic?.alt}
                className={`teachers-section__picture__face noselect`}
                style={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  margin: 20,
                  width: 200,
                  height: 300,
                  transform: `translateZ(${tz / 3}px) translateY(100}px)`,
                  WebkitTransform: `translateZ(${tz / 3}px) translateY(100px)`,
                  transition: "transform 0.2s",
                }}
                key={`img${indexTeach}2`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
