import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  allPost,
  allComments,
  addComment,
} from "../../service/redux/reducers/posts/postsSlice";
const PorfilePosts = () => {



  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState(false);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      posts: state.posts.posts,
      userId: state.log.userId
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/search_1?user=${state.userId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getCommentsByPost = async (post_id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/comments/comment/${post_id}`
      );
      if (result.data.success) {
        const comments = result.data.result;
        console.log(result.data);
        dispatch(allComments({ comments, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };


  const createComment = async (post_id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/comments/comment/${post_id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        const newCommet = result.data.result
        dispatch(addComment({ newCommet, post_id }))
        getCommentsByPost(post_id);
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div>PorfilePosts</div>
  )
}

export default PorfilePosts