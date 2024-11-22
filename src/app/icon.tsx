import React from 'react';
import { ImageResponse } from 'next/og';
export const Size = {
  width: 32,
  height: 32,
};

export default function favicon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "linear-gradient(to right, #ff0000, #00ff00)",
        color: "white",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "georgia, serif",
        borderRadius: "50%",
      }}
    >
      <h1>JB</h1>
    </div>,
    Size
  );
}
