
const flock = [];
const flock2 = [];
const flock3 = [];
const flock4 = [];

let mic;
let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(640, 360);
  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);

  mic = new p5.AudioIn();
  mic.start();

  for(let i =0; i<20; i++){
    flock.push(new Boid());
  }
  for(let i =0; i<20; i++){
    flock2.push(new Boid());
  }
  for(let i =0; i<20; i++){
    flock3.push(new Boid());
  }
  for(let i =0; i<20; i++){
    flock4.push(new Boid());
  }
}

function draw() {
  background(51);

  let vol = mic.getLevel();
  //let h = map(vol, 0, 1, height, 0);
  //ellipse(width / 2, h - 25, 50, 50);

  //if vol

  for (let boid of flock){
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show(68,69,61);
  }

  for (let boid of flock2){
    boid.edges();
    boid.flock(flock2);
    boid.update();
    boid.show(182,197,166,"squares");
  }

  for (let boid of flock3){
    boid.edges();
    boid.flock(flock3);
    boid.update();
    boid.show(217,220,212,"circles");
  }

  for (let boid of flock4){
    boid.edges();
    boid.flock(flock4);
    boid.update();
    boid.show(144,149,122);
  }

}
