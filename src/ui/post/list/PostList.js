import React, {Component, PropTypes} from 'react';
import List, { genesisList } from '../../core/components/List';
import style from '../style.less';

@genesisList({
  name: 'Posts',
  listItem: [
    {
      label: 'Title',
      sort: 'title',
      field: 'title',
      render: (data) => <a href="#">{data.title}</a>,
    },
    {
      label: 'Image',
      field: 'imageUrl',
      render: (data) => <img className={style['td-img']} src={data.imageUrl} />
    },
    {
      label: 'Description',
      field: 'description'
    },
    {
      label: 'Date Created',
      field: 'createdAt'
    },
    {
      label: 'User ID',
      sort: 'UserId',
      field: 'UserId'
    },
  ],
  listFilters: [
    {
      filterName: 'Gender',
      field: 'gender',
      options: [
        {
          value: '',
          label: '-- Gender --'
        },
        {
          value: 'male',
          label: 'Male'
        },
        {
          value: 'female',
          label: 'Female'
        },
      ]
    }
  ]
})
export default class PostList extends Component {

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
