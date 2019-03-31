import reducer, {
  loginAct,
  logoutAct

} from './user'

let state = undefined;

it('1 default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2 login', () => {
  const act = loginAct('foo');
  state = reducer(null, act);
  expect(state).toMatchSnapshot();
});

it('200 logout', () => {
  const act = logoutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});