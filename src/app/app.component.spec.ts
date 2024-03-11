import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  QueryClient,
  provideQueryClient,
} from '@tanstack/angular-query-experimental';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [provideQueryClient(() => new QueryClient())],
    }).compileComponents();
  });

  it('should test the mutation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    app.runMutation();

    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();
    TestBed.flushEffects();

    TestBed.inject(HttpTestingController)
      .expectOne({
        method: 'GET',
        url: '/get-endpoint',
      })
      .flush('response');

    TestBed.inject(HttpTestingController)
      .expectOne({
        method: 'POST',
        url: '/post-endpoint',
      })
      .flush('response');
  });
});
