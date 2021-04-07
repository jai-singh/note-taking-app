let timer
export const debounce = (func, delay) => {
  return function(){
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  };
};
