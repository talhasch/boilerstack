import React, {Component} from 'react';

import {Button, Navbar, Nav, InputGroup, FormControl, Form} from 'react-bootstrap';

import {checkSvg, timesSvg, redoSvg} from '../../../svg';

class AppPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      val: ''
    }
  }

  componentDidMount() {
    const {user} = this.props;
    const {history} = this.props;

    if (!user) {
      history.push('/');
      return;
    }

    const {fetchItems} = this.props;
    fetchItems();
  }

  add = () => {
    const {addItem} = this.props;
    addItem();
  };

  toggle = (todo) => {
    const {toggleItem} = this.props;
    toggleItem(todo);
  };

  delete = (todo) => {
    const {deleteItem} = this.props;
    deleteItem(todo);
  };

  titleChanged = (e) => {
    const val = e.target.value;

    const {setTitle} = this.props;
    setTitle(val);
  };

  filterChanged = (e) => {
    const val = e.target.checked;

    const {setFilter} = this.props;
    setFilter(val);
  };

  signOut = (e) => {
    e.preventDefault();
    const {signOut, history} = this.props;
    signOut();
    history.push('/');
  };

  render() {
    const {todo} = this.props;
    const {title, inProgress, filter, items} = todo.toJSON();

    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand>BoilerStack</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={this.signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="app-container">
          <div className="todo-form">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Add new todo"
                value={title}
                onChange={this.titleChanged}
              />
              <InputGroup.Append>
                <Button disabled={title.trim() === '' || inProgress} variant="primary" onClick={this.add}>Add</Button>
              </InputGroup.Append>
            </InputGroup>

            <div className="filter">
              <Form.Check
                type="checkbox"
                id="show-completed"
                label={`Hide completed`}
                onChange={this.filterChanged}
              />
            </div>
          </div>

          <div className="todo-list">
            {items.valueSeq().map((i) => {
              if (filter && i.attrs.completed) {
                return null;
              }

              return <div className={`todo-item ${i.attrs.completed ? 'completed' : ''}`} key={i._id}>
                <span className="todo-content">{i.attrs.title}</span>
                <span title="Toggle" className={`btn-toggle ${inProgress ? 'disabled' : ''}`} onClick={() => {
                  this.toggle(i)
                }}>{i.attrs.completed ? redoSvg : checkSvg}</span>

                {i.attrs.completed &&
                <span title="Delete" className={`btn-delete ${inProgress ? 'disabled' : ''}`} onClick={() => {
                  this.delete(i)
                }}>{timesSvg}</span>
                }
              </div>
            })}
          </div>
        </div>
      </>
    )
  }
}


export default AppPage;