import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../../hooks/useForm';

describe('Hook useForm', () => {
  const target = {
    name: 'input-mock',
    value: 'test'
  };

  it('Check if hook is imported as function', () => {
    expect(typeof useForm).toBe('function');
  });

  const { result, rerender } = renderHook(() => useForm(target));

  it('Check if hook is mounted', () => {
    expect(result.current.values).toStrictEqual(target);
  });

  rerender(target);

  it('change resourcers for Hook', () => {
    target.value = 'new-value';
    act(() => {
      result.current.handleInputChange({ target });
    });
    expect(result.current.values).toStrictEqual(target);
  });
});
