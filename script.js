let products = [];
let cart = JSON.parse(localStorage.getItem('faith-eve-cart') || '{}');
let attribution = {};
const grid = document.querySelector('#product-grid');
const catalogSearch = document.querySelector('#catalog-search');
const departmentFilter = document.querySelector('#department-filter');
const categoryFilter = document.querySelector('#category-filter');
const sizeFilter = document.querySelector('#size-filter');
const pickupFilter = document.querySelector('#pickup-filter');
const sortFilter = document.querySelector('#sort-filter');
const catalogSummary = document.querySelector('#catalog-summary');
const integrationEvents = [];
function track(event, payload = {}) {
  const record = { event, payload, attribution, timestamp: new Date().toISOString() };
  integrationEvents.push(record);
  window.faithEveDataLayer = integrationEvents;
  console.info('[Faith & Eve integration event]', record);
}
function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    if (params.has(key)) attribution[key] = params.get(key);
  });
  if (Object.keys(attribution).length) localStorage.setItem('faith-eve-attribution', JSON.stringify(attribution));
  attribution = JSON.parse(localStorage.getItem('faith-eve-attribution') || '{}');
}
function titleCase(value) {
  return String(value).replace(/\b\w/g, letter => letter.toUpperCase());
}
function unique(values) {
  return [...new Set(values.flat().filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
}
function optionize(select, values, allLabel) {
  select.innerHTML = `<option value="all">${allLabel}</option>${values.map(value => `<option value="${value}">${titleCase(value)}</option>`).join('')}`;
}
function populateCatalogFilters() {
  optionize(departmentFilter, unique(products.map(p => p.department)), 'All departments');
  optionize(categoryFilter, unique(products.map(p => p.category)), 'All categories');
  optionize(sizeFilter, unique(products.map(p => p.sizes)), 'All sizes');
}
function getCatalogState() {
  return {
    query: catalogSearch.value.trim().toLowerCase(),
    department: departmentFilter.value,
    category: categoryFilter.value,
    size: sizeFilter.value,
    pickup: pickupFilter.value,
    sort: sortFilter.value
  };
}
function productSearchText(product) {
  return [
    product.name,
    product.type,
    product.department,
    product.collection,
    product.category,
    product.subcategory,
    product.sku,
    product.badges.join(' '),
    product.pickup.join(' ')
  ].join(' ').toLowerCase();
}
function filterProducts() {
  const state = getCatalogState();
  const matches = products.filter(product => {
    const hasPickup = product.pickup.length > 0;
    return (!state.query || productSearchText(product).includes(state.query))
      && (state.department === 'all' || product.department === state.department)
      && (state.category === 'all' || product.category === state.category)
      && (state.size === 'all' || product.sizes.map(String).includes(state.size))
      && (state.pickup === 'all' || (state.pickup === 'pickup' ? hasPickup : !hasPickup));
  });
  return matches.sort((a, b) => {
    if (state.sort === 'price-asc') return a.price - b.price;
    if (state.sort === 'price-desc') return b.price - a.price;
    if (state.sort === 'name') return a.name.localeCompare(b.name);
    return a.id - b.id;
  });
}
function renderProductCard(p) {
  const sizeLabel = p.sizes.join(', ');
  return `<article class="product-card" data-handle="${p.shopifyHandle}"><div class="product-image"><img src="${p.image}" alt="${p.name}, ${p.type}" loading="lazy"><div class="product-badges">${p.badges.map(b=>`<span>${b}</span>`).join('')}</div><button class="quick-add" data-add="${p.id}">Quick add</button></div><div class="product-meta"><div><h3>${p.name}</h3><p>${p.type}</p><small>${p.department} / ${titleCase(p.category)} / ${p.subcategory}</small><small>Sizes: ${sizeLabel}</small><small>${p.pickup.length ? `Pickup: ${p.pickup.join(', ')}` : 'Ship only / digital delivery'}</small></div><strong>$${p.price}</strong></div></article>`;
}
function renderProducts(){
  const matches = filterProducts();
  const departments = unique(matches.map(p => p.department));
  catalogSummary.textContent = `${matches.length} item${matches.length === 1 ? '' : 's'} across ${departments.length || 0} department${departments.length === 1 ? '' : 's'}`;
  if (!matches.length) {
    grid.innerHTML = '<p class="no-results">No merchandise found. Try a broader search or filter.</p>';
    track('nosto.product_grid_rendered', { count: 0, handles: [] });
    return;
  }
  grid.innerHTML = departments.map(department => {
    const departmentProducts = matches.filter(p => p.department === department);
    const categories = unique(departmentProducts.map(p => p.category));
    return `<section class="catalog-department"><div class="catalog-heading"><span>Department</span><h3>${department}</h3><p>${departmentProducts.length} item${departmentProducts.length === 1 ? '' : 's'}</p></div>${categories.map(category => {
      const categoryProducts = departmentProducts.filter(p => p.category === category);
      const subcategories = unique(categoryProducts.map(p => p.subcategory));
      return `<section class="catalog-category"><div class="catalog-subhead"><h4>${titleCase(category)}</h4><span>${categoryProducts.length} item${categoryProducts.length === 1 ? '' : 's'}</span></div>${subcategories.map(subcategory => `<div class="catalog-subcategory"><p>${subcategory}</p><div class="catalog-row">${categoryProducts.filter(p => p.subcategory === subcategory).map(renderProductCard).join('')}</div></div>`).join('')}</section>`;
    }).join('')}</section>`;
  }).join('');
  track('nosto.product_grid_rendered', { count: matches.length, handles: matches.map(p => p.shopifyHandle) });
}
function save(){localStorage.setItem('faith-eve-cart',JSON.stringify(cart));renderCart()}
function add(id){const product=products.find(p=>p.id===Number(id));cart[id]=(cart[id]||0)+1;save();openCart();track('shopify.add_to_cart',{variantId:product?.variantId,sku:product?.sku,quantity:cart[id]});const t=document.querySelector('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}
function renderRecommendations(items){
  const itemCategories = new Set(items.map(p=>p.category));
  const recs = products.filter(p=>!cart[p.id] && (itemCategories.has(p.category) || p.badges.includes('BOPIS'))).slice(0,2);
  document.querySelector('#cart-recs').innerHTML = recs.length ? `<p>Recommended for this bag</p>${recs.map(p=>`<button data-add="${p.id}"><img src="${p.image}" alt=""><span>${p.name}</span><strong>$${p.price}</strong></button>`).join('')}` : '';
}
function renderCart(){
  const items=products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id]}));
  const count=items.reduce((n,p)=>n+p.qty,0), total=items.reduce((n,p)=>n+p.price*p.qty,0);
  document.querySelector('#cart-count').textContent=count;document.querySelector('#drawer-count').textContent=`(${count})`;document.querySelector('#cart-total').textContent=`$${total}`;
  document.querySelector('#cart-items').innerHTML=items.map(p=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>Girls 5–13 · ${p.type}</p><small>${p.pickup.length ? `Pickup today: ${p.pickup[0]}` : 'Ship only'}</small><div class="qty"><button data-qty="${p.id}" data-dir="-1">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-dir="1">+</button></div><button class="remove" data-remove="${p.id}">Remove</button></div><strong>$${p.price*p.qty}</strong></div>`).join('');
  document.querySelector('#cart-empty').classList.toggle('show',!items.length);document.querySelector('#cart-footer').classList.toggle('hide',!items.length);
  renderRecommendations(items);
}
function openCart(){document.querySelector('#cart-drawer').classList.add('open');document.querySelector('#cart-overlay').classList.add('open');document.querySelector('#cart-drawer').setAttribute('aria-hidden','false')}
function closeCart(){document.querySelector('#cart-drawer').classList.remove('open');document.querySelector('#cart-overlay').classList.remove('open');document.querySelector('#cart-drawer').setAttribute('aria-hidden','true')}
async function init(){captureAttribution();try{products=await fetch('inventory.json').then(r=>{if(!r.ok)throw Error('Inventory unavailable');return r.json()});populateCatalogFilters();renderProducts();renderCart();track('shopify.storefront_ready',{products:products.length})}catch(error){grid.innerHTML='<p class="no-results">Start the local server to load inventory. See README.md.</p>';console.error(error)}}
init();
document.addEventListener('click',e=>{const addBtn=e.target.closest('[data-add]'),q=e.target.closest('[data-qty]'),r=e.target.closest('[data-remove]');if(addBtn)add(+addBtn.dataset.add);if(q){const id=q.dataset.qty;cart[id]=(cart[id]||0)+Number(q.dataset.dir);if(cart[id]<=0)delete cart[id];save()}if(r){delete cart[r.dataset.remove];save()}});
document.querySelectorAll('#catalog-search,#department-filter,#category-filter,#size-filter,#pickup-filter,#sort-filter').forEach(control=>control.addEventListener('input',renderProducts));
document.querySelector('#site-search').addEventListener('input',e=>{catalogSearch.value=e.target.value;renderProducts()});
document.querySelector('.search-toggle').addEventListener('click',()=>{document.querySelector('.search-wrap').classList.toggle('open');document.querySelector('#site-search').focus()});
document.querySelector('.cart-button').addEventListener('click',openCart);document.querySelector('#cart-close').addEventListener('click',closeCart);document.querySelector('#cart-overlay').addEventListener('click',closeCart);document.querySelector('#continue-shopping').addEventListener('click',closeCart);
document.querySelector('#checkout').addEventListener('click',()=>{const lines=Object.entries(cart).map(([id,qty])=>{const product=products.find(p=>p.id===Number(id));return {variantId:product?.variantId,quantity:qty}});track('shopify.checkout_started',{lines});alert('Shopify checkout integration point: send these cart lines to /cart/add.js or Storefront API checkout, then redirect to Shopify checkout with Shop Pay enabled.');});
document.querySelector('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();const email=document.querySelector('#email').value;localStorage.setItem('faith-eve-klaviyo-profile',JSON.stringify({email,consent:'email',source:'homepage_newsletter',attribution}));track('klaviyo.subscribe',{email,consent:'email',list:'homepage_newsletter'});document.querySelector('#form-note').textContent='Thank you — a note is on its way.';e.target.reset()});
const menuButton=document.querySelector('#menu-button'),navDropdown=document.querySelector('#nav-dropdown'),loginModal=document.querySelector('#login-modal');
function closeMenu(){navDropdown.classList.remove('open');menuButton.classList.remove('open');menuButton.setAttribute('aria-expanded','false');navDropdown.setAttribute('aria-hidden','true')}
menuButton.addEventListener('click',()=>{const open=!navDropdown.classList.contains('open');navDropdown.classList.toggle('open',open);menuButton.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));navDropdown.setAttribute('aria-hidden',String(!open))});
navDropdown.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.querySelector('#login-button').addEventListener('click',()=>{closeMenu();loginModal.classList.add('open');loginModal.setAttribute('aria-hidden','false')});
function closeLogin(){loginModal.classList.remove('open');loginModal.setAttribute('aria-hidden','true')}
document.querySelector('.login-close').addEventListener('click',closeLogin);document.querySelector('.modal-done').addEventListener('click',closeLogin);loginModal.addEventListener('click',e=>{if(e.target===loginModal)closeLogin()});
const serviceDrawer=document.querySelector('#service-drawer');
function openService(){serviceDrawer.classList.add('open');serviceDrawer.setAttribute('aria-hidden','false');track('gladly.drawer_opened')}
function closeService(){serviceDrawer.classList.remove('open');serviceDrawer.setAttribute('aria-hidden','true')}
document.querySelector('#service-launcher').addEventListener('click',openService);
document.querySelector('#service-close').addEventListener('click',closeService);
document.querySelector('#service-form').addEventListener('submit',e=>{e.preventDefault();const ticket={topic:document.querySelector('#service-topic').value,email:document.querySelector('#service-email').value,message:document.querySelector('#service-message').value,cart};localStorage.setItem('faith-eve-gladly-ticket',JSON.stringify(ticket));track('gladly.contact_submitted',ticket);document.querySelector('#service-note').textContent='Thank you — customer care has the details.';e.target.reset()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeMenu();closeLogin();closeService()}});
