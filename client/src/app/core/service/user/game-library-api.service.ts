import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryApiService {

  baseUrl = `${environment.apiUrl}/game-library/api`;

  constructor(private http: HttpClient) { }

  /**
   * @param zipcode a 5 digit zipcode as a number
   * @param startDate a date string formatted as follows: YYYY-MM-DDT00:00:00.000Z
   * @param endDate  a date string formatted as follows: YYYY-MM-DDT23:59:59.000Z
   * @returns an Observable of TemperatureHumidity[]
   */
  getTemperatureHumidityData<T>(zipcode: number, startDate: string, endDate: string): Observable<T> {
    const queryString = `startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<T>(
      `${this.baseUrl}/temperature-humidity/${zipcode}?${queryString}`
    )
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
    }
    return throwError(() => error ?? new Error('Server error'));
  }
}
