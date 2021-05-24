import React, { Component } from 'react';
import './Home.css';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Header from '../../common/header/Header';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import hearticon from '../../assets/icon/hearticon.svg';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    card: {
        maxWidth: '100%',
        margin: '8px',
        shadow: '20px',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer',

    },
});

/*Class component Home defined with constructor & it's states */

class Home extends Component {

    constructor() {
        super();
        this.state = {
            ownerInfo: [],
            mediaInfo: [],
            anchorEl:null,
            imagecomment:"",
            addComment:"dispComment",
        }
    }

    /* Event  Handler Functions Definitions */

    imageCommentOnChangeChangeHandler = (e) => {
        this.setState({imagecomment: e.target.value});
    }

    addCommentOnClickHandler = (e) => {
        this.setState({addedComment :this.state.imagecomment});

    }

    /*Code written to make two API calls as per the definitions provided in problem statement */

    componentWillMount() {

        // Get owner info after authenticating the  accessToken generated 
        let ownerData = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    ownerInfo: JSON.parse(this.responseText).data

                });
            }
        })
        xhr.open("GET", this.props.baseUrl + "?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr.send(ownerData);

        // Get media info of owner after authenticated by accessToken
        let mediaData = null;
        let xhrMediaData = new XMLHttpRequest();

        xhrMediaData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                that.setState({
                    mediaInfo: JSON.parse(this.responseText).data
                });
            }
        })
        xhrMediaData.open("GET", this.props.baseUrl + "media/recent/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrMediaData.send(mediaData);

    }

    /* Rendering JSX elements on the Login Page as per the design requirements */

    render() {

        const {classes} = this.props;

        return (
            <div>
                <Header/>
                <div className= "cardStyle">
                    <br />
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={2}>
                        {this.state.mediaInfo.map(image => (

                            <GridListTile key={"image" + image.id} cols={image.cols || 1}>
                                <Grid container className={classes.root} spacing={16}>
                                    <Grid item>
                                        <Card className={classes.card}>

                                            <CardHeader
                                                avatar={
                                                    <Avatar className={classes.bigAvatar}>
                                                        <img src={image.user.profile_picture} alt={"logo"} /></Avatar>
                                                }
                                                title={image.user.username}
                                                subheader={image.created_time} />


                                            <CardContent>
                                                <img src={image.images.standard_resolution.url} alt={image.text} className="image-properties" />
                                                <hr />
                                                <Typography>{image.text}</Typography>
                                                <Typography><div className="hash-tags">#{image.tags}</div></Typography>
                                                <div className="likesFont">
                                                    <Typography variant="h5" >
                                                        <img src={hearticon} alt={"heartlogoTransparent"}   onClick={() => this.iconClickHandler} />
                                                        {image.likes.count} Likes</Typography></div>
                                                <br /><br />
                                                <FormControl >
                                                    <FormHelperText className={this.state.addComment}><div><Typography>: {this.state.addedComment}</Typography></div></FormHelperText>
                                                </FormControl>
                                                <br/>
                                                <br/>
                                                <FormControl>
                                                    <InputLabel htmlFor="imagecomment">Add a Comment</InputLabel>
                                                    <Input id="imagecomment" type="text" onChange={this.imageCommentOnChangeChangeHandler} />
                                                </FormControl>
                                                <Button id="addedcomment" variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>
                                            </CardContent>

                                        </Card>

                                    </Grid>
                                </Grid>
                            </GridListTile>
                        ))};

                    </GridList>

                </div>

            </div>

        )
    }
}

export default withStyles(styles)(Home);