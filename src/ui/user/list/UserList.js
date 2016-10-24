import React, {Component, PropTypes} from 'react';
import List, { genesisList } from '../../core/components/list/List';
// import style from '../style.less';

@genesisList({
  name: 'Users',
  listItem: [],
  listFilters: []
})
export default class UserList extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchListData: PropTypes.func.isRequired,
    listItem: PropTypes.array.isRequired,
    listNavigation: PropTypes.object.isRequired,
    listFilters: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    return (<List {...this.props} />);
  }
}
