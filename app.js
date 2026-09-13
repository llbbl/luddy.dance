const video = document.querySelector('[data-video]');

if (video) {
  const frame = video.querySelector('iframe');

  const loadVideo = () => {
    if (!frame.hasAttribute('src')) {
      frame.src = frame.dataset.src;
    }
  };

  frame.addEventListener('load', () => {
    video.dataset.loaded = '';
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadVideo();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
  } else {
    loadVideo();
  }
}
