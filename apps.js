// Board generation
const gameBoard = document.querySelector('#gameBoard');

const firstSky = document.querySelector('.firstSky');
const firstBedRock = document.querySelector('.firstBedRock');


const cloudPositions = [255, 256, 234, 235, 236];

const leafPositions = [
  162,
  140, 141, 142,
  118, 119, 120, 121, 122,
  96, 97, 98, 99, 100, 101, 102,
];
const stonePositions = [66, 67, 80, 81, 95, 96, 101];

const woodPositions = [78, 57, 36, 15];

function generateBoard() {

  function firstHalf() {
    for (let i = 0; i < 293; i++) {
      const blockDiv = document.createElement('div');
      blockDiv.classList.add('sky');
      firstSky.parentNode.insertBefore(blockDiv, firstSky.nextSibling);
      if (cloudPositions.includes(i)) {
        blockDiv.setAttribute('id', 'cloud');
      }
      if (leafPositions.includes(i)) {
        blockDiv.classList.remove('sky');
        blockDiv.classList.add('leaves');
      }
      if (woodPositions.includes(i)) {
        blockDiv.classList.remove('sky');
        blockDiv.classList.add('wood');
      }
    }
  }

  function secondHalf() {
    for (let i = 0; i < 146; i++) {
      const blockDiv = document.createElement('div');
      blockDiv.classList.add('dirt');
      firstBedRock.parentNode.insertBefore(blockDiv, firstBedRock);
      if (stonePositions.includes(i)) {
        blockDiv.classList.remove('dirt');
        blockDiv.classList.add('stone');
      }
      if (i < 21 && i !== 5) {
        blockDiv.classList.remove('dirt');
        blockDiv.classList.add('grass');
      }
      if (i >= 126) {
        blockDiv.classList.remove('dirt');
        blockDiv.classList.add('bedRock');
      }
    }
  }
  firstHalf();
  secondHalf();
}

generateBoard();


const invArr = [];

// Number of items in inventory to be displayed
let h2 = document.querySelector("h2");

function invDisplay(array) {
  h2.textContent = array.length;
};
invDisplay(invArr);

//tools and selection

const buttons = document.querySelectorAll('.btn');

const shovel = document.querySelector('#shovel');
const axe = document.querySelector('#axe');
const pickAxe = document.querySelector('#pickAxe');
const inventory = document.querySelector('#inventory');


buttons.forEach(buttonEL => {
  buttonEL.addEventListener('click', () => {
    document.querySelector('.selected')?.classList.remove('selected');
    buttonEL.classList.add('selected');
  });
});


// Select top, bottom blocks of element.

function getSibling(element, n) {
  let sibling = element;
  while (n !== 0 && sibling) {
    sibling = n > 0 ? sibling.nextElementSibling : sibling.previousElementSibling;
    n > 0 ? n-- : n++;
  }
  return sibling;
}

// Check if left,right,bottom, top are sky blocks

function isSkyAround(element) {
  const rightBlock = element.nextElementSibling;
  const leftBlock = element.previousElementSibling;
  const topBlock = getSibling(element, -21);
  const bottomBlock = getSibling(element, 21);

  const isRightSky = rightBlock && rightBlock.classList.contains('sky');
  const isLeftSky = leftBlock && leftBlock.classList.contains('sky');
  const isTopSky = topBlock && topBlock.classList.contains('sky');
  const isBottomSky = bottomBlock && bottomBlock.classList.contains('sky');

  return isRightSky || isLeftSky || isTopSky || isBottomSky;
}

// Check if one of left,right,bottom are not sky blocks

function canPlaceBlock(element) {
  const rightBlock = element.nextElementSibling;
  const leftBlock = element.previousElementSibling;
  const topBlock = getSibling(element, -21);
  const bottomBlock = getSibling(element, 21);

  const isRightNotSky = rightBlock && !rightBlock.classList.contains('sky');
  const isLeftNotSky = leftBlock && !leftBlock.classList.contains('sky');
  const isTopNotSky = topBlock && !topBlock.classList.contains('sky');
  const isBottomNotSky = bottomBlock && !bottomBlock.classList.contains('sky');

  return isRightNotSky || isLeftNotSky || isTopNotSky || isBottomNotSky;
}

// Inventory image function

function updateInvImage() {
  let lastElement = invArr[invArr.length - 1];

  if (lastElement) {
    if (lastElement.includes('stone')) {
      inventory.style.backgroundImage = "url('/imgs/Cobblestone.png')";
    } else if (lastElement.includes('wood')) {
      inventory.style.backgroundImage = "url('/imgs/Oak_Log.png')";
    } else if (lastElement.includes('dirt')) {
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    } else if (lastElement.includes('grass')) {
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    }
    else {
      inventory.style.backgroundImage = "url('/imgs/inv.png')";
    }

  } else { inventory.style.backgroundImage = "url('/imgs/inv.png')"; }
};

// event listener for board

gameBoard.addEventListener('click', function (event) {
  const block = event.target;

  if (isSkyAround(block)) {

    // Remove dirt block logic
    if (shovel.classList.contains('selected') && block.classList.contains('dirt')) {
      block.classList.remove("dirt");
      block.classList.add("sky");
      invArr.push('dirt');
      invDisplay(invArr);
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";

    }
    // Remove grass logic
    if (shovel.classList.contains('selected') && block.classList.contains("grass")) {
      block.classList.remove("grass");
      block.classList.add("sky");
      invArr.push('dirt');
      invDisplay(invArr);
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    }
    if (pickAxe.classList.contains('selected') && block.classList.contains('stone')) {
      block.classList.remove("stone");
      block.classList.add("sky");
      invArr.push('stone');
      invDisplay(invArr);
      inventory.style.backgroundImage = "url('/imgs/Cobblestone.png')";
    }

    // Logic for axe and wood
    if (axe.classList.contains('selected') && block.classList.contains('wood')) {
      block.classList.remove("wood");
      block.classList.add("sky");
      invArr.push('wood');
      invDisplay(invArr);
      inventory.style.backgroundImage = "url('/imgs/Oak_Log.png')";
    }

    // axe and leaves logic
    if (axe.classList.contains('selected') && block.classList.contains('leaves')) {
      block.classList.remove("leaves");
      block.classList.add("sky");
    }
  }
  // placing items and inventory update

  if (inventory.classList.contains('selected') && block.classList.contains('sky') && canPlaceBlock(block)) {
    const lastItem = invArr.pop();
    console.log(lastItem);
    updateInvImage();
    invDisplay(invArr);

    switch (lastItem) {
      case 'dirt':
        block.classList.remove("sky");
        block.classList.add("dirt");
        break;
      case 'stone':
        block.classList.remove("sky");
        block.classList.add("stone");
        break;
      case 'wood':
        block.classList.remove("sky");
        block.classList.add("wood");
        break;
    }
  }
});
