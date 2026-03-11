import { Component } from '@angular/core';

@Component({
  selector: 'app-adventures',
  standalone: true,
  imports: [],
  templateUrl: './adventures.component.html',
  styleUrl: './adventures.component.scss'
})
export class AdventuresComponent {
  adventures = [
    { title: 'Beach Day', desc: 'Our pack enjoying a sunny afternoon at the local beach.', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', date: 'Mar 2025' },
    { title: 'Forest Trail', desc: 'Exploring the trails with plenty of sniffing stops.', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800', date: 'Feb 2025' },
    { title: 'Birthday Party', desc: 'Celebrating Luna\'s 3rd birthday with treats and playtime.', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', date: 'Feb 2025' },
    { title: 'Playgroup', desc: 'Morning playgroup in our secure outdoor yard.', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800', date: 'Jan 2025' },
    { title: 'Rainy Day Fun', desc: 'Indoor enrichment when the weather kept us inside.', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800', date: 'Jan 2025' },
    { title: 'Christmas Snuggles', desc: 'Holiday season with extra cuddles and treats.', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800', date: 'Dec 2024' }
  ];
}
