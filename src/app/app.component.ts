import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';

function injectEndpointMutation() {
  const httpClient = inject(HttpClient);

  return injectMutation(() => ({
    mutationKey: ['MUTATION_KEY'] as const,
    mutationFn: (payload: { id: string }) => {
      console.log('call mutation');
      return firstValueFrom(httpClient.post(`/post-endpoint`, payload));
    },
  }));
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  httpClient = inject(HttpClient);

  query = injectQuery(() => ({
    queryKey: ['QUERY_KEY'] as const,
    queryFn: () => {
      console.log('call query');
      return firstValueFrom(this.httpClient.get(`/get-endpoint`));
    },
  }));
  mutation = injectEndpointMutation();

  async runMutation() {
    await this.mutation.mutateAsync({ id: 'id' });
    console.log('mutation done - never gets here though');
  }
}
