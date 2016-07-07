import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ForumPost from './ForumPost.jsx';

export default class ForumThread extends TrackerReact(Component) {

   componentWillMount() {
   }

   componentDidUpdate() {
     $('#edit').froalaEditor({
       imageUploadURL: '/admin/imageupload',
       height: 300
     });
     $('#post-form').hide();
   }

   showForm() {
     $('#post-form').show(250);
   }

   getThread() {
     return ForumThreads.findOne({_id: this.props.id});
   }

   getPosts() {
     return ForumPosts.find({thread: this.props.id});
   }

   getCategoryLocks(category) {
     return ForumCategories.findOne({name: category}).available_to;
   }

   addPost(event) {
     event.preventDefault();
     let message = this.refs.postContent.value.replace(
       'q:', '<div class="quote">').replace(
         ':q', ' - ').replace(':uid', ':uid</div>');
     if (Meteor.call('addForumPost', this.props.id, message, Meteor.user()._id )) {
       $('#edit').froalaEditor('html.insert', "", true);
       $('#post-form').hide(250);
     }
   }

   createHtml(data) {
     return ({__html: data});
   }

   render() {
     this.state = {subscription:
                  {thread: Meteor.subscribe('oneThread', this.props.id)}};
     this.state.subscription.posts = Meteor.subscribe('allPostsInThread', this.props.id);
     this.state.subscription.users = Meteor.subscribe('allUserProfiles');
     this.state.subscription.category = Meteor.subscribe('allForumCategories');
     if (!this.state.subscription.thread.ready()
        || !this.state.subscription.posts.ready()
        || !this.state.subscription.users.ready()
        || !this.state.subscription.category.ready()) {
       return (<div>Loading...</div>)
     }
     let thread = this.getThread();
     let posts = this.getPosts();
     if (!Roles.userIsInRole(Meteor.user(), this.getCategoryLocks(thread.category)) && this.getCategoryLocks(thread.category).length > 0) {
      return (<div>Access Denied, you dont have permission to access this part of the forum</div>)
     }
     let ableToPost = Meteor.user() ? <a href="#" onClick={this.showForm}>Add new post</a> : <a href="/login">Login / Register</a>;

     return (
       <div className="b_main_content">
         <div className="b_box">
           <div className="content" style={{marginBottom: "15px"}}>
             <p>
               <img src="/assets/blank.jpg" alt=""/>
               <p2><a href="/forum">FORUM</a> - <a href={`/forum/${thread.category}`}>{thread.category.toUpperCase()}</a>{` - ${thread.title.toUpperCase()}`}</p2>
             </p>
           </div>
           <ForumPost post={thread} users={Meteor.users.find().fetch()} />
           {posts.map((post) => {
             return (
               <ForumPost post={post} users={Meteor.users.find().fetch()}/>
             )
           })}
           {ableToPost}
           <form id="post-form" onSubmit={this.addPost.bind(this)}>
             <p2>Create New Post</p2>
             <textarea id="edit" name="content" ref="postContent" />
             <input type="submit" value="Submit" />
           </form>
         </div>
       </div>
     )
   }
}
