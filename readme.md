# React Infinite scroll Redux/Redux Saga Support

A React component to make all your infinite scrolling problems go away with just 4 kB! Pull Down to Refresh feature added. An infinite-scroll that actually works and super-simple to integrate!

### A fully guided documentation for this journey in inifinity Scrolling

### Installation

#### `npm i react-redux-redux-saga-infinite-scroll`;

### ES6  (Let's call the file name, 'Items.jsx/Items.js')

`import InfiniteScroll from 'react-redux-redux-saga-infinite-scroll';`

#### Render Component
```
const items = items.map((item, i)=> 
  <div className="item-wrapper">
    {item}
  </div>
)

<InfiniteScroll
  currentPage= {currentPage}
  total={total} 
  endText={endText}
  loadMore={this.loadMoreAPICall}
  >
    {items}
</InfiniteScroll>
```

#### Method
```
loadMoreAPICall = () => {
  const paginationCount = 10 // Number of products per page to show
  const currentPage = 1 // Data from API
  this.props.getItemList(currentPage + 1, paginationCount); /* Get Request */
}
```

### Other Available Props: 
```
  1. scrollerStyle = {
      height: 'value',
      overflow: 'auto'
    }
  2. endTextStyle = {
      color: '#XXXXX',
      padding: 'value',
      textAlign: 'value',
    }
  3. spinnerIcon= '/url_of_icon.svg';
```
## Redux

### Action
```
export const getItemList = (number, size) => {
  return {
    type: 'ITEM_LIST',
    request: {
      method: 'GET',
      url: `/items?pageNumber=${number}&pageSize=${size}`,
    }
  };
};
```

### Reducer

```
function itemListReducer(state = {data: []}, action) {
  switch (action.type) {
    case success('ITEM_LIST'):
      
     /* Write this part as your own for getting rid of duplicate data in state.  */

      const x  = state.data && state.data.filter((data) => data && data.id === action.data.data[0] && action.data.data[0].id)
      if(x[0] && x[0].id === action.data.data && action.data.data[0] && action.data.data[0].id) {
        return state;
      }

      // Finally let's return the state
      return {
        ...state,
        data: [
          ...state.data, 
          ...action.data.data
        ],
        /* meta will be returning the data like, currentPage number, total number of items, etc. */
        meta: {...state.meta, ...action.data.meta}
      };
      default:
        return state
  }
}
```

## For Redux saga

Reducer part remains the same, just add create rootSaga and attach the needed actions as per your setup. 