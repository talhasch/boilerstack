import {Map, OrderedMap} from 'immutable';

import {Todo} from '../model';

import {USER_SIGNOUT} from './user';

export const SET_TITLE = '@todo/SET_TITLE';

export const ADD_ITEM = '@todo/ADD_ITEM';
export const ITEM_ADDED = '@todo/ITEM_ADDED';

export const FETCH_ITEMS = '@todo/FETCH_ITEMS';
export const ITEMS_FETCHED = '@todo/ITEMS_FETCHED';

export const TOGGLE_ITEM = '@todo/TOGGLE_ITEM';
export const ITEM_TOGGLED = '@todo/ITEM_TOGGLED';

export const DELETE_ITEM = '@todo/DELETE_ITEM';
export const ITEM_DELETED = '@todo/ITEM_DELETED';

export const SET_FILTER = '@todo/SET_FILTER';

const initialState = Map({
  inProgress: false,
  title: '',
  filter: false,
  items: OrderedMap({})
});


/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      const {title} = action.payload;
      return state.set('title', title);
    }
    case SET_FILTER: {
      return state.set('filter', action.payload);
    }
    case ADD_ITEM: {
      return state.set('inProgress', true);
    }
    case ITEM_ADDED: {
      const {newItem} = action.payload;
      return state.set('inProgress', false).set('title', '').setIn(
        ['items', newItem._id], newItem
      );
    }
    case FETCH_ITEMS: {
      return state.set('inProgress', true);
    }
    case ITEMS_FETCHED: {
      const {items} = action.payload;

      let newState = state.set('inProgress', false);
      items.forEach(i => {
        newState = newState.setIn(
          ['items', i._id], i
        );
      });

      return newState;
    }
    case TOGGLE_ITEM: {
      return state.set('inProgress', true);
    }
    case ITEM_TOGGLED: {
      const {item} = action.payload;
      return state.set('inProgress', false).setIn(
        ['items', item._id], item
      );
    }
    case DELETE_ITEM: {
      return state.set('inProgress', true);
    }
    case ITEM_DELETED: {
      const {item} = action.payload;
      return state.set('inProgress', false).deleteIn(
        ['items', item._id]
      );
    }
    case USER_SIGNOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

/* Actions */

export const setTitle = (title) => {
  return (dispatch) => {
    dispatch(titleSet(title));
  }
};

export const setFilter = () => {
  return (dispatch, getState) => {
    const {todo: state} = getState();
    const val = state.get('filter');

    dispatch(filterSet(!val));
  }
};

export const addItem = () => {
  return (dispatch, getState) => {
    const {todo: state} = getState();
    const title = state.get('title');

    dispatch(itemAdd(title));

    const completed = false;
    const deleted = false;

    const m = new Todo({title, completed, deleted});
    m.save().then((item) => {
      dispatch(itemAdded(item));
    });
  }
};

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(itemsFetch());

    Todo.fetchOwnList({
      deleted: false,
      sort: '-createdAt'
    }).then((items) => {
      dispatch(itemsFetched(items));
    });
  }
};

export const toggleItem = (item) => {
  return (dispatch) => {
    dispatch(itemToggle(item));

    item.update({
      completed: !item.attrs.completed,
    });

    item.save().then((resp) => {
      dispatch(itemToggled(resp));
    });
  }
};

export const deleteItem = (item) => {
  return (dispatch) => {
    dispatch(itemDelete(item));

    item.update({
      deleted: true
    });

    item.save().then((resp) => {
      dispatch(itemDeleted(resp));
    });
  }
};

/* Action creators */


export const titleSet = (title) => ({
  type: SET_TITLE,
  payload: {title}
});

export const filterSet = (val) => ({
  type: SET_FILTER,
  payload: val
});

export const itemAdd = (title) => ({
  type: ADD_ITEM,
  payload: {title}
});

export const itemAdded = (newItem) => ({
  type: ITEM_ADDED,
  payload: {newItem}
});

export const itemsFetch = () => ({
  type: FETCH_ITEMS
});

export const itemsFetched = (items) => ({
  type: ITEMS_FETCHED,
  payload: {items}
});

export const itemToggle = (item) => ({
  type: TOGGLE_ITEM,
  payload: {item}
});

export const itemToggled = (item) => ({
  type: ITEM_TOGGLED,
  payload: {item}
});

export const itemDelete = (item) => ({
  type: DELETE_ITEM,
  payload: {item}
});

export const itemDeleted = (item) => ({
  type: ITEM_DELETED,
  payload: {item}
});

