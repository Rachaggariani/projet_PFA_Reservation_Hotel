import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../Services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotelId: number = 0;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      nomHotel: [''],
      adresseHotel: [''],
      rating: [0],
      chambres: this.fb.array([]),
      imageFile: [null]
    });
  }

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.hotelId = +id;
    this.loadHotelData();
  } else {
    console.error('No hotel ID provided in route');
    // Rediriger ou gérer l'erreur
  }
}

  loadHotelData(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe(hotel => {
      this.hotelForm.patchValue({
        nomHotel: hotel.nomHotel,
        adresseHotel: hotel.adresseHotel,
        rating: hotel.rating
      });

      // Ajouter les chambres au FormArray
      const chambresArray = this.hotelForm.get('chambres') as FormArray;
      chambresArray.clear();
      
      if (hotel.chambres) {
        hotel.chambres.forEach(chambre => {
          chambresArray.push(this.fb.group({
            id: [chambre.id],
            numero: [chambre.numero],
            disponible: [chambre.disponible]
          }));
        });
      }
    });
  }

  get chambres(): FormArray {
    return this.hotelForm.get('chambres') as FormArray;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.hotelForm.patchValue({
      imageFile: this.selectedFile
    });
  }

  onSubmit(): void {
  // Vérifier que l'ID est bien défini
  if (!this.hotelId || this.hotelId === 0) {
    console.error('Hotel ID is missing');
    return;
  }

  const formData = new FormData();
  const hotelData = this.hotelForm.value;

  // Créer l'objet hotel avec toutes les propriétés nécessaires
  const hotel = {
    id: this.hotelId,
    nomHotel: hotelData.nomHotel,
    adresseHotel: hotelData.adresseHotel,
    rating: hotelData.rating,
    chambres: hotelData.chambres,
    images: '' // Initialiser avec une valeur par défaut
  };

  // Ajouter les données au FormData
  formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.hotelService.updateHotel(formData).subscribe({
    next: () => {
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Error updating hotel:', err);
    }
  });
}
}