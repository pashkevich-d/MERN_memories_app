import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({ type: "", id: null });

  const handleLikePost = async () => {
    setLoading({ type: "LIKE", id: post._id });
    await dispatch(likePost(post._id));
    setLoading({ type: "", id: null });
  };
  const handleDeletePost = async () => {
    setLoading({ type: "DELETE", id: post._id });
    await dispatch(deletePost(post._id));
    setLoading({ type: "", id: null });
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://uiaa-web.azureedge.net/wp-content/uploads/2017/12/2018_banner.jpg"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size='small'
          onClick={() => {
            setCurrentId(post._id);
          }}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h5'
        component='h2'>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {loading.type === "LIKE" && loading.id === post._id ? (
          <Skeleton variant='text' width={60} />
        ) : (
          <Button size='small' color='primary' onClick={handleLikePost}>
            <ThumbUpAltIcon fontSize='small' /> &nbsp; Like {post.likeCount}{" "}
          </Button>
        )}
        {loading.type === "DELETE" && loading.id === post._id ? (
          <CircularProgress />
        ) : (
          <Button size='small' color='primary' onClick={handleDeletePost}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
