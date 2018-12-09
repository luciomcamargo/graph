import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './Tags.css';

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        { id: 'CZ', text: 'CZ' },
        { id: 'AA', text: 'AA' },
        { id: 'UK', text: 'UK' },
        { id: 'QA', text: 'QA' },
        { id: 'AE', text: 'AE' }
      ]
    };
  }

  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  render() {
    const { tags } = this.state;
    return (
      <div>
        <ReactTags
          tags={tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
        />
      </div>
    );
  }
}
export default Tags;
