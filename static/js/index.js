(() => {
  const tasks = {
    Pushing: {
      label: 'Pushing',
      description: 'Press bread into a toaster by executing contact-rich object displacement.',
      realPoster: './static/images/demo-posters/Pushing/real-side.jpg',
      syntheticPoster: './static/images/demo-posters/Pushing/synthetic-side.jpg',
      realWristPoster: './static/images/demo-posters/Pushing/real-wrist.jpg',
      syntheticWristPoster: './static/images/demo-posters/Pushing/synthetic-wrist.jpg',
      real: './static/videos/demos/Pushing/real.mp4',
      synthetic: './static/videos/demos/Pushing/synthetic.mp4',
      realWrist: './static/videos/demos/Pushing/real-wrist.mp4',
      syntheticWrist: './static/videos/demos/Pushing/synthetic-wrist.mp4'
    },
    Insertion: {
      label: 'Insertion',
      description: 'Insert a shaped block into its corresponding slot through precise alignment and contact.',
      realPoster: './static/images/demo-posters/Insertion/real-side.jpg',
      syntheticPoster: './static/images/demo-posters/Insertion/synthetic-side.jpg',
      realWristPoster: './static/images/demo-posters/Insertion/real-wrist.jpg',
      syntheticWristPoster: './static/images/demo-posters/Insertion/synthetic-wrist.jpg',
      real: './static/videos/demos/Insertion/real.mp4',
      synthetic: './static/videos/demos/Insertion/synthetic.mp4',
      realWrist: './static/videos/demos/Insertion/real-wrist.mp4',
      syntheticWrist: './static/videos/demos/Insertion/synthetic-wrist.mp4'
    },
    Sorting: {
      label: 'Sorting',
      description: 'Identify and pick the target object from a plate containing distractors.',
      realPoster: './static/images/demo-posters/Sorting/real-side.jpg',
      syntheticPoster: './static/images/demo-posters/Sorting/synthetic-side.jpg',
      realWristPoster: './static/images/demo-posters/Sorting/real-wrist.jpg',
      syntheticWristPoster: './static/images/demo-posters/Sorting/synthetic-wrist.jpg',
      real: './static/videos/demos/Sorting/real.mp4',
      synthetic: './static/videos/demos/Sorting/synthetic.mp4',
      realWrist: './static/videos/demos/Sorting/real-wrist.mp4',
      syntheticWrist: './static/videos/demos/Sorting/synthetic-wrist.mp4'
    },
    'pick-place': {
      label: 'Pick & Place',
      description: 'Grasp the target object and place it into the designated container.',
      realPoster: './static/images/demo-posters/pick-place/real-side.jpg',
      syntheticPoster: './static/images/demo-posters/pick-place/synthetic-side.jpg',
      realWristPoster: './static/images/demo-posters/pick-place/real-wrist.jpg',
      syntheticWristPoster: './static/images/demo-posters/pick-place/synthetic-wrist.jpg',
      real: './static/videos/demos/pick-place/real.mp4',
      synthetic: './static/videos/demos/pick-place/synthetic.mp4',
      realWrist: './static/videos/demos/pick-place/real-wrist.mp4',
      syntheticWrist: './static/videos/demos/pick-place/synthetic-wrist.mp4'
    },
    Assembly: {
      label: 'Assembly',
      description: 'Complete a long-horizon Tower-of-Hanoi assembly operation.',
      realPoster: './static/images/demo-posters/Assembly/real-side.jpg',
      syntheticPoster: './static/images/demo-posters/Assembly/synthetic-side.jpg',
      realWristPoster: './static/images/demo-posters/Assembly/real-wrist.jpg',
      syntheticWristPoster: './static/images/demo-posters/Assembly/synthetic-wrist.jpg',
      real: './static/videos/demos/Assembly/real.mp4',
      synthetic: './static/videos/demos/Assembly/synthetic.mp4',
      realWrist: './static/videos/demos/Assembly/real-wrist.mp4',
      syntheticWrist: './static/videos/demos/Assembly/synthetic-wrist.mp4'
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
  const viewTitle = document.querySelector('#demo-view-title');
  const taskDescription = document.querySelector('#demo-task-description');
  const taskButtons = [...document.querySelectorAll('.task-tab')];
  const viewButtons = [...document.querySelectorAll('.view-tab')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeTask = 'Pushing';
  let activeView = 'side';

  const playSilently = (video) => {
    if (!video || reduceMotion.matches) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(() => {});
  };

  const updateVideoSource = (video, source, path) => {
    video.pause();
    source.src = `${path}?v=2`;
    video.load();
    video.addEventListener('canplay', () => playSilently(video), { once: true });
  };

  const setTask = (taskId) => {
    const task = tasks[taskId];
    if (!task) return;

    activeTask = taskId;
    taskTitle.textContent = task.label;
    viewTitle.textContent = activeView === 'side' ? 'Side-camera comparison' : 'Wrist-camera comparison';
    taskDescription.textContent = task.description;
    realVideo.poster = activeView === 'side' ? task.realPoster : task.realWristPoster;
    syntheticVideo.poster = activeView === 'side' ? task.syntheticPoster : task.syntheticWristPoster;
    taskButtons.forEach((button) => {
      const selected = button.dataset.task === taskId;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    updateVideoSource(realVideo, realSource, activeView === 'side' ? task.real : task.realWrist);
    updateVideoSource(syntheticVideo, syntheticSource, activeView === 'side' ? task.synthetic : task.syntheticWrist);
  };

  taskButtons.forEach((button) => button.addEventListener('click', () => setTask(button.dataset.task)));
  viewButtons.forEach((button) => button.addEventListener('click', () => {
    activeView = button.dataset.view;
    viewButtons.forEach((viewButton) => {
      const selected = viewButton.dataset.view === activeView;
      viewButton.classList.toggle('is-active', selected);
      viewButton.setAttribute('aria-pressed', String(selected));
    });
    setTask(activeTask);
  }));

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
  playSilently(realVideo);
  playSilently(syntheticVideo);
  reduceMotion.addEventListener?.('change', setMotionPreference);
})();
