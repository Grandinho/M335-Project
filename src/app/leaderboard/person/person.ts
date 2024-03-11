export class Person {
  name: string;
  timeInSeconds: number;
  schnitzelCount: number;
  potatoCount: number;

  constructor() {
    this.name = '';
    this.timeInSeconds = 0;
    this.schnitzelCount = 6;
    this.potatoCount = 0;
  }

  setTime(time: number) {
    this.timeInSeconds = time;
  }

  setName(name: string) {
    this.name = name;
  }

  addSchnitzel() {
    this.schnitzelCount++;
  }

  addPotato() {
    this.potatoCount++;
  }
}

export var persons = Array<Person>();
