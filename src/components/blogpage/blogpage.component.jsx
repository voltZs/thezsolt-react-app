import React from 'react';

import './blogpage.styles.css';

class BlogPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  }

  componentDidMount(){
    this.updatePosts();
  }

  updatePosts = () => {
    fetch('blog.json')
    .then(res => res.json())
    .then(data => {
      let postData = [];
      for(var post in data){
        postData.push({
          ...data[post],
          collapsed: true,
          preview: data[post].content.substring(0, 200).concat("...")
        })
      };
      this.setState({posts: postData});
    });
  }

  togglePostCollapse(index) {
    this.setState((prevState) => {
      let newPosts = [...prevState.posts];
      let togglePost = {...newPosts[index]};
      togglePost.collapsed = !togglePost.collapsed;
      newPosts[index] = togglePost;
      return {posts: newPosts};
    });
  }

  render(){
    let posts = this.state.posts.map((post, index) => {

      let toggleArticle = () => {
        this.togglePostCollapse(index);
      }

      let date = new Date(post.date);
      let postDate = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear() ;
      let collapsed = post.collapsed ? "collapsed" : null;
      let body = post.collapsed ? post.preview : post.content;
      let moreButton = post.collapsed ? (
        <button className="button" onClick={toggleArticle}>
          Read more
        </button>
      ) : (
        <button className="button" onClick={toggleArticle}>
          Hide
        </button>
      );

      return (
        <div className="blogPost" key={index}>
          <div className="blogPostTitle">
            {post.title}
          </div>
          <div className={`blogPostBody ${collapsed}`}>
            <div className="postDate">{postDate}</div>
            <div>{body}</div>
            <div className="moreButton">{moreButton}</div>
          </div>

        </div>
      )
    });

    return(
      <div>
        <div className="blogContainer">
          {posts}
        </div>
      </div>
    )
  }
}

export {BlogPage}
