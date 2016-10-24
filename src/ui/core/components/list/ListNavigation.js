import React, { Component, PropTypes } from 'react';

/**
 * Public: Component
 */

export default class ListNavigation extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    handleNavigation: PropTypes.func.isRequired
  }

  handleNavigation(ev) {
    ev.preventDefault();
    const { page } = ev.currentTarget.dataset;
    const { limit } = this.props;

    this.props.handleNavigation({
      limit,
      offset: limit * (page - 1)
    });
  }

  render() {
    const { count, limit, offset} = this.props;
    const current = Math.floor(offset / limit) + 1;
    const numPage = Math.floor(count / limit);
    const pagination = [];
    let ctr;
    let page;

    for (ctr = 1; ctr <= numPage; ctr++) {
      page = (
        <li className={(ctr === current) ? 'active' : ''} key={ctr}>
          <a href="#"
            onClick={(ctr !== current) ? this.handleNavigation.bind(this) : () => false }
            data-page={ctr}>{ctr}</a>
        </li>
      );

      pagination.push(page);
    }

    return (
      <nav>
        <ul className="pagination">
          {pagination}
        </ul>
      </nav>
    );
  }
}
