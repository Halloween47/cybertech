document.addEventListener('DOMContentLoaded', function () {
    const tags = document.querySelectorAll('.tag');
    const cards = document.querySelectorAll('.card');
    const emptyMessage = document.querySelector('.guides__empty');
  
    console.log('CyberGuard JS loaded');
    console.log('Tags trouvés:', tags.length);
    console.log('Cartes trouvées:', cards.length);
  
    tags.forEach(function (tag) {
      tag.addEventListener('click', function () {
        const category = tag.getAttribute('data-category');
  
        // 1. Mettre à jour l'état visuel des tags
        tags.forEach(function (t) {
          t.classList.remove('tag--active');
        });
        tag.classList.add('tag--active');
  
        // 2. Filtrer les cartes
        let visibleCount = 0;
  
        cards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
  
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('is-hidden');
            visibleCount++;
          } else {
            card.classList.add('is-hidden');
          }
        });
  
        // 3. Afficher le message vide si nécessaire
        if (emptyMessage) {
          emptyMessage.hidden = visibleCount > 0;
        }
      });
    });
  });