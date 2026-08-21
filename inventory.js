const vendors = [
  {name:'Faire',domain:'faire.com',type:'Wholesale marketplace',tags:['marketplace','boutique'],badges:['Best first stop','$13–$25 typical'],description:'A huge dedicated kids-apparel marketplace with thousands of brands. Strong for comparing independent labels, testing small buys, and building the opening assortment; outerwear can reach roughly $30+ wholesale.',url:'https://www.faire.com/'},
  {name:'FashionGo',domain:'fashiongo.net',type:'Apparel marketplace',tags:['marketplace'],badges:['Multi-vendor','Kids & baby'],description:'One of the largest apparel-specific wholesale marketplaces, with dedicated girls’, boys’, baby, and Kids & Baby sections. Useful for finding many manufacturers without opening a separate account for each.',url:'https://www.fashiongo.net/'},
  {name:'OrangeShine',domain:'orangeshine.com',type:'Fashion marketplace',tags:['marketplace'],badges:['Broad selection','Fast comparison'],description:'A large wholesale fashion marketplace with a substantial children’s section and thousands of styles—particularly useful for rapidly comparing silhouettes, trends, and price points.',url:'https://www.orangeshine.com/'},
  {name:'Kiskissing',domain:'kiskissing.com',type:'Children’s specialist',tags:['boutique'],badges:['Strong brand fit','Baby to children'],description:'Focused on baby, toddler, and children’s boutique clothing. Dresses, rompers, coordinated outfits, and styled pieces make this especially relevant to the Faith & Eve point of view.',url:'https://www.kiskissing.com/'},
  {name:'Wholesale7',domain:'wholesale7.net',type:'Value wholesaler',tags:['low-minimum'],badges:['No order minimum','Bulk discounts'],description:'An inexpensive source for kids’ dresses, tops, sets, and seasonal clothes. A practical testing ground for starting small, with no stated minimum order and deeper discounts at higher quantities.',url:'https://www.wholesale7.net/'},
  {name:'Mud Pie Wholesale',domain:'wholesale.mudpie.com',type:'Boutique wholesale',tags:['boutique'],badges:['Retailer program','Traditional styling'],description:'Polished, traditional boutique clothing, particularly for babies and toddlers. Its softer, older-fashioned styling could complement the Faith & Eve assortment through an established retailer program.',url:'https://wholesale.mudpie.com/'},
  {name:'Tasha Apparel',domain:'tashaapparel.com',type:'Los Angeles wholesaler',tags:['low-minimum'],badges:['No order minimum','US fulfillment'],description:'Carries girls’ clothing alongside a larger adult catalog. Merchandise commonly comes in packs of around six, but there is no minimum order value; U.S. fulfillment and dropshipping are also available.',url:'https://www.tashaapparel.com/'},
  {name:'Alibaba',domain:'alibaba.com',type:'Global manufacturing',tags:['marketplace','manufacturing'],badges:['OEM / ODM','Variable MOQ'],description:'Best once a specific garment direction is clear. Its broad supplier base supports OEM and ODM production, and some listings offer surprisingly small minimums for sampling or an early custom run.',url:'https://www.alibaba.com/'},
  {name:'Global Lover / KissWhom',domain:'kisswhom.com',type:'Trend wholesaler',tags:['marketplace'],badges:['Value testing','All children’s categories'],description:'A broad fashion wholesaler with baby-girl, baby-boy, girls’, and boys’ categories. Better as a secondary source for inexpensive trend experiments than as the foundation of the collection.',url:'https://www.kisswhom.com/'},
  {name:'Dear-Lover',domain:'dear-lover.com',type:'Boutique fashion wholesaler',tags:['marketplace'],badges:['Parent / child','Occasional pieces'],description:'Primarily focused on adult boutique fashion, with selected children’s and parent-child collections. Useful for occasional coordinated or trend-led pieces rather than a complete kids assortment.',url:'https://www.dear-lover.com/'}
];

