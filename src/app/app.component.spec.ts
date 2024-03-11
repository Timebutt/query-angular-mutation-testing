import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
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

  it('should test the mutation', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    app.runMutation();

    // Tried forcing change detection or running all asynchronous tasks to no avail
    fixture.detectChanges();
    TestBed.flushEffects();

    tick(1000);
    flush();

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
  }));
});
