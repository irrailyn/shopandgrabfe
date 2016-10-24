import React, { Component, PropTypes } from 'react';
import { isFunction } from '../../../helpers/App';

export default class ListContent extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    listItem: PropTypes.array.isRequired,
  }

  render() {
    const { props } = this;
    const { data, listItem } = props;
    let contents;

    if (data.length) {
      contents = data.map((dataItem, index) => {
        return (
          <tr key={index}>
            {
              listItem.map((lItem, innerIndex) => {
                const { render, field } = lItem;
                let content = '';

                if (render && isFunction(render)) {
                  content = render(dataItem);
                } else if (field) {
                  content = dataItem[field];
                }

                return (
                  <td key={innerIndex}>{content}</td>
                );
              })
            }
          </tr>
        );
      });
    } else {
      contents = <tr><td colSpan={listItem.length}>No items found.</td></tr>;
    }

    return (
      <tbody>
        {contents}
      </tbody>
    );
  }
}
