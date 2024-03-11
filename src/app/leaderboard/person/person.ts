export class Person {
  name : string;
  timeInSeconds : number;
  schnitzelCount : number;
  potatoCount : number;


  constructor(name : string) {
    this.name = name;
    this.timeInSeconds = 0;
    this.schnitzelCount = 0;
    this.potatoCount = 0;
  }

  setTime(time : number) {
    this.timeInSeconds = time;
  }

  addSchnitzel() {
    this.schnitzelCount++;
  }

  addPotato() {
    this.potatoCount++;
  }
}

export var persons = Array<Person>();
