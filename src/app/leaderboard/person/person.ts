export class Person {
  name: string;
  timeInSeconds: number;
  schnitzelCount: number;
  potatoCount: number;
  date: string;

  constructor() {
    this.name = '';
    this.timeInSeconds = 0;
    this.schnitzelCount = 6;
    this.potatoCount = 0;
    this.date = this.todaysDateAsString();
  }

  todaysDateAsString(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
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
