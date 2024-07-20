function clamp(minWidth, maxWidth, minFontSize, maxFontSize) {
  const n = maxFontSize - minFontSize;
  const m = (maxWidth / 16) - (minWidth / 16);
  const slope = n / m;
  console.log(slope);

  const x = minWidth / 16;
  const yInter = (-x * slope + minFontSize);
  
  console.log(`${minFontSize}rem , ${yInter}rem + ${slope * 100}vw, ${maxFontSize}rem`);
}

// Example usage:
const minWidth = parseInt(prompt("Enter minimum width:"));
const maxWidth = parseInt(prompt("Enter maximum width:"));
const minFontSize = parseFloat(prompt("Enter minimum font size:"));
const maxFontSize = parseFloat(prompt("Enter maximum font size:"));

clamp(minWidth, maxWidth, minFontSize, maxFontSize);
