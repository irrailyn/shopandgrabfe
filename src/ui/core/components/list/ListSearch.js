import React, { Component, PropTypes } from 'react';
import style from './List.less';

const SEARCH_TIMEOUT = 1000;
/**
 * Public: Component
 */

export default class ListSearch extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      searchTimeOut: null
    };
  }

  handleSearch(ev) {
    const search = ev.currentTarget.value;
    const { searchTimeOut } = this.state;
    const { handleSearch } = this.props;

    if (searchTimeOut !== null) {
      clearTimeout(searchTimeOut);
    }

    const sto = setTimeout(() => { handleSearch({search}); }, SEARCH_TIMEOUT);

    this.setState({
      searchTimeOut: sto
    });
  }

  render() {
    return (
        <input type="text" placeholder="Search" className={style['search-box'] + ' list-search pull-right'} onChange={this.handleSearch.bind(this)} />
    );
  }
}
