import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, TitleStrategy } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  
   post: Post

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap((params: Params) => {
          return this.postsService.getById(params['id'])
      }))
      .subscribe( (post: Post) => {
         this.post = post
         
      }) 
  }
}
