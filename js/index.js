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
  velocityRight: 10,
  velocityLeft: -10,
  gravity: 0.5,
  acceleration: 0.5,
};

const platforms = [
  { x: 100, y: 550, width: 200, height: 10 },
  { x: 250, y: 500, width: 100, height: 10 },
];
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

  for (const platform of platforms) {
    if (
      box.x < platform.x + platform.width &&
      box.x + box.width > platform.x &&
      box.y + box.height > platform.y &&
      box.y < platform.y + platform.height
    ) {
      box.y = platform.y - box.height;
      box.velocityY = 0;
      animationTimer = false;
      return;
    }
  }

  canvasRendering.clearRect(0, 0, testContainer.width, testContainer.height);
  for (const platform of platforms) {
    canvasRendering.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }
  canvasRendering.fillRect(box.x, box.y, box.width, box.height);
  if (box.y + box.height >= testContainer.height) {
    box.y = 590;
    animationTimer = false;
    return;
  }
  requestAnimationFrame(fallingAnimation);
};

fallingAnimation();

const moveRight = () => {
  if (box.velocityRight === 0) return;
  box.x += box.velocityRight;
  box.velocityRight -= box.acceleration;
  canvasRendering.clearRect(0, 0, testContainer.width, testContainer.height);
  for (const platform of platforms) {
    canvasRendering.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }
  for (const platform of platforms) {
    if (
      box.x > platform.x + platform.width &&
      box.x + box.width < platform.x &&
      box.y + box.height > platform.y &&
      box.y < platform.y + platform.height
    ) {
      box.y = platform.y - box.height;
      box.velocityY = 0;
      fallingAnimation();
    }
  }
  canvasRendering.fillRect(box.x, box.y, box.width, box.height);
  requestAnimationFrame(moveRight);
};

const moveLeft = () => {
  if (box.velocityLeft === 0) return;
  box.x += box.velocityLeft;
  box.velocityLeft += box.acceleration;
  canvasRendering.clearRect(0, 0, testContainer.width, testContainer.height);
  for (const platform of platforms) {
    canvasRendering.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }
  canvasRendering.fillRect(box.x, box.y, box.width, box.height);
  requestAnimationFrame(moveLeft);
};

let animationTimer = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "w" && animationTimer === false) {
    box.velocityY = -10;
    console.log(box);
    animationTimer = fallingAnimation();
    console.log(animationTimer);
  } else if (event.key === "a") {
    box.velocityLeft = -8;
    moveLeft();
  } else if (event.key === "d") {
    box.velocityRight = 8;
    moveRight();
  }
});
