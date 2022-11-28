import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    
    posts: Post[] = []
    pSub: Subscription
    dSub: Subscription
    searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
    ) { }


  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe( (post) => {
     this.posts = post
    })
  }



  removepost(id: string | undefined){
     this.dSub = this.postsService.remove(id).subscribe(() => {
          this.posts.filter ( post => {
          post.id !== id
        })
        this.alert.warning('Post has been deleted ')
    })
   
  }
  
  ngOnDestroy(): void {
    if(this.pSub){
     return this.pSub.unsubscribe()
   }
 }


}

