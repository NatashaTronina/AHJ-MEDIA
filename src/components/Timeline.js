import { renderPost } from './Post';
import { createInputPanel } from './InputPanel';
import { openCoordinatesModal } from './CoordinatesModal';
import { getCurrentPosition } from '../utils/geolocation';
import { getSeedPosts } from '../data/seedPosts';

export class Timeline {
  constructor(root) {
    this.root = root;
    this.posts = getSeedPosts();

    this.postsContainer = document.createElement('div');
    this.postsContainer.className = 'timeline__posts';

    this.build();
    this.renderPosts();
  }

  build() {
    const app = document.createElement('div');
    app.className = 'app';

    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    const rail = document.createElement('div');
    rail.className = 'timeline__rail';
    const railLine = document.createElement('div');
    railLine.className = 'timeline__rail-line';
    rail.append(railLine);

    timeline.append(rail, this.postsContainer);

    const inputPanel = createInputPanel((text) => this.handleNewText(text));

    app.append(timeline, inputPanel);
    this.root.append(app);
  }

  renderPosts() {
    this.postsContainer.innerHTML = '';
    this.posts.forEach((post) => {
      this.postsContainer.append(renderPost(post));
    });
  }

  addPost(post) {
    this.posts.unshift(post);
    this.renderPosts();
  }

  async handleNewText(text) {
    try {
      const { latitude, longitude } = await getCurrentPosition();
      this.addPost({
        id: `post-${Date.now()}`,
        type: 'text',
        text,
        date: new Date(),
        coordinates: [latitude, longitude],
      });
    } catch (err) {
      const manual = await openCoordinatesModal();
      if (!manual) return;
      this.addPost({
        id: `post-${Date.now()}`,
        type: 'text',
        text,
        date: new Date(),
        coordinates: [manual.latitude, manual.longitude],
      });
    }
  }
}
