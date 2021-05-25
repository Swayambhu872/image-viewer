import React, { Component } from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import avatar from "../../assets/images/user.png";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import "./style.css";

const useStyles = theme => ({
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #a9a9a9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
    outline: 0
  }
});

class PostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDetails: props.selectedPost,
      newComment: ""
    };
  }

  addComment = () => {
    const { postDetails, newComment } = this.state;
    const { onUpdatePost } = this.props;
    this.setState(
      {
        postDetails: {
          ...postDetails,
          comments: [...postDetails.comments, newComment]
        },
        newComment: ""
      },
      () => {
        onUpdatePost(this.state.postDetails);
      }
    );
  };

  toggleLike = isLiked => {
    const { postDetails } = this.state;
    const { onUpdatePost } = this.props;
    this.setState(
      {
        postDetails: {
          ...postDetails,
          isLiked: isLiked,
          likeCount: isLiked
            ? postDetails.likeCount + 1
            : postDetails.likeCount - 1
        }
      },
      () => {
        onUpdatePost(this.state.postDetails);
      }
    );
  };

  onChangeComment = e => {
    this.setState({
      newComment: e.target.value
    });
  };

  render() {
    const { visible, onClose, classes } = this.props;
    const { postDetails, newComment } = this.state;
    return (
      <Modal open={visible} onClose={onClose} className="post-modal">
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          id="post-container"
          className={classes.paper}
        >
          <div className="post-img">
            <img src={postDetails && postDetails.media_url} alt="img" />
          </div>
          <div className="post-info">
            <div className="post-top-info">
              <div className="post-header">
                <div className="post-avatar">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="post-username">{postDetails.username}</div>
              </div>
              <hr />

              <div className="post-caption">{postDetails.caption}</div>
              <div className="post-hastag">{postDetails.hashtag}</div>
              <div className="post-comments">
                {postDetails.comments.map((comment,index) => {
                  return (
                    <div className="comments" key={index}>
                      <span className="username">{postDetails.username}:</span>{" "}
                      <span className="comment">{comment}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="post-footer">
              <div className="like-button">
                <div
                  className="like-post"
                  onClick={() => this.toggleLike(!postDetails.isLiked)}
                >
                  {postDetails.isLiked ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </div>
                {postDetails.likeCount ? (
                  <div>
                    {postDetails.likeCount === 1
                      ? "1 like"
                      : `${postDetails.likeCount} likes`}
                  </div>
                ) : null}
              </div>
              <div className="comment-container">
                <TextField
                  label="Add a comment"
                  value={newComment}
                  onChange={e => this.onChangeComment(e)}
                  style={{ marginRight: "5px", width: "80%" }}
                />
                <Button
                  color="primary"
                  onClick={() => {
                    if (newComment) {
                      this.addComment();
                    }
                  }}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(PostDialog);