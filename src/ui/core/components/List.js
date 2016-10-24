import React, { Component, PropTypes } from 'react';
import ListSearch from './ListSearch';
import ListHeader from './ListHeader';
import ListContent from './ListContent';
import ListNavigation from './ListNavigation';
import ListFilter from './ListFilter';
import style from './List.less';

const gList = (DecoratedComponent, data) => {
  const { listItem, name, listFilters } = data;

  return class extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return <DecoratedComponent {...this.props} listItem={listItem} name={name} listFilters={(listFilters) ? listFilters : []} />;
    }
  };
};

/**
 * Public: Decorator
 */

export function genesisList(data) {
  return (target) => gList(target, data);
}

/**
 * Public: Component
 */

export default class List extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchListData: PropTypes.func.isRequired,
    listItem: PropTypes.array.isRequired,
    listNavigation: PropTypes.object.isRequired,
    listFilters: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { props } = this;
    const {data, fetchListData, listItem, listNavigation, listFilters, name } = props;
    const headerItems = listItem.map((lItem) => {
      const { label, sort } = lItem;
      return {
        label,
        sort
      };
    });

    const searchProps = {
      handleSearch: (params) => { fetchListData(params); }
    };
    const headerProps = {
      headerItems,
      handleSort: (params) => { fetchListData(params); }
    };
    const contentProps = {
      data,
      listItem
    };
    const navigationProps = {
      ...listNavigation,
      handleNavigation: (params) => { fetchListData(params); }
    };

    const filterProps = {
      listFilters,
      handleFilter: (params) => { fetchListData(params); }
    };

    return (
      <div>
        <div className={style['list-filter-search-cont'] + ' clearfix'}>
          <h1 className="pull-left">{name}</h1>
          <ListSearch {...searchProps} />
          <ListFilter {...filterProps} />
        </div>
        <table className="table table-bordered">
          <ListHeader {...headerProps} />
          <ListContent {...contentProps} />
        </table>
        <ListNavigation {...navigationProps} />
      </div>
    );
  }
}
