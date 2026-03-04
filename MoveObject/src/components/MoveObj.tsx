import { useState } from "react";
import pengu from "../assets/pengu.png";

export default function MoveObj() {
  const [left, setLeft] = useState(0);

  const startMoving = () => {
    setInterval(() => {
      setLeft((prev) => prev + 10);
    }, 200);
  };

  return (
    <div>
      <img
        src={pengu}
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          left: `${left + 80}px`,
          top: "50px",
        }}
      />
      <img
        src={pengu}
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          left: `${left}px`,
          top: "150px",
        }}
      />
      <img
        src={pengu}
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          left: `${left + 140}px`,
          top: "150px",
        }}
      />

      <div style={{ marginTop: "300px" }}>
        <button onClick={startMoving}>Dance</button>
      </div>
    </div>
  );
}
