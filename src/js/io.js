const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    }
  });
};

const options = {};
const observer = new IntersectionObserver(callback, options);

const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
