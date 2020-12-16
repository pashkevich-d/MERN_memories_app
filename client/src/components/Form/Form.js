import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (currentId) {
      let selectedPost = posts.filter((post) => post._id === currentId)[0];
      setPostData(selectedPost);
    }
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      await dispatch(updatePost(currentId, postData));
    } else {
      await dispatch(createPost(postData));
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
        />
        <TextField
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
        />
        <TextField
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
        />
        <TextField
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth>
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clearForm}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
