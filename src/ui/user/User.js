import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchSampleList } from 'redux/modules/sampleList';
import UserList from './list/UserList';

/* @connect(
  state => ({
    sampleList: state.sampleList
  }),
  { fetchSampleList }
)*/
export default class List extends Component {

  /* static propTypes = {
    fetchSampleList: PropTypes.func.isRequired,
    sampleList: PropTypes.object.isRequired
  }*/

  /* componentWillMount() {
    const oSampleList = this.props.sampleList.toJS();
    const { isInit, limit, offset } = oSampleList;

    if (!isInit) {
      this.props.fetchSampleList({
        limit,
        offset
      });
    }
  }*/

  render() {
    /* const { props } = this;
    const oSampleList = props.sampleList.toJS();
    const { data, count, limit, offset } = oSampleList;
    const listNavigation = {
      count,
      limit,
      offset
    };*/

    /* return (
      <div>
        <UserList data={data}
          fetchListData={(params) => { props.fetchSampleList(params); }}
          listNavigation={listNavigation} />
      </div>
    );*/

    return (
      <div>
        <UserList data={[]}
          fetchListData={() => false }
          listNavigation={{count: 0, limit: 0, offset: 0}} />
      </div>
    );
  }
}
