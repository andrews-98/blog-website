import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {   Post } from "./interfaces";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    constructor(
        private http: HttpClient
    ){}

    create(post: Post): Observable<Post>{
      return this.http.post<Post>(`${environment.fBDBUrl}/posts.json`, post)
      .pipe( map( (response) => {
           return {
            ...post,
            id: response.name,
            date: new Date(post.date)
           }
          
      }))
    }

    getAll(): Observable<Post[]>{
        return this.http.get(`${environment.fBDBUrl}/posts.json`)
        .pipe( map( (response: {[key: string]: any}) => {
           return Object
            .keys(response)
            .map( key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
            }))
        })) 
    }
    
    getById(id: string): Observable<Post>{
      return this.http.get<Post>(`${environment.fBDBUrl}/posts/${id}.json`)
      .pipe( map( (post: Post) => {
        return {
         ...post,
         id,
         date: new Date(post.date)
        }
       
   }))
    }

    editPost(post: Post): Observable<Post>{
      return this.http.patch<Post>(`${environment.fBDBUrl}/posts/${post.id}.json`, post)
    }
   
    remove(id: string | undefined): Observable<void>{
        return this.http.delete<void>(`${environment.fBDBUrl}/posts/${id}.json`)
    }

}