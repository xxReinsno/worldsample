(() => {
  const tasks = {
    Pushing: {
      label: 'Pushing',
      description: 'Press bread into a toaster by executing contact-rich object displacement.',
      real: './static/videos/demos/Pushing/real.mp4',
      synthetic: './static/videos/demos/Pushing/synthetic.mp4'
    },
    Insertion: {
      label: 'Insertion',
      description: 'Insert a shaped block into its corresponding slot through precise alignment and contact.',
      real: './static/videos/demos/Insertion/real.mp4',
      synthetic: './static/videos/demos/Insertion/synthetic.mp4'
    },
    Sorting: {
      label: 'Sorting',
      description: 'Identify and pick the target object from a plate containing distractors.',
      real: './static/videos/demos/Sorting/real.mp4',
      synthetic: './static/videos/demos/Sorting/synthetic.mp4'
    },
    'pick-place': {
      label: 'Pick & Place',
      description: 'Grasp the target object and place it into the designated container.',
      real: './static/videos/demos/pick-place/real.mp4',
      synthetic: './static/videos/demos/pick-place/synthetic.mp4'
    },
    Assembly: {
      label: 'Assembly',
      description: 'Complete a long-horizon Tower-of-Hanoi assembly operation.',
      real: './static/videos/demos/Assembly/real.mp4',
      synthetic: './static/videos/demos/Assembly/synthetic.mp4'
    }
  };

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const heroVideo = document.querySelector('#hero-video');
  const realVideo = document.querySelector('#real-video');
  const syntheticVideo = document.querySelector('#synthetic-video');
  const realSource = document.querySelector('#real-video-source');
  const syntheticSource = document.querySelector('#synthetic-video-source');
  const taskTitle = document.querySelector('#demo-task-title');
  const taskDescription = document.querySelector('#demo-task-description');
  const taskButtons = [...document.querySelectorAll('.task-tab')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const playSilently = (video) => {
    if (!video || reduceMotion.matches) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  };

  const updateVideoSource = (video, source, path) => {
    video.pause();
    source.src = path;
    video.load();
    video.addEventListener('canplay', () => playSilently(video), { once: true });
  };

  const setTask = (taskId) => {
    const task = tasks[taskId];
    if (!task) return;

    taskTitle.textContent = task.label;
    taskDescription.textContent = task.description;
    taskButtons.forEach((button) => {
      const selected = button.dataset.task === taskId;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    updateVideoSource(realVideo, realSource, task.real);
    updateVideoSource(syntheticVideo, syntheticSource, task.synthetic);
  };

  taskButtons.forEach((button) => button.addEventListener('click', () => setTask(button.dataset.task)));

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks?.classList.toggle('is-open', !expanded);
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  }));

  const setMotionPreference = () => {
    if (!heroVideo) return;
    if (reduceMotion.matches) heroVideo.pause();
    else playSilently(heroVideo);
  };

  setMotionPreference();
  reduceMotion.addEventListener?.('change', setMotionPreference);
})();
