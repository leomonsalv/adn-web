const simulateChangeOnInput = (wrapper, inputSelector, newtarget) => {
  const input = wrapper.find(inputSelector);
  input.simulate('change', {
    target: newtarget
  });

  return wrapper.find(inputSelector);
};

export default simulateChangeOnInput;
