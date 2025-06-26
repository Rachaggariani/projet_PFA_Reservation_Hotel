import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Hotel {
  id?: number;
  nomHotel: string;
  adresseHotel: string;
  images?: string;
  rating: number;
  chambres?: Chambre[];
}

export interface Chambre {
  id?: number;
  numero: string;
  disponible: boolean;
  hotel?: Hotel;
}
@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = 'http://localhost:8080/hotels';
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel, {
      headers: this.jsonHeaders,
      observe: 'response' // This will give us the full HttpResponse
    }).pipe(
      map(response => {
        // Check if the response has a body
        if (response.body) {
          return response.body;
        }
        throw new Error('Empty response body');
      }),
      catchError(error => {
        // Handle actual errors here
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to create hotel'));
      })
    );
  }

  // Si vous avez besoin d'uploader des images plus tard
  createHotelWithImage(formData: FormData): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiUrl}/upload`, formData);
  }
  /*  updateHotel(formData: FormData): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${formData.get('id')}`, formData);
  
  }*/
  /*updateHotel(formData: FormData): Observable<Hotel> {
    // Vérification de l'ID
    if (!formData.get('id')) {
      throw new Error('Hotel ID is required');
    }
    return this.http.put<Hotel>(`${this.apiUrl}/${formData.get('id')}`, formData);
  }*/
 updateHotel(formData: FormData): Observable<Hotel> {
  // Vérifier que formData contient bien l'ID
  const hotelBlob = formData.get('hotel') as Blob;
  
  return new Observable(observer => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const hotel = JSON.parse(reader.result as string);
        
        if (!hotel.id) {
          observer.error('Hotel ID is required');
          return;
        }

        // Envoyer la requête PUT
        this.http.put<Hotel>(`${this.apiUrl}/${hotel.id}`, formData).subscribe({
          next: (response) => observer.next(response),
          error: (err) => observer.error(err)
        });
      } catch (e) {
        observer.error('Invalid hotel data');
      }
    };
    reader.readAsText(hotelBlob);
  });
}
// hotel.service.ts
deleteHotel(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}
}
