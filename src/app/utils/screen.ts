export function getPercentageFromPixels(pixels: {
  x: number;
  y: number;
}): {
  x: number;
  y: number;
} {
  if (!pixels) {
    return { x: 0, y: 0 };
  }

  const { x, y } = pixels;

  if (!x || !y) {
    return { x: 0, y: 0 };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return {
    x: x / screenWidth,
    y: y / screenHeight,
  };
}

export function getPixelsFromPercentage(percent: {
  x: number;
  y: number;
}): {
  x: number;
  y: number;
} {
  if (!percent) {
    return { x: 0, y: 0 };
  }

  const { x, y } = percent;

  if (!x || !y) {
    return { x: 0, y: 0 };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return {
    x: screenWidth * x,
    y: screenHeight * y,
  };
}