const assortment = [
  {name:'Necklaces & jewelry',department:'jewelry',icon:'J',note:'Charm necklaces, bracelets, rings, and gift sets.',partner:'Faire',price:'Kids jewelry often $3-$8+',url:'https://www.faire.com/discover/little-girl-accessories',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('J','Jewelry','#f3ead8','#8f5a44','#2e4a39','Giftable sparkle'))},
  {name:'Keepsake dolls',department:'other',icon:'D',note:'Soft dolls and small companions for gifting.',partner:'Faire',price:'From about $12 wholesale',url:'https://www.faire.com/discover/wholesale-dolls',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('D','Keepsake dolls','#f4eadf','#8f5a44','#2e4a39','Soft dolls for gifting'))},
  {name:'Hair ties & clips',department:'other',icon:'H',note:'Gentle elastics, bows, barrettes, and boxed sets.',partner:'Faire',price:'Hair accessories start around $2',url:'https://www.faire.com/discover/kids-accessories',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('H','Hair ties','#dfe7db','#2e4a39','#8f5a44','Hair clips and ties'))},
  {name:'Lip gloss',department:'other',icon:'L',note:'Kid-friendly gloss sets with playful packaging.',partner:'Faire',price:'About $3-$6 wholesale',url:'https://www.faire.com/discover/tween-accessories',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('L','Lip gloss','#f6dede','#8f5a44','#2e4a39','Tween beauty sets'))},
  {name:'Little fidgets',department:'other',icon:'F',note:'Small tactile toys and squishies for the counter.',partner:'OrangeShine',price:'From about $3 wholesale',url:'https://www.orangeshine.com/wholesale/kids',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('F','Little fidgets','#efe7da','#2e4a39','#8f5a44','Novelty counters'))},
  {name:'Cases & pouches',department:'other',icon:'C',note:'Mini cosmetic cases, hair-tie cases, and small bags.',partner:'Faire',price:'Bags and cases start around $6',url:'https://www.faire.com/discover/tween-accessories',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('C','Cases & pouches','#e7efe4','#8f5a44','#2e4a39','Mini storage'))},
  {name:'Coats',department:'other',icon:'C',note:'Seasonal outerwear, quilted jackets, and dress coats.',partner:'Tasha Apparel',price:'Quote by style; outerwear can run $30+',url:'https://www.tashaapparel.com/collections/wholesale-girls-clothing',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('C','Coats','#e7edf4','#2e4a39','#8f5a44','Seasonal outerwear'))},
  {name:'Loungewear',department:'other',icon:'L',note:'Soft top-and-pant sets for slow mornings and sleep.',partner:'Kiskissing',price:'Commonly about $7-$20',url:'https://www.kiskissing.com/wholesale-kids-pajamas.html',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('L','Loungewear','#eef2e8','#8f5a44','#2e4a39','Cozy sets'))},
  {name:'Pants & bottoms',department:'other',icon:'P',note:'Corduroy, denim, leggings, skirts, and easy trousers.',partner:'OrangeShine',price:'Varies by style and pack',url:'https://www.orangeshine.com/wholesale/kids',image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('P','Pants','#f0e4dc','#2e4a39','#8f5a44','Easy bottoms'))},
  {name:'Ready-to-wear',department:'other',icon:'R',note:'Dresses, tops, sets, and complete boutique looks.',partner:'Kiskissing',price:'Dresses often start near $3.50',url:'https://www.kiskissing.com/',accent:true,image:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svgArt('R','Ready-to-wear','#efe6dd','#8f5a44','#2e4a39','Boutique looks'))}
];

