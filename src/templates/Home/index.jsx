import React from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextImput } from '../../components/TextImput';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';

export class Home extends React.Component {
state = {
  posts: [],
  allPosts: [],
  page: 0,
  postsPerPage: 2,
  searchValue: ''
};

async componentDidMount(){
  await this.loadPosts();
}

loadPosts = async () => {
  const {page, postsPerPage } = this.state;

  const postsAndPhotos = await loadPosts ();
    this.setState({
       posts: postsAndPhotos.slice(page, postsPerPage),
       allPosts: postsAndPhotos,
       });
}

loadMorePosts = () => {
const {
  page,
  postsPerPage,
  allPosts,
  posts,
} = this.state;
const nextPage = page + postsPerPage;
const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
posts.push(...nextPosts);

this.setState({ posts, page: nextPage});

}

handleChange = (e) => {
  const {value} = e.target;
  this.setState({ searchValue: value});
}

render () {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMoreposts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase()
        ) ;
    } )
    : posts;

    return(
      <section className="container"> 
      <div class="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue} </h1>  ) }

       <TextImput searchValue={searchValue} 
       handleChange={this.handleChange}/>
        </div>

           {filteredPosts.length > 0 &&(        
        <Posts posts={filteredPosts}/>)}

           {filteredPosts.length === 0 && (
           <p>Não existem posts =(</p>)}

      <div className="button-container">
        {!searchValue && <Button 
        text="Load more posts" 
        onClick={this.loadMorePosts}
        disabled={noMoreposts}
        /> }
      </div>
    </section>
  );       
  }
}

