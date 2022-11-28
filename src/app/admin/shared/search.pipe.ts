import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/interfaces";

@Pipe({
    name: 'SearchPost'
})

export class SearchPipe implements PipeTransform{
   
    transform(post: Post[], search = '') {
        if(!search.trim()){
            return post
        }

        return post.filter( (post) => {
             return post.title.toLowerCase().includes(search.toLowerCase())
        })
    }


}