const assortmentGrid = document.querySelector('#assortment-grid');
const inventoryOtherGrid = document.querySelector('#inventory-other-grid');
const departmentButtons = [...document.querySelectorAll('#department-tabs button')];
function svgArt(letter,title,bg,ink,rust,caption){
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="28" fill="url(#g)"/>
      <circle cx="520" cy="100" r="74" fill="${rust}" opacity=".16"/>
      <circle cx="118" cy="320" r="92" fill="${ink}" opacity=".08"/>
      <rect x="58" y="68" width="142" height="24" rx="12" fill="${ink}" opacity=".16"/>
      <text x="58" y="286" font-family="Italiana, serif" font-size="150" fill="${ink}" opacity=".9">${letter}</text>
      <text x="62" y="344" font-family="DM Mono, monospace" font-size="22" fill="${rust}" letter-spacing="2">${caption}</text>
      <path d="M392 250c22-70 93-112 160-100-15 44-47 82-94 103-23 10-47 15-66 14z" fill="${rust}" opacity=".15"/>
      <path d="M350 130c55 10 95 40 120 88" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" opacity=".35"/>
    </svg>`;
}
function renderAssortment(department = 'all'){
  const pieces = assortment.filter(item => item.department === 'jewelry' && (department === 'all' || item.department === department));
  assortmentGrid.innerHTML = pieces.map((item,index) => `
    <article class="assortment-card${item.accent ? ' accent' : ''}">
      <span class="piece-number">${String(index + 1).padStart(2,'0')} / ${String(pieces.length).padStart(2,'0')}</span>
      <img class="piece-image" src="${item.image}" alt="${item.name} image">
      <h3>${item.name}</h3>
      <p class="piece-note">${item.note}</p>
      <div class="price-row"><span>Starting price</span><strong>${item.price}</strong></div>
      <div class="source-pair"><div><span>Source partner</span><strong>${item.partner}</strong></div><a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Source ${item.name} from ${item.partner}">↗</a></div>
    </article>`).join('');
}
function renderInventoryOther(){
  const pieces = assortment.filter(item => item.department === 'other');
  inventoryOtherGrid.innerHTML = pieces.map((item,index) => `
    <article class="assortment-card${item.accent ? ' accent' : ''}">
      <span class="piece-number">${String(index + 1).padStart(2,'0')} / ${String(pieces.length).padStart(2,'0')}</span>
      <img class="piece-image" src="${item.image}" alt="${item.name} image">
      <h3>${item.name}</h3>
      <p class="piece-note">${item.note}</p>
      <div class="price-row"><span>Starting price</span><strong>${item.price}</strong></div>
      <div class="source-pair"><div><span>Source partner</span><strong>${item.partner}</strong></div><a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Source ${item.name} from ${item.partner}">↗</a></div>
    </article>`).join('');
}
departmentButtons.forEach(button => button.addEventListener('click', () => {
  departmentButtons.forEach(item => item.classList.toggle('active', item === button));
  renderAssortment(button.dataset.department);
}));
renderAssortment();
renderInventoryOther();

const list = document.querySelector('#source-list');
const search = document.querySelector('#source-search');
const count = document.querySelector('#source-count');
const filters = [...document.querySelectorAll('.filter-bar button')];
let activeFilter = 'all';

function render(){
  const query = search.value.trim().toLowerCase();
  const visible = vendors.filter(v => (activeFilter === 'all' || v.tags.includes(activeFilter)) && (!query || Object.values(v).flat().join(' ').toLowerCase().includes(query)));
  count.textContent = `${visible.length} source${visible.length === 1 ? '' : 's'}`;
  list.innerHTML = visible.map((v, index) => `
    <article class="vendor-row">
      <span class="vendor-number">${String(index + 1).padStart(2,'0')}</span>
      <div class="vendor-name"><h3>${v.name}</h3><p>${v.domain}</p></div>
      <p class="vendor-copy">${v.description}</p>
      <div class="vendor-meta">${v.badges.map(b => `<span>${b}</span>`).join('')}</div>
      <a class="vendor-link" href="${v.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${v.name}">↗</a>
    </article>`).join('') || '<p class="empty-state">No sources match that search.</p>';
}

filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  render();
}));
search.addEventListener('input', render);
render();
