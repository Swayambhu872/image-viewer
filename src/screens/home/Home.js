import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography
  } from "@material-ui/core";
  import React, { useState, useEffect } from "react";
  import Header from "../../common/header";
  import "./Home.css";
  import userImage from "../../assets/images/user.png";
  import moment from "moment";
  import { Favorite, FavoriteBorder } from "@material-ui/icons";
  
  const Home = props => {
    const [homeDetails, setHomeData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
      // check if valid auth
      const auth = sessionStorage.userAuth;
      if (auth) {
        fetch(
          `https://graph.instagram.com/me/media?fields=id,caption&access_token=${auth}`
        )
          .then(
            rsp => {
              if (rsp.status === 200) {
                rsp.json().then(res => {
                  const promises = res.data.map(item =>
                    fetch(
                      `https://graph.instagram.com/${item.id}?fields=id,media_type,media_url,username,timestamp&access_token=${auth}`
                    )
                  );
                  Promise.all(promises)
                    .then(
                      responses => {
                        return Promise.all(
                          responses.map(function(response) {
                            return response.json();
                          })
                        );
                      },
                      err => console.log(err)
                    )
                    .then(
                      function(data) {
                        const newData = data.map((item, i) => {
                          const caption = res.data[i];
                          // extract hastags from caption
                          if (caption.caption) {
                            item.rawCaption = caption.caption;
                            item.hashtag = caption.caption
                              .split(" ")
                              .filter(str => str.startsWith("#"))
                              .join(" ");
                            item.caption = item.rawCaption.replace(
                              /(^|\s)#[a-zA-Z0-9][^\\p{L}\\p{N}\\p{P}\\p{Z}][\w-]*\b/g,
                              ""
                            );
                          } else {
                            item.caption = null;
                          }
                          return {
                            ...item,
                            isLiked: i % 4 > 2,
                            likeCount: i % 4,
                            comments: i % 3 === 0 ? ["nice"] : [],
                            comment: ""
                          };
                        });
                        localStorage.dataSetOrg = JSON.stringify(newData);
                        setHomeData(newData);
                        setOriginalData(newData);
                      },
                      err => console.log(err)
                    )
                    .catch(err => console.log(err));
                });
              }
            },
            err => console.log(err)
          )
          .catch(err => console.log(err));
      } else {
        props.history.push("/");
      }
    }, []);
  
    useEffect(() => {
      localStorage.dataSetOrg = JSON.stringify(homeDetails);
    }, [homeDetails]);
  
    const updateComment = (value, index) => {
      setHomeData(state => {
        state[index].comment = value;
        return [...state];
      });
    };
  
    const addComment = index => {
      setHomeData(state => {
        state[index].comments.push(state[index].comment);
        state[index].comment = "";
        return [...state];
      });
    };
  
    const toggleLike = index => {
      setHomeData(state => {
        state[index].isLiked = !state[index].isLiked;
        state[index].likeCount = state[index].isLiked
          ? state[index].likeCount + 1
          : state[index].likeCount - 1;
        return [...state];
      });
    };
  
    // On search filter the data 
    const filterList = e => {
      const searchVal = e.target.value;
      if (searchVal) {
        const filteredList = originalData.filter(
          item =>
            item.caption &&
            item.caption.toLowerCase().includes(searchVal.toLowerCase())
        );
        setHomeData(filteredList);
      } else {
        setHomeData(originalData);
      }
    };
    return (
      <>
        <Header isHome props={props} onChange={e => filterList(e)} />
        <Grid
          container
          justify="space-between"
          style={{ width: "70%", margin: "auto" }}
        >
          {homeDetails.map((item, index) => (
            <Grid item sm={6} key={index}>
              <Card className="post">
                <CardHeader
                  avatar={
                    <img className="user-img" src={userImage} alt="avatar" />
                  }
                  title={
                    <Typography gutterBottom>
                      <b>{item.username}</b>
                    </Typography>
                  }
                  subheader={moment(item.timestamp).format("DD/MM/YYYY HH:mm:ss")}
                />
                <CardContent>
                  <div className="post-details">
                    <img src={item.media_url} alt="avatar" />
                    <Divider className="m-btm" />
                    <Typography variant="body1">{item.caption}</Typography>
                    <Typography variant="body1" className="hashtag">
                      {item.hashtag}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Grid container direction="column" style={{ padding: "8px" }}>
                    <Grid container alignItems="center">
                      <span
                        onClick={() => toggleLike(index)}
                        className="like-post"
                      >
                        {item.isLiked ? (
                          <Favorite style={{ color: "red" }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </span>
                      {item.likeCount ? (
                        <span>
                          {item.likeCount === 1
                            ? "1 like"
                            : `${item.likeCount} likes`}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      {item &&
                        item.comments &&
                        item.comments.map((comment, index) => (
                          <Typography gutterBottom key={index}>
                            <b>{item.username}</b> {comment}
                          </Typography>
                        ))}
                    </Grid>
                    <Grid
                      container
                      alignItems="flex-end"
                      className="comment-container"
                    >
                      <TextField
                        label="Add a comment"
                        value={item.comment}
                        onChange={e =>
                          updateComment(e.currentTarget.value, index)
                        }
                        style={{ marginRight: "5px", width: "80%" }}
                      />
                      <Button
                        color="primary"
                        onClick={() => {
                          if (item.comment) {
                            addComment(index);
                          }
                        }}
                        variant="contained"
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };
  
  export default Home;