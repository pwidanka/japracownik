import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private cities: string[] = [
    'Białystok',
    'Bydgoszcz',
    'Gdańsk',
    'Gdynia',
    'Katowice',
    'Kielce',
    'Konin',
    'Koszalin',
    'Kraków',
    'Lublin',
    'Łódź',
    'Olsztyn',
    'Opole',
    'Poznań',
    'Przemyśl',
    'Rzeszów',
    'Szczecin',
    'Warszawa',
    'Wrocław',
    'Zielona Góra'
  ].sort();

  getCities(): string[] {
    return this.cities;
  }
} 