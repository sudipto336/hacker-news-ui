import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private baseUrl = 'http://localhost:5001/api/Stories';

  constructor(private http: HttpClient) {}

  getStories(
    page: number = 1,
    pageSize: number = 20,
    query = ''
  ): Observable<Story[]> {
    const params = { page, pageSize, query };
    return this.http.get<Story[]>(this.baseUrl, { params });
  }
}
