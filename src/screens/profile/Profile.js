import React, { Component } from "react";
import { Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import EditDialog from "../../common/editDialog";
import PostDialog from "../../common/postDialog";
import Header from "../../common/header";
import avatar from "../../assets/images/user.png";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "Swayam",
      isEditDialog: false,
      isPostDialog: false,
      selectedPost: {},
      posts: localStorage.dataSetOrg ? JSON.parse(localStorage.dataSetOrg) : []
    };
  }

  componentDidMount() {
    //Check if valid auth token
    if (!sessionStorage.userAuth) {
      this.props.history.push("/");
    }
  }

  toggleEditDialog = () => {
    this.setState({
      isEditDialog: !this.state.isEditDialog
    });
  };

  //Updating the fullname
  saveFullName = updatedName => {
    this.setState({
      fullname: updatedName
    });
  };

  //Open the modal with selected post
  openSelectedPost = (selectedPost, index) => {
    this.setState({
      isPostDialog: true,
      selectedPost: {
        ...selectedPost,
        index: index
      }
    });
  };
  closeSelectedPost = () => {
    this.setState({
      isPostDialog: false,
      selectedPost: {}
    });
  };

  //Updating the post data
  updatePost = updatedPost => {
    const { posts } = this.state;
    const newPost = updatedPost;
    posts[updatedPost.index] = newPost;
    this.setState({
      posts
    });
  };

  render() {
    const {
      fullname,
      posts,
      isEditDialog,
      isPostDialog,
      selectedPost
    } = this.state;

    return (
      <>
        <EditDialog
          visible={isEditDialog}
          onClose={() => this.toggleEditDialog()}
          onUpdate={updatedName => this.saveFullName(updatedName)}
        />
        {isPostDialog ? (
          <PostDialog
            selectedPost={selectedPost}
            visible={isPostDialog}
            onClose={() => this.closeSelectedPost()}
            onUpdatePost={updatedPost => this.updatePost(updatedPost)}
          />
        ) : (
          ""
        )}
        <Header isProfile props={this.props} />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="profile-info">
              <div className="profile-username">Swayam</div>
              <div className="profile-information">
                <span>Posts: {posts.length}</span>
                <span>Follows: 30</span>
                <span>Followed By: 30</span>
              </div>
              <div className="profile-fullname">
                {fullname}
                <Fab
                  color="secondary"
                  aria-label="edit"
                  onClick={() => this.toggleEditDialog()}
                >
                  <EditIcon />
                </Fab>
              </div>
            </div>
          </div>
          <div className="profile-body">
            <GridList cellHeight={180} className="grid-list">
              {posts.map((post, index) => {
                return (
                  <GridListTile
                    key={post.id}
                    onClick={() => this.openSelectedPost(post, index)}
                  >
                    <img src={post.media_url} alt={post.id} />
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;