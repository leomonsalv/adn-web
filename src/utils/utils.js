const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction(...arguments_) {
    const context = this;

    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(context, arguments_);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (immediate && !timeout) func.apply(context, arguments_);
  };
};

export default debounce;
