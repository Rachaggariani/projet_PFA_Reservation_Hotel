import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chambre, Hotel, HotelService } from '../Services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-hotel',
  templateUrl: './ajout-hotel.component.html',
  styleUrls: ['./ajout-hotel.component.css']
})
export class AjoutHotelComponent  {
  hotelForm: FormGroup;
  selectedRating: number = 0;
  selectedFile: File | null = null;
  chambres: Chambre[] = [
    { numero: 'Chambre 1', disponible: true },
    { numero: 'Chambre 2', disponible: true },
    { numero: 'Chambre 3', disponible: false }
  ];

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      nomHotel: ['', Validators.required],
      adresseHotel: ['', Validators.required]
    });
  }

  onRatingChange(rating: number): void {
    this.selectedRating = rating;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  toggleChambreDisponibility(chambre: Chambre): void {
    chambre.disponible = !chambre.disponible;
  }

  onSubmit(): void {
  if (this.hotelForm.valid && this.selectedRating > 0) {
    const hotelData: Hotel = {
      nomHotel: this.hotelForm.get('nomHotel')?.value,
      adresseHotel: this.hotelForm.get('adresseHotel')?.value,
      rating: this.selectedRating,
      chambres: this.chambres.map(chambre => ({
        numero: chambre.numero,
        disponible: chambre.disponible
      }))
    };

    console.log('Submitting hotel:', hotelData); // Debug log

    this.hotelService.createHotel(hotelData).subscribe({
      next: (response) => {
        console.log('Hotel created successfully:', response); // Debug log
        if (this.selectedFile && response.id) {
          this.uploadImage(response.id);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Full error details:', error);
        if (error.status === 201) {
          // This might be a false error - check the response
          console.warn('Received 201 status but treated as error. Response:', error.error);
          // You might still want to proceed if the creation was successful
          this.router.navigate(['/home']);
        } else {
          console.error('Actual error creating hotel:', error);
        }
      }
    });
  }
}

  private uploadImage(hotelId: number): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // Vous devrez implémenter cette méthode dans votre backend
    this.hotelService.createHotelWithImage(formData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        this.router.navigate(['/home']);
      }
    });
  }
}