const skies = document.querySelectorAll('.sky');
const leaves = document.querySelectorAll('.leaves');
const divs = document.querySelectorAll('div');


const buttons = document.querySelectorAll('.btn');
const shovel = document.querySelector('#shovel');
const axe = document.querySelector('#axe');
const pickAxe = document.querySelector('#pickAxe');
const inventory = document.querySelector('#inventory');


const invArr = [];




buttons.forEach(buttonEL => {
  buttonEL.addEventListener('click', () => {
    document.querySelector('.selected')?.classList.remove('selected');
    buttonEL.classList.add('selected');
  });
});




divs.forEach(grass => {
  grass.addEventListener('click', () => {
    if (shovel.classList.contains('selected') && grass.classList.contains('grass') ) {
      grass.classList.remove("grass");
      grass.classList.add("sky");
      invArr.push('dirt');
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    }  
   });
});

divs.forEach(stone => {
  stone.addEventListener('click', () => {
    if (pickAxe.classList.contains('selected') && stone.classList.contains('stone')) {
      stone.classList.remove("stone");
      stone.classList.add("sky");
      invArr.push('stone');
      inventory.style.backgroundImage = "url('/imgs/Cobblestone.png')";
    } 
  });
});

divs.forEach(wood => {
  wood.addEventListener('click', () => {
    if (axe.classList.contains('selected') && wood.classList.contains('wood')) {
      wood.classList.remove("wood");
      wood.classList.add("sky");
      invArr.push('wood');
      inventory.style.backgroundImage = "url('/imgs/Oak_Log.png')";
    }  
   });
});





leaves.forEach(leaf => {
  let twentyFirstPreviousSibling = leaf.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
  let twentyFirstNextSibling = leaf.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
  leaf.addEventListener('click', () => {
    if (axe.classList.contains('selected') && leaf.nextElementSibling.classList.contains('sky')) {
      leaf.classList.remove("leaves"); 
      leaf.classList.add("sky");
      invArr.push('leaves');
    } else if (axe.classList.contains('selected') && leaf.previousElementSibling.classList.contains('sky')){
      leaf.classList.remove("leaves"); 
      leaf.classList.add("sky");
    } else if (axe.classList.contains('selected') && twentyFirstPreviousSibling.classList.contains('sky')){
      leaf.classList.remove("leaves"); 
      leaf.classList.add("sky");
    }  else if (axe.classList.contains('selected') && twentyFirstNextSibling.classList.contains('sky')){
      leaf.classList.remove("leaves"); 
      leaf.classList.add("sky");
    }  
   });
});


divs.forEach(dirt => {
  dirt.addEventListener('click', () => {
    if (shovel.classList.contains('selected') && dirt.classList.contains('dirt') && dirt.previousElementSibling.classList.contains('sky')) {
      dirt.classList.remove("dirt");
      dirt.classList.add("sky");
      invArr.push('dirt');
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    } else if (shovel.classList.contains('selected') && dirt.classList.contains('dirt') && dirt.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.contains('sky')) {
      dirt.classList.remove("dirt");
      dirt.classList.add("sky");
      invArr.push('dirt');
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    } else if (shovel.classList.contains('selected') && dirt.classList.contains('dirt') && dirt.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.contains('sky')) {
      dirt.classList.remove("dirt");
      dirt.classList.add("sky");
      invArr.push('dirt');
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    } else if (shovel.classList.contains('selected') && dirt.classList.contains('dirt') && dirt.nextElementSibling.classList.contains('sky')) {
      dirt.classList.remove("dirt");
      dirt.classList.add("sky");
      invArr.push('dirt');
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    }  
   });
});

function updateBackgroundImage() {
  let lastElement = invArr[invArr.length - 1];
  if (lastElement) {
    if (lastElement.includes('stone')){
      inventory.style.backgroundImage = "url('/imgs/Cobblestone.png')";
    } else if (lastElement.includes('wood')){
      inventory.style.backgroundImage = "url('/imgs/Oak_Log.png')";
    } else if (lastElement.includes('dirt')){
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    }  else if (lastElement.includes('grass')){
      inventory.style.backgroundImage = "url('/imgs/dirt.png')";
    } 
    else {
      inventory.style.backgroundImage = "url('/imgs/inv.png')";
    }
    
  } else {inventory.style.backgroundImage = "url('/imgs/inv.png')";}
};


// Place blocks 



divs.forEach(block => {
  block.addEventListener('click', ()=> {
    if(inventory.classList.contains('selected') && block.classList.contains('sky') && invArr[invArr.length - 1].includes('stone')){
      block.classList.remove("sky");
      block.classList.add("stone");
      invArr.pop();
      updateBackgroundImage();
    } else if (inventory.classList.contains('selected') && block.classList.contains('sky') && invArr[invArr.length - 1].includes('dirt')){
      block.classList.remove("sky");
      block.classList.add("dirt");
      invArr.pop();
      updateBackgroundImage();
    } else if (inventory.classList.contains('selected') && block.classList.contains('sky') && invArr[invArr.length - 1].includes('wood')){
      block.classList.remove("sky");
      block.classList.add("wood");
      invArr.pop();
      updateBackgroundImage();
    } 
  });
});


