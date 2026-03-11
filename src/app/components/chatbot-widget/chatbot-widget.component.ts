import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { knowledgeContent } from '../../../assets/chatbot-knowledge';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.scss'
})
export class ChatbotWidgetComponent {
  open = false;
  input = '';
  messages: { role: 'user' | 'assistant'; text: string }[] = [];
  loading = false;

  async send() {
    const text = this.input.trim();
    if (!text || this.loading) return;
    this.input = '';
    this.messages.push({ role: 'user', text });
    this.loading = true;
    try {
      const apiKey = environment.geminiApiKey;
      if (!apiKey) {
        this.messages.push({ role: 'assistant', text: 'The chatbot is not configured. Please add your Gemini API key to the environment configuration.' });
        return;
      }
      const response = await this.callGemini(text);
      this.messages.push({ role: 'assistant', text: response });
    } catch (e: any) {
      this.messages.push({ role: 'assistant', text: 'Sorry, I had trouble responding. Please try again.' });
    } finally {
      this.loading = false;
    }
  }

  private async callGemini(userMessage: string): Promise<string> {
    const apiKey = environment.geminiApiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const systemContext = `You are a helpful assistant for Jo Jo's Hotel, a dog boarding, sitting, and walking business in Los Altos, CA. Use the following knowledge to answer questions. If the answer isn't in the knowledge, respond helpfully based on general dog care knowledge and suggest contacting the business for specific details.

KNOWLEDGE:
${knowledgeContent}`;

    const body = {
      contents: [{ parts: [{ text: systemContext + '\n\nUser: ' + userMessage + '\n\nAssistant:' }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) throw new Error('No response');
    return answer.trim();
  }
}
