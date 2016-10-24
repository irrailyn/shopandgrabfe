import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSampleList } from 'redux/modules/sampleList';
import SampleList from './list/SampleList';

@connect(
  state => ({
    sampleList: state.sampleList
  }),
  { fetchSampleList }
)
export default class List extends Component {

  static propTypes = {
    fetchSampleList: PropTypes.func.isRequired,
    sampleList: PropTypes.object.isRequired
  }

  componentWillMount() {
    const oSampleList = this.props.sampleList.toJS();
    const { isInit, limit, offset } = oSampleList;

    if (!isInit) {
      this.props.fetchSampleList({
        limit,
        offset
      });
    }
  }

  render() {
    const { props } = this;
    const oSampleList = props.sampleList.toJS();
    const { data, count, limit, offset } = oSampleList;
    const listNavigation = {
      count,
      limit,
      offset
    };

    return (
      <div>
        <SampleList data={data}
          fetchListData={(params) => { props.fetchSampleList(params); }}
          listNavigation={listNavigation} />
      </div>
    );
  }
}
