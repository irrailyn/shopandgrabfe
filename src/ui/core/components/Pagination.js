import React, { Component, PropTypes } from 'react';

export default class Posts extends Component {
  static propTypes = {
    getCurrentPage: PropTypes.func.isRequired,
    displayPosts: PropTypes.func.isRequired,
    getSearch: PropTypes.func.isRequired,
    getOrder: PropTypes.func.isRequired,
    getLimit: PropTypes.func.isRequired,
    getOffset: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  fetchPerPage = (event) => {
    const limit = this.props.getLimit();
    const order = this.props.getOrder();
    const search = this.props.getSearch();
    const offset = (event.target.dataset.page - 1) * this.props.getLimit();
    this.props.setCurrentPage(Number(event.target.dataset.page));
    this.props.setOffset(offset);
    this.props.displayPosts(order, limit, offset, search);
  }

  getPages = () => {
    const { total } = this.props;
    const limit = this.props.getLimit();
    const currentPage = this.props.getCurrentPage();
    // const pathname = routing.location.pathname;
    // const path = pathname.split('/');
    const pageTotal = total / limit;
    const numPages = (total % limit === 0) ? pageTotal : parseInt(pageTotal, 10) + 1;
    const pages = [];
    let ind = 0;
    let page = 0;
    while (ind < numPages) {
      page = ind + 1;
      pages.push(
        <li key={ page } className={ (page === currentPage) ? 'active' : '' }><span data-page={ page } onClick={ this.fetchPerPage }>{ page }</span></li>
      );
      ind++;
    }

    return pages;
  }

  render() {
    return (
      <nav className={ styles.pages }>
        <ul className="pagination">
          { this.getPages() }
        </ul>
      </nav>
    );
  }
}
