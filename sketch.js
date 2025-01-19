let table;
let images = {};
let selectedWeek = -1;
const moodColors = ['white', 'orange', 'navy blue', 'light pink'];

function preload() {
table = loadTable('mood.csv', 'csv', 'header');

  moodColors.forEach(color => {
    images[color] = loadImage(`images/${color}.jpg`);
  });
}

function setup() {
  createCanvas(500, 500);
  background(170, 210, 250); 

  // Dropdown menu for week selection
  const dropdown = createSelect();
  dropdown.position(20, height + 20);
  dropdown.option('Select a Week');
  for (let i = 1; i <= 5; i++) {
    dropdown.option(`Week ${i}`);
  }
  dropdown.changed(() => {
    const selected = dropdown.value();
    if (selected !== 'Select a Week') {
      selectedWeek = parseInt(selected.split(' ')[1]) - 1;
      redraw(); // Trigger redraw on selection
    } else {
      selectedWeek = -1; // Reset if no valid selection
      redraw();
    }
  });

  noLoop(); // Disable continuous drawing
}

function draw() {
  background(170, 210, 250); 

  if (selectedWeek >= 0) {
    displayWeek(selectedWeek);
  } else {
    textSize(20);
    fill(0);
    textAlign(CENTER);
    textFont('serif');
    text('MooooooooooooooooD', width / 2, height / 2);
  }
}

function displayWeek(week) {
  const row = table.getRow(week);

  textSize(20);
  fill(0);
  textAlign(CENTER);
  textFont('serif');
  text(`Week ${row.get('week')}`, width / 2, 60);

  // Display images based on mood values
  const imageSize = 80;
  const margin = 20; // Margin to avoid images touching canvas edges
  let x = margin;
  let y = 100;

  moodColors.forEach(color => {
    const count = row.getNum(color.toLowerCase());

    for (let i = 0; i < count; i++) {
      image(images[color], x, y, imageSize, imageSize);
      x += imageSize + 10;

      // Move to the next row if the row fills
      if (x + imageSize + margin > width) {
        x = margin;
        y += imageSize + 10;
      }
    }
  });


  if (y + imageSize + margin > height) {
    fill(255, 0, 0);
    textSize(16);
    text('Not enough space to display all images.', width / 2, height - 20);
  }
}


