import reducer, {
  loading,
  loadingWithSpinner,
  loaded,
  initialState
} from '../../stores/actions/loader';

describe('test loader slice', () => {
  const loadingwithSpinnerAtivated = {
    loading: true,
    spinner: true
  };

  const loadingActivated = {
    loading: true,
    spinner: false
  };

  it('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      loading: false,
      spinner: false
    });
  });

  it('should dispatch loading', () => {
    const nextState = reducer(initialState, loading());
    expect(nextState).toEqual(loadingActivated);
  });

  it('should dispatch loading with spinner', () => {
    const nextState = reducer(initialState, loadingWithSpinner());
    expect(nextState).toEqual(loadingwithSpinnerAtivated);
  });

  it('should stop loading', () => {
    const nextState = reducer(initialState, loading());
    expect(nextState).toEqual(loadingActivated);

    const updatedState = reducer(nextState, loaded());

    expect(updatedState).toEqual(initialState);
  });
});
