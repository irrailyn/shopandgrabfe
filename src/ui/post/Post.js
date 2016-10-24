import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPostList } from 'redux/modules/post';
import PostList from './list/PostList';

@connect(
  state => ({
    post: state.post,
    list: state.list
  }),
  { fetchPostList }
)
export default class Post extends Component {

  static propTypes = {
    fetchPostList: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  componentWillMount() {
    const oPost = this.props.post.toJS();
    const { isInit, limit, offset } = oPost;

    if (!isInit) {
      this.props.fetchPostList({
        limit,
        offset
      });
    }
  }

  render() {
    const { props } = this;
    const oPost = props.post.toJS();
    const { data, count, limit, offset } = oPost;
    const listNavigation = {
      count,
      limit,
      offset
    };

    return (
      <div>
        <PostList data={data}
          fetchListData={(params) => { props.fetchPostList(params); }}
          listNavigation={listNavigation} />
      </div>
    );
  }
}
