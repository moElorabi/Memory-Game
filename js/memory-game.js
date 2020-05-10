// localStorage Data
let savedName = localStorage.getItem("name");
let savedTries = localStorage.getItem("tries");
let savedTimer = localStorage.getItem("timer");

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = () => {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = savedName;

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
    localStorage.setItem("name", yourName);
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

  // The Timer
  let timer = document.querySelector(".time span");

  let timeFunc = setInterval(() => {
    let firstPlayerTimer = (timer.innerHTML = parseInt(timer.innerHTML) - 1);
    // Timer localStorage
    localStorage.setItem("timer", firstPlayerTimer);
    // Timer Controler

    if (firstPlayerTimer == 0) {
      document.querySelector(".time").innerHTML = `Time: DONE`;
      document.querySelector(".time").style.color = "red";
      clearInterval(timeFunc);
      setTimeout(function () {
        document.querySelector(".game-end").style.display = "inline";
      }, duration);
    }
  }, duration);

  // localStorage Usage
  document.querySelector(".last-player-name span").innerHTML = savedName;
  document.querySelector(".last-player-time span").innerHTML = 60 - savedTimer;
  document.querySelector(".last-player-tries span").innerHTML = savedTries;
};

// Effect Duration
let duration = 1000,
  // Select Blocks Container
  blocksContainer = document.querySelector(".memory-game-blocks"),
  // Create Array From Game Blocks
  blocks = Array.from(blocksContainer.children),
  // Create Range Of Keys
  orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    let firstPlayerTries = (triesElement.innerHTML =
      parseInt(triesElement.innerHTML) + 1);

    localStorage.setItem("tries", firstPlayerTries);

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }

  return array;
}