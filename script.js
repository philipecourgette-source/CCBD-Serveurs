fetch('status.txt')
  .then(response => response.text())
  .then(data => {
    const lignes = data.split('\n');
    const container = document.getElementById('serveurs');

    container.innerHTML = '';

    lignes.forEach(ligne => {
      if (!ligne.trim()) return;

      const parts = ligne.split(':');
      if (parts.length < 2) return;

      const nom = parts[0].trim();
      const etat = parts[1].trim();

      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${nom}</strong> :
        ${etat === '1'
          ? '<span style="color:green">Fonctionnel</span>'
          : '<span style="color:red">Hors Service</span>'}
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier status.txt :', error);
  });