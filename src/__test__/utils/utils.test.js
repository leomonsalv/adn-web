import sinon from 'sinon';
import debounce from '../../utils/utils';

describe('Debounce util test', () => {
  let timer;

  beforeEach(() => {
    timer = sinon.useFakeTimers();
  });

  afterEach(() => {
    timer.restore();
  });

  test('debounce with timer', () => {
    const func = jest.fn();
    const wait = 1000;
    const immediate = false;

    const debounceFunc = debounce(func, wait, immediate);

    debounceFunc();

    expect(func).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      timer.tick(500);
      debounceFunc();
    }
    expect(func).toHaveBeenCalledTimes(0);

    timer.tick(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('debounce immediate', () => {
    const func = jest.fn();
    const wait = 0;
    const immediate = true;

    const debounceFunc = debounce(func, wait, immediate);

    debounceFunc();

    expect(func).toHaveBeenCalledTimes(0);
  });
});
