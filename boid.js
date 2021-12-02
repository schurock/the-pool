class Boid {
  constructor(){
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2,4));
    this.acceleration = createVector();
    this.maxForce = 1;
    this.maxSpeed = 5;
    this.r = 4;
    this.angle = 0;

  }

  edges(){
    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids){
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;

    for(let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

      if (other != this && d < perceptionRadius){
      steering.add(other.velocity);
      total++;
      }
    }

    if (total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
      }
    return steering;
  }

  cohesion(boids){
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;

    for(let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

      if (other != this && d < perceptionRadius){
      steering.add(other.position);
      total++;
      }
    }

    if (total > 0){
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
      }
    return steering;
  }

  separation(boids){
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for(let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

      if (other != this && d < perceptionRadius){
      let diff = p5.Vector.sub(this.position, other.position);
      diff.div(d);
      steering.add(diff);
      total++;
      }
    }

    if (total > 0){
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
      }
    return steering;
  }

  flock(boids){
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignSlider.value());
   cohesion.mult(cohesionSlider.value());
   separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);

  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  change(forms){

    let vol = mic.getLevel();
    let h = map(vol, 0, 1, 1, 200);
    console.log(vol);

    if (forms == "squares") {

      rect(1,1,10, map(sin(this.angle), -1,1,0,15));
      this.angle +=0.1;
    }
    else if (forms == "circles"){
      circle(1,1,10+h);
    }
    else {

      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      vertex(this.r, this.r);
      vertex(this.r, this.r);
      endShape(CLOSE);

      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      vertex(this.r, this.r);
      vertex(this.r, this.r);
      endShape(CLOSE);

    }
  }

  show(red,green,blue,tail,forms){
    //strokeWeight(10);
    //stroke(random(1,255),random(1,255),random(1,255));
    //point(this.position.x, this.position.y)
    let theta = this.velocity.heading() + PI / 2;
    noStroke();
    fill(red,green,blue);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    this.change(forms);
  //  if (tail == true){
  //    circle(this.position.x, this.position.y,10);
  //  }
    pop();
  }
}
