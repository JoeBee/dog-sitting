import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    { q: 'How do I book a stay?', a: 'Create an account, add your dog(s), and submit a booking request through the Calendar. We review all requests and will confirm or reach out with questions within 24 hours.' },
    { q: 'Do you require a meet-and-greet?', a: 'Yes. We ask that new dogs complete a walk-through of our facility before their first stay. This helps your dog feel comfortable and lets us get to know their needs.' },
    { q: 'What vaccinations are required?', a: 'Dogs must be current on Rabies, DHPP, and Bordetella. Please bring or upload vaccination records before your first booking.' },
    { q: 'Can my dog bring their own food and bedding?', a: 'Absolutely! We encourage bringing your dog\'s regular food to avoid stomach upset, and a familiar blanket or bed can help them settle in.' },
    { q: 'What if my dog has special needs?', a: 'We accommodate many special needs — medications, dietary restrictions, behavioral considerations. Please note details in your booking request and we\'ll discuss how we can help.' },
    { q: 'What are your hours for drop-off and pick-up?', a: 'Drop-off and pick-up are by appointment between 8 AM and 6 PM. Late pick-up fees apply after noon on your scheduled end date.' },
    { q: 'Do you offer last-minute bookings?', a: 'We do when space allows. Submit a request and we\'ll respond as soon as possible. Holiday periods typically fill up weeks in advance.' }
  ];
}
