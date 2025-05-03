// main.js
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';

Alpine.store('reveal', {});

Alpine.plugin(intersect);

window.Alpine = Alpine;
Alpine.start();
