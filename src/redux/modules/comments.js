import Immutable from "immutable";
import { combineReducers } from "redux-immutable";
import { get, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

// action types
export const types = {
  FETCH_COMMENTS: "COMMENTS/FETCH_COMMENTS", // 获取评论列表
  CREATE_COMMENT: "COMMENTS/CREATE_COMMENT"  // 创建评论
};

// action creators
export const actions = {
  // 获取评论列表
  fetchComments: postId => {
    return (dispatch, getState) => {
      if (shouldFetchComments(postId, getState())) {
        dispatch(appActions.startRequest());
        return get(url.getCommentList(postId)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { comments, commentIds, users } = convertToPlainStructure(data);
            dispatch(fetchCommentsSuccess(postId, commentIds, comments, users));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  // 创建评论
  createComment: comment => {
    return dispatch => {
      dispatch(appActions.startRequest());
      return post(url.createComment(), comment).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(createCommentSuccess(data.post, data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  }
};

// 获取评论列表成功
const fetchCommentsSuccess = (postId, commentIds, comments, users) => ({
  type: types.FETCH_COMMENTS,
  postId,
  commentIds,
  comments,
  users
});

// 创建评论成功
const createCommentSuccess = (postId, comment) => ({
  type: types.CREATE_COMMENT,
  postId,
  comment
});

const shouldFetchComments = (postId, state) => {
  const commentIds = state.getIn(["comments", "byPost", postId]);
  return !commentIds;
};

const convertToPlainStructure = comments => {
  let commentsById = {};
  let commentIds = [];
  let authorsById = {};
  comments.forEach(item => {
    commentsById[item.id] = { ...item, author: item.author.id };
    commentIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });
  return {
    comments: commentsById,
    commentIds,
    users: authorsById
  };
};

// reducers
const byPost = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return state.merge({ [action.postId]: action.commentIds });
    case types.CREATE_COMMENT:
      return state.set(
        action.postId,
        state.get(action.postId).unshift(action.comment.id)
      );
    default:
      return state;
  }
};

const byId = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return state.merge(action.comments);
    case types.CREATE_COMMENT:
      return state.merge({ [action.comment.id]: action.comment });
    default:
      return state;
  }
};

const reducer = combineReducers({
  byPost,
  byId
});

export default reducer;

// selectors
export const getCommentIdsByPost = (state, postId) =>
  state.getIn(["comments", "byPost", postId]);

export const getComments = state => state.getIn(["comments", "byId"]);
