import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Person } from '../leaderboard/person/person';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage$: Promise<Storage>;
  constructor(private storage: Storage) {
    this._storage$ = this.storage.create();
  }

  public async set(key: string, value: any) {
    (await this._storage$).set(key, value);
  }

  public async get(key: string): Promise<any> {
    return (await this._storage$).get(key);
  }
  public async addPerson(value: Person) {
    const persons = await this.getPersons();
    persons.push(value);
    let notEmptyPersons: Person[] = persons.filter(
      (person) => person.name.trim() !== '',
    );
    console.log('Adding');

    console.log('pushed person:' + JSON.stringify(notEmptyPersons));
    await (await this._storage$).set('persons', notEmptyPersons);
  }
  public async getPersons(): Promise<Person[]> {
    const persons = await (await this._storage$).get('persons');
    if (persons && Array.isArray(persons)) {
      return persons;
    }
    return [];
  }
}
