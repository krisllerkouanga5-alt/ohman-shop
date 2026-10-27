(() => {
  const WA = '24166799129';

  const products = [
    { id: 'outoulspray', name: 'Outoulspray', price: null },
    { id: 'poutoulspray', name: 'Poutoulspray', price: null },
    { id: 'amelaku', name: 'Amelaku (sachets)', price: null },
    { id: 'membre', name: 'Membre (pommade)', price: null }
  ];

  const dialog = document.getElementById('od');
  const form = document.getElementById('of');

  if (!dialog || !form) {
    console.error('OHMAN : formulaire de commande introuvable.');
    return;
  }

  const money = value =>
    new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';

  form.innerHTML = `
    <p>Choisissez plusieurs produits et leurs quantites.</p>
    <div id="ohman-cart-items"></div>
    <div style="margin:16px 0;padding:14px;border:1px solid #7775;border-radius:12px">
      <div style="display:flex;justify-content:space-between;gap:12px">
        <strong>Total estime</strong>
        <strong id="ohman-cart-total">Prix a renseigner</strong>
      </div>
      <small id="ohman-cart-note">Les tarifs seront confirmes par OHMAN.</small>
    </div>
    <label for="ohman-name">Nom complet</label>
    <input id="ohman-name" required autocomplete="name" style="width:100%;box-sizing:border-box;margin:6px 0 14px;padding:12px">
    <label for="ohman-phone">Telephone du client</label>
    <input id="ohman-phone" type="tel" required autocomplete="tel" style="width:100%;box-sizing:border-box;margin:6px 0 14px;padding:12px">
    <label for="ohman-address">Adresse de livraison</label>
    <textarea id="ohman-address" required autocomplete="street-address" rows="2" style="width:100%;box-sizing:border-box;margin:6px 0 14px;padding:12px"></textarea>
    <button class="pill" type="submit">Envoyer la commande sur WhatsApp</button>
  `;

  const items = document.getElementById('ohman-cart-items');

  products.forEach(product => {
    const row = document.createElement('div');
    row.style.cssText =
      'display:grid;grid-template-columns:minmax(0,1fr) 82px;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #7774';

    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = product.name;

    const price = document.createElement('div');
    price.textContent = 'Prix a confirmer';
    price.style.cssText = 'font-size:12px;opacity:.75;margin-top:4px';

    info.append(title, price);

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.min = '0';
    quantity.max = '20';
    quantity.step = '1';
    quantity.value = '0';
    quantity.setAttribute('aria-label', 'Quantite ' + product.name);
    quantity.style.cssText = 'width:100%;box-sizing:border-box;padding:10px';

    quantity.addEventListener('input', () => {
      const n = Math.max(0, Math.min(20, Math.floor(Number(quantity.value) || 0)));
      quantity.value = String(n);
      updateTotal();
    });

    row.append(info, quantity);
    items.append(row);
    product.input = quantity;
  });

  function selectedProducts() {
    return products
      .map(product => ({ ...product, quantity: Number(product.input.value) || 0 }))
      .filter(product => product.quantity > 0);
  }

  function updateTotal() {
    const selected = selectedProducts();
    const totalElement = document.getElementById('ohman-cart-total');
    const note = document.getElementById('ohman-cart-note');

    if (!selected.length) {
      totalElement.textContent = '0 FCFA';
      note.textContent = 'Ajoutez au moins un produit.';
    } else if (selected.some(product => product.price === null)) {
      totalElement.textContent = 'Prix a renseigner';
      note.textContent = 'Les tarifs doivent etre renseignes avant le calcul du total.';
    } else {
      const total = selected.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
      );
      totalElement.textContent = money(total);
      note.textContent = 'Total calcule pour les produits selectionnes.';
    }
  }

  form.onsubmit = event => {
    event.preventDefault();

    const selected = selectedProducts();

    if (!selected.length) {
      alert('Choisissez au moins un produit et sa quantite.');
      return;
    }

    if (selected.some(product => product.price === null)) {
      alert('Les prix des produits doivent etre renseignes avant la commande.');
      return;
    }

    const name = document.getElementById('ohman-name').value.trim();
    const phone = document.getElementById('ohman-phone').value.trim();
    const address = document.getElementById('ohman-address').value.trim();

    if (!name || !phone || !address) {
      alert('Veuillez remplir votre nom, telephone et adresse de livraison.');
      return;
    }

    const total = selected.reduce(
      (sum, product) => sum + product.price * product.quantity, 0
    );

    const lines = selected.map(product =>
      '- ' + product.name + ' x ' + product.quantity +
      ' = ' + money(product.price * product.quantity)
    );

    const message = [
      'Bonjour OHMAN, voici ma commande :',
      '',
      ...lines,
      '',
      'TOTAL : ' + money(total),
      'Nom : ' + name,
      'Telephone : ' + phone,
      'Adresse de livraison : ' + address
    ].join('\n');

    window.open(
      'https://wa.me/' + WA + '?text=' + encodeURIComponent(message),
      '_blank',
      'noopener'
    );
  };

  updateTotal();
})();