import React, { Component } from 'react';
import './Profile.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import testData from '../../common/Test';
import Avatar from '@material-ui/core/Avatar';
import pencil from '../../assets/icon/pencil.png';
import hearticon from '../../assets/icon/hearticon.svg';

/* Defined classes styles for all relevant imported components */

const styles = theme => ({

    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper

    },
    bigAvatar: {
        margin: '20px',
        width: '60px',
        height: '60px',
        float: 'center',
        display: 'flex'

    },
    gridList: {
        width: 1100,
        height: 800,
    },

});

const customStylesImagePost = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '70%',
        width: '60%',

    }
};

const customStylesEditFullName = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

/*Class component Profile defined with constructor & it's states */

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            fullnameRequired: "dispNone",
            fullname: "",
            ownerInfo: [],
            mediaInfo: [],
            imageDetail: {},
            UpdateFullname: "dispNone",
            ApiFullName: "dispBlock",
            full_name: ""
        }
    }

    /* Event  Handler Functions Definitions  */

    updateClickHandler = (e) => {

        this.state.fullname === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });

        if (this.state.fullname !== "") {
            this.setState({
                full_name: this.state.fullname,
                UpdateFullname: "dispBlock",
                ApiFullName: "dispNone",
                modalIsOpen: false
            });
        }
    }

    inputFullnameChangeHandler = (e) => {
        this.setState({ fullname: e.target.value });

    }

    openEditModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            fullnameRequired: "dispNone",
            fullname: "",

        });
    }

    closeEditModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    openImageModalHandler = (imageId) => {
        this.setState({
            imagemodalIsOpen: true,
        });
    }

    closeImageModalHandler = () => {
        this.setState({
            imagemodalIsOpen: false
        });
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
        xhr.open("GET", this.props.baseUrl + "?access_token=AQAeE0Ta0BF6zloALqk5lZ-g7XvJUBhuXtBbjE_7BVHjKFMN466d7Qatqg-kK3-bzY_4Ct2i-Rb1kt50PcvRPN75HKt1HytnBfsZgzNWrD2IXzAPzAfutim-JJsanzwORpGMmtEjVy6IXZTxHxy05NHyYvp5VbaX2If-DuvvhLP-SC4OfObGToR-xEryREA5xS5f92HVI7JnCsJPjOD0e0qcKQfHqtspOUf5fFJtevuetQ");
        xhr.send(ownerData);

        // Get media info of owner after authenticated by accessToken
        let mediaData = null;
        let xhrMediaData = new XMLHttpRequest();

        xhrMediaData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    mediaInfo: JSON.parse(this.responseText).data
                });
            }
        })
        xhrMediaData.open("GET", this.props.baseUrl + "media/recent/?access_token=AQAeE0Ta0BF6zloALqk5lZ-g7XvJUBhuXtBbjE_7BVHjKFMN466d7Qatqg-kK3-bzY_4Ct2i-Rb1kt50PcvRPN75HKt1HytnBfsZgzNWrD2IXzAPzAfutim-JJsanzwORpGMmtEjVy6IXZTxHxy05NHyYvp5VbaX2If-DuvvhLP-SC4OfObGToR-xEryREA5xS5f92HVI7JnCsJPjOD0e0qcKQfHqtspOUf5fFJtevuetQ");
        xhrMediaData.send(mediaData);

        let currentState = this.state;
        currentState.imageDetail = this.state.mediaInfo.filter((img) => {
            return img.id === this.props.imageId
        });
        this.setState({ currentState });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <div>
                    <Header />
                </div>

                <div className="infoSection">
                    <div className="row">
                        <div className="column-left">
                        </div>

                        <div className="column-center">
                            <div className="row1">
                                <div className="col-left">
                                    {<Avatar className={classes.bigAvatar}>
                                        <img src={this.state.ownerInfo.profile_picture} alt={"logo"} />
                                    </Avatar>}
                                </div>

                                <div className="col-center">
                                    <span><div className="row-one">{this.state.ownerInfo.username}</div></span>
                                    <span><div className="row-two">
                                        <div className="col-l">Posts : {testData[0].posts}</div>
                                        <div className="col-c">Follows : {testData[0].follows}</div>
                                        <div className="col-r">Followed By : {testData[0].followed_by}</div>
                                    </div></span>
                                    <div className="row-three">
                                        <span><div className={this.state.ApiFullName}>{this.state.ownerInfo.full_name}</div><div className={this.state.UpdateFullname}>{this.state.full_name}</div></span>
                                        <Button variant="fab" color="secondary" className="edit-icon-button"><img src={pencil} alt={"pencil-logo"} onClick={this.openEditModalHandler} /></Button>
                                    </div>
                                </div>

                                <div>
                                    <Modal
                                        ariaHideApp={false}
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeEditModalHandler}
                                        style={customStylesEditFullName}
                                    >
                                        <Tabs className="tabs" value={this.state.value} >
                                            <Tab label="Edit" />

                                        </Tabs>
                                        <TabContainer>
                                            <FormControl required>
                                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                                <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.inputFullnameChangeHandler} />
                                                <FormHelperText className={this.state.fullnameRequired}>
                                                    <span className="red">required</span>
                                                </FormHelperText>
                                            </FormControl>
                                            <br /><br />

                                            <Button variant="contained" color="primary" onClick={this.updateClickHandler}>UPDATE</Button>
                                        </TabContainer>
                                    </Modal>
                                </div>

                                <div className="col-right">
                                </div>
                            </div>
                        </div>
                        <div className="column-right">
                        </div>

                    </div>

                </div>
                <br />
                <div className={classes.root}>
                    <GridList cellHeight={300} className={classes.gridList} cols={3}>
                        {this.state.mediaInfo.map(image => (
                            <GridListTile key={image.id} cols={image.cols || 1}>
                                <img src={image.images.standard_resolution.url} alt={image.text} onClick={this.openImageModalHandler} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.imagemodalIsOpen}
                        onRequestClose={this.closeImageModalHandler}
                        style={customStylesImagePost}
                    >

                        <div className="row-card">

                            <div className="column-card-left" >
                                <img src={testData[0].url} alt={"uploadedpic1"} />

                            </div>

                            <div className="column-card-right" >
                                <div className="row-card-up">

                                    {
                                        <Avatar className={classes.bigAvatar}>
                                            <img src={testData[0].profile_picture} alt={"logo"} /></Avatar>
                                    }
                                    {testData[0].username}

                                    <hr />

                                    <Typography variant="caption">{testData[0].full_name}</Typography>
                                    <Typography>#images #description</Typography>
                                </div>

                                <br /><br />
                                <div className="row-card-down">
                                    <img src={hearticon} alt={"heartlogo"} onClick={() => this.iconClickHandler()} className="iconColor" />

                                    <FormControl >
                                        <InputLabel htmlFor="imagecomment">Add a Comment</InputLabel>
                                        <Input id="imagecomment" type="text" onChange={this.imageCommentChangeHandler} />
                                    </FormControl>
                                    <Button variant="contained" color="primary" onClick={this.addCommentOnClickHandler}>ADD</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                </div>


            </div>

        )
    }
}


export default withStyles(styles)(Profile);