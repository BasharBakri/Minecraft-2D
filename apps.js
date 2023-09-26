const gameBoard = document.querySelector('#gameBoard');

const firstBedRock = document.querySelector('.firstBedRock');

let h2 = document.querySelector("h2");
const buttons = document.querySelectorAll('.btn');


// Board generation

for (let i = 0; i < 105; i++) {
  const dirtDiv = document.createElement('div');
  dirtDiv.classList.add('dirt');
  firstBedRock.parentNode.insertBefore(dirtDiv, firstBedRock);
}

for (let i = 0; i < 20; i++) {
  const bedRockDiv = document.createElement('div');
  bedRockDiv.classList.add('bedRock');
  firstBedRock.parentNode.insertBefore(bedRockDiv, firstBedRock.nextSibling);
}


const invArr = [];

// Number of items in inventory to be displayed

function invDisplay(array) {
  h2.textContent = array.length;
};
invDisplay(invArr);

//tools and selection
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


// Select top, bottom blocks of clicked element.

function getSibling(element, n) {
  let sibling = element;
  while (n !== 0 && sibling) {
    sibling = n > 0 ? sibling.nextElementSibling : sibling.previousElementSibling;
    n > 0 ? n-- : n++;
  }
  return sibling;
}

// Check if left,right,bottom are sky blocks

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
