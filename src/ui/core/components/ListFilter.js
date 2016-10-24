import React, { Component, PropTypes } from 'react';

export default class ListSearch extends Component {

  static propTypes = {
    handleFilter: PropTypes.func.isRequired,
    listFilters: PropTypes.array.isRequired
  }

  handleFilter(ev) {
    const select = ev.currentTarget;
    const { field } = select.dataset;
    const value = select.value;
    this.props.handleFilter({
      filter: {
        field,
        value
      }
    });
  }

  render() {
    const { props } = this;
    const { listFilters } = props;
    const filters = listFilters.map((item, index) => {
      const { options, filterName, field } = item;
      const selectOptions = options.map((optionItem, optionIndex) => {
        const { value, label } = optionItem;
        return (
          <option value={value} key={optionIndex}>{label}</option>
        );
      });
      return (
        <div className="form-group" key={index}>
          <label className="sr-only" htmlFor={field}>{filterName}</label>
          <select className="form-control" data-field={field} onChange={this.handleFilter.bind(this)} >
            {selectOptions}
          </select>
        </div>
      );
    });

    return (
      <form className="form-inline pull-right" onSubmit={() => false}>
        {filters}
      </form>
    );
  }
}
