import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  team = [
    { name: 'Joanne Miller', role: 'Founder & Lead Caretaker', bio: 'Joanne has over 15 years of experience caring for dogs. She founded Jo Jo\'s Hotel to create a warm, safe place for dogs in the Los Altos community.', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400' },
    { name: 'Mike Chen', role: 'Head of Walks & Adventures', bio: 'Mike leads our daily walk program and adventure outings. A certified dog trainer, he ensures every pup gets the exercise and enrichment they need.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Sarah Kim', role: 'Senior Caretaker', bio: 'Sarah brings compassion and attention to detail to every dog in our care. She specializes in senior dogs and pups with special needs.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }
  ];
}
