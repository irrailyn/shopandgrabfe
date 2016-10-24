import React, { Component, PropTypes } from 'react';
import style from './List.less';

export default class ListHeader extends Component {

  static propTypes = {
    handleSort: PropTypes.func.isRequired,
    headerItems: PropTypes.array.isRequired
  }

  handleSort(ev) {
    ev.preventDefault();
    const { sortField } = ev.currentTarget.dataset;
    this.props.handleSort({
      sortField
    });
  }

  render() {
    const { props } = this;
    const { headerItems } = props;
    const headers = headerItems.map((item, index) => {
      const { sort } = item;
      const sortIcon = ( <span className={style.sort}></span>);
      return (
        <th data-sort-field={(sort) ? sort : null}
          className={(sort) ? style['list-sorter'] : null}
          key={index}
          onClick={(sort) ? this.handleSort.bind(this) : () => false }>
            {item.label}{(sort) ? sortIcon : null}
        </th>
      );
    });

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }
}
