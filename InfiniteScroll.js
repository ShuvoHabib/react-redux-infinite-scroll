import React, { Component } from 'react';
import { paginationCount } from '../../configs';
import spinner from './spinner.svg';

class InfiniteScroll extends Component {
  static defaultProps = {
    scrollerStyle: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto'
    },
    endTextStyle: {
      color: '#c1c1c1',
      padding: '0 0 10px 0',
      textAlign: 'center',
    },
    spinnerIcon: spinner,
    endText: "You're all caught up!"
  }

  state = {
    loadMoreShow: false,
    bottomPosition: false
  }

  handleScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop + 1;
    const clientHeight = e.target.clientHeight;
    const bottom = scrollHeight - scrollTop < clientHeight;
    const { currentPage, total } = this.props;
    const moreItems = (currentPage * paginationCount < total) ? true: false
    
    this.setState({
      loadMoreShow: moreItems,
      bottomPosition: bottom || false
    });

    if (bottom && moreItems) { 
      this.props.loadMore();
    }
  }

  render() { 
    const {
      children,
      endText,
      scrollerStyle, 
      endTextStyle,
      loadMore,
      spinnerIcon
    } = this.props;
    const { loadMoreShow, bottomPosition } = this.state;
    
    return (
      <div style= {scrollerStyle} onScroll={this.handleScroll}>
        { children }
        { loadMoreShow &&
          <div onClick={loadMore} className="text-center">
            <img src={spinnerIcon}  alt="spinner"/>
          </div>
        }
        {
          bottomPosition && !loadMoreShow && <div style={endTextStyle}>
            <span className="end-text">{endText}</span>
          </div>
        }
      </div>
    )
  }
}

export default InfiniteScroll;