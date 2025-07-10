import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { Story } from '../models/story.model';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService],
    });

    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to fetch stories with default params', () => {
    const dummyStories: Story[] = [
      { id: 1, title: 'Test Story 1', url: 'https://test1.com' },
      { id: 2, title: 'Test Story 2', url: 'https://test2.com' },
    ];

    service.getStories().subscribe((stories) => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.method === 'GET' &&
        request.url === 'http://localhost:5001/api/Stories'
    );

    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('pageSize')).toBe('20');
    expect(req.request.params.get('query')).toBe('');

    req.flush(dummyStories);
  });

  it('should send correct query params when provided', () => {
    service.getStories(2, 50, 'angular').subscribe();

    const req = httpMock.expectOne(
      (request) =>
        request.method === 'GET' &&
        request.url === 'http://localhost:5001/api/Stories'
    );

    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('pageSize')).toBe('50');
    expect(req.request.params.get('query')).toBe('angular');

    req.flush([]); // empty response
  });
});
