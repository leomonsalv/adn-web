import reducer, {
  showNotification,
  clearNotification,
  initialState
} from '../../stores/actions/notification';

describe('test notifications slice', () => {
  const notification = {
    type: 'info',
    message: 'informative text',
    content: 'informative content',
    show: true
  };
  it('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      type: '',
      message: '',
      content: '',
      show: false
    });
  });

  it('should dispatch notification', () => {
    const nextState = reducer(initialState, showNotification(notification));
    expect(nextState).toEqual(notification);
  });

  it('should clean the notification sent', () => {
    const nextState = reducer(initialState, showNotification(notification));
    expect(nextState).toEqual(notification);

    const updatedState = reducer(nextState, clearNotification());

    expect(updatedState).toEqual(initialState);
  });
});
