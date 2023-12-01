const makeElements = (type, properties) => {
  const element = document.createElement(type);
  Object.entries(properties).forEach((property) => {
    const [propertyName, propertyValue] = property;
    element[propertyName] = propertyValue;
  });
  return element;
};

const testContainer = makeElements("canvas", {
  className: "container",
  width: "600",
  height: "600",
});
document.body.append(testContainer);
const canvasRendering = testContainer.getContext("2d");
const randCoordinate = () => {
  return (coordinate = Math.floor(Math.random() * 80) + 10);
};
let box = {
  x: 300,
  y: 590,
  width: 10,
  height: 10,
  velocityY: -10,
  velocityX: 0.2,
  gravity: 0.5,
  acceleration: 0.5,
};
let bounceGradient = -0;
let bounceIncrement = 0;
const setPromise = async (timer) => {
  const myPromise = await new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
  return myPromise;
};
console.log(canvasRendering);

const fallingAnimation = () => {
  box.y += box.velocityY;
  box.velocityY += box.gravity;
  canvasRendering.clearRect(0, 0, testContainer.width, testContainer.height);
  canvasRendering.fillRect(box.x, box.y, box.width, box.height);
  if (box.y + box.height >= testContainer.height) {
    box.y = 590;
    animationTimer = false;
    return;
  }
  requestAnimationFrame(fallingAnimation);
};

fallingAnimation();

const moveX = (input) => {
  box.x += box.velocityX * input;
  if (box.velocityX < 5) box.velocityX += box.acceleration;
  canvasRendering.clearRect(0, 0, testContainer.width, testContainer.height);
  canvasRendering.fillRect(box.x, box.y, box.width, box.height);
  requestAnimationFrame(moveX);
};

let animationTimer = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "w" && animationTimer === false) {
    box.velocityY = -10;
    console.log(box);
    animationTimer = fallingAnimation();
    console.log(animationTimer);
  } else if (event.key === "a") moveX(-1);
  else if (event.key === "d") moveX(1);
});