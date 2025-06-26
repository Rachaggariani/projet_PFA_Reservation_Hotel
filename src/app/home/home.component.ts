import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel, HotelService } from '../Services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: Hotel[] = [];
  
  loading = true;
    isLoading = false; 

  error: string | null = null;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
        this.error = 'Failed to load hotels. Please try again later.';
        this.loading = false;
      }
    });
  }
navigateToChambre() {
    this.isLoading = true;
    
    setTimeout(() => {
     // this.router.navigate(['/hotels',hotelId,'chambres']);
      this.isLoading = false;
    }, 2000); // 2 secondes de délai
  }

  navigateToChambres(hotelId: number | undefined): void {
    if (hotelId) {
      this.router.navigate(['/hotels', hotelId, 'chambres']);
    }
  }

  getStars(rating: number): string {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
    return fullStars + emptyStars;
  }

  getFirstImage(images: string | undefined): string {
  // Si images est une URL complète
  if (images?.startsWith('http')) {
    return images;
  }
  // Si c'est un chemin relatif
  if (images) {
    // Retire l'extension si elle est déjà présente
    const imageName = images.replace(/\.(png|jpg|jpeg)$/i, '');
    return `assets/images/${imageName}.png`;
  }
  // Image par défaut
  return 'assets/images/default-hotel.png';
}
  hasAvailableRooms(hotel: Hotel): boolean {
    return hotel.chambres?.some(c => c.disponible) || false;
  }

// Dans home.component.ts
deleteHotel(id?: number) {
  if (!id) return; // Si l'ID est undefined, on ne fait rien
  
  if (confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
    this.hotelService.deleteHotel(id).subscribe({
      next: (response) => {
        console.log('Hôtel supprimé:', response);
        this.hotels = this.hotels.filter(hotel => hotel.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }
}
}