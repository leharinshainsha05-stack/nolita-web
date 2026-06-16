/* ==========================================================================
   NOLITA CAFE CLIENT LOGIC (Vanilla JS)
   Controls: Menu rendering, Interactive cart, Scroll triggers, UPI Overlay
   ========================================================================== */

// Master client-side configuration for multi-tenant static fallback
const CLIENT_CAFE_CONFIG = {
  nolita: {
    name: 'Nolita',
    name_lower: 'nolita',
    tagline: 'Sourdough Pizza & Craft Eats in Nungambakkam, Chennai',
    primary_color: '#52a6de',
    accent_color: '#3a8cbf',
    light_color: '#e5f4fd',
    hero_image_url: 'assets/hero.png',
    mascot_sprite_source: 'assets/mascot_transparent.png',
    location_tags: ['Nungambakkam', 'Chennai', 'Khader Nawaz Khan Road', 'Sourdough Pizza', 'NYC Industrial Cafe'],
    story_title: 'Our Sourdough Story',
    story_text: 'Inspired by the espresso bars and rustic sourdough pizzerias of NoLiTa (North of Little Italy), Manhattan, we bring wood-fired authenticity and craft comfort eats straight to Chennai.',
    menu_data: [
      { id: "p1", category: "pizzas", name: "Pepperoni Pizza", price: 795, desc: "Pork pepperoni, premium rich mozzarella cheese, and our signature slow-simmered marinara pizza sauce on hand-stretched sourdough.", tag: "Chef Special", img: "assets/pizza.png" },
      { id: "p2", category: "pizzas", name: "Classic Margherita", price: 525, desc: "Fresh hand-pulled mozzarella, house pizza sauce, aromatic fresh basil leaves, and a drizzle of extra virgin olive oil.", tag: "Vegetarian", img: "assets/pizza.png" },
      { id: "pa1", category: "pastas-mains", name: "Fettuccine Beef Bolognese", price: 595, desc: "Slow-simmered minced tenderloin ragù in red wine tomato sauce, served over fresh fettuccine, topped with shaved parmesan.", tag: "Classic", img: "assets/pasta.png" },
      { id: "b1", category: "burgers", name: "Heirloom Tomato, Burrata & Pesto", price: 675, desc: "Fresh heirloom tomatoes, homemade basil pesto, rich creamy burrata cheese, and wild arugula inside a foot-long rustic bread.", tag: "Vegetarian", img: "assets/burger.png" },
      { id: "ap1", category: "appetisers", name: "Giant Mozzarella Sticks", price: 595, desc: "Crispy-fried giant mozzarella cheese sticks sprinkled with peri peri seasoning, served with a side of garlic aioli.", tag: "Popular", img: "assets/appetiser.png" }
    ],
    slider_data: [
      {
        id: 0,
        heading: 'PIZZA',
        badge: 'NYC Sourdough Crust',
        desc: 'Sourdough crust fermented for 48 hours, stretched by hand, and baked at 450°C in our brick oven for that perfect leopard-spotted char.',
        bgColor: '#8c2d19',
        mainImg: 'assets/pizza_slice_pepperoni.png',
        leftImg: 'assets/hero_dessert.png',
        rightImg: 'assets/hero_burger.png',
        spices: ['🍕', '🌿', '🍅'],
        stats: [
          { num: '48H', label: 'Fermented' },
          { num: '450°C', label: 'Brick Oven' },
          { num: '100%', label: 'Sourdough' }
        ]
      },
      {
        id: 1,
        heading: 'BURGER',
        badge: 'Craft Gourmet Grills',
        desc: 'Juicy, flame-grilled premium patties, double cheddar cheese, and fresh farm ingredients layered in a toasted artisanal brioche bun.',
        bgColor: '#996f2d',
        mainImg: 'assets/hero_burger.png',
        leftImg: 'assets/pizza_slice_pepperoni.png',
        rightImg: 'assets/hero_dessert.png',
        spices: ['🧀', '🧅', '🍔'],
        stats: [
          { num: '100%', label: 'Fresh Grills' },
          { num: 'Fresh', label: 'Brioche Bun' },
          { num: 'Double', label: 'Cheddar' }
        ]
      },
      {
        id: 2,
        heading: 'SWEETS',
        badge: 'Loaded Shakes & Treats',
        desc: 'Indulge in our premium loaded strawberry milkshakes, warm chocolate chip skillet cookie sundae, and authentic Italian tiramisu.',
        bgColor: '#c58c82',
        mainImg: 'assets/hero_dessert.png',
        leftImg: 'assets/hero_burger.png',
        rightImg: 'assets/pizza_slice_pepperoni.png',
        spices: ['🍓', '🍫', '🍪'],
        stats: [
          { num: 'Fresh', label: 'Baked Daily' },
          { num: 'Premium', label: 'Cream Blend' },
          { num: '100%', label: 'Real Nutella' }
        ]
      }
    ]
  },
  chamiers: {
    name: 'Chamiers Cafe',
    name_lower: 'chamiers',
    tagline: 'Artisanal Coffee & All-Day Dining in Alwarpet, Chennai',
    primary_color: '#8c7853',
    accent_color: '#5c4e36',
    light_color: '#f5f2eb',
    hero_image_url: 'assets/beverage.png',
    mascot_sprite_source: 'assets/mascot_transparent.png',
    location_tags: ['Alwarpet', 'Chennai', 'Chamiers Road', 'Artisanal Coffee', 'All-Day English Breakfast'],
    story_title: 'The Chamiers Vibe',
    story_text: 'Chamiers Cafe is an elegant, vintage-inspired sanctuary in Chennai, serving artisanal coffees, fresh salads, and comforting European plates surrounded by classic brass aesthetics.',
    menu_data: [
      { id: "c1", category: "pizzas", name: "Classic Flat White", price: 220, desc: "Premium hand-selected espresso roast, extracted double and combined with velvety microfoamed milk.", tag: "House Blend", img: "assets/beverage.png" },
      { id: "c2", category: "pizzas", name: "Cold Brew Tonic", price: 240, desc: "Signature 18-hour cold steeped coffee, served over sparkling tonic and an orange wheel.", tag: "Refreshing", img: "assets/beverage.png" },
      { id: "c3", category: "pastas-mains", name: "Wild Mushroom Risotto", price: 485, desc: "Creamy arborio rice cooked with fresh shiitake, button, and porcini mushrooms, finished with white truffle oil.", tag: "Gluten Free", img: "assets/pasta.png" },
      { id: "c4", category: "burgers", name: "Chamiers Club Sandwich", price: 395, desc: "Double decker toasted bread layered with grilled chicken, eggs, crispy bacon, tomatoes, and herb mustard.", tag: "Signature", img: "assets/burger.png" }
    ],
    slider_data: [
      {
        id: 0,
        heading: 'COFFEE',
        badge: 'Artisanal Roasts',
        desc: 'Slow-extracted specialty grade coffee beans sourced directly from Chikmagalur, ground fresh on our Mazzer grinders.',
        bgColor: '#5c4e36',
        mainImg: 'assets/beverage.png',
        leftImg: 'assets/hero_burger.png',
        rightImg: 'assets/hero_dessert.png',
        spices: ['☕', '🍪', '🥛'],
        stats: [
          { num: '100%', label: 'Arabica' },
          { num: '88+', label: 'Cupping Score' },
          { num: 'Local', label: 'Sourced' }
        ]
      },
      {
        id: 1,
        heading: 'CLASSIC',
        badge: 'European Dining',
        desc: 'Comforting recipes from southern Europe, using imported parmesan, extra virgin olive oil, and organic farm greens.',
        bgColor: '#8c7853',
        mainImg: 'assets/hero_burger.png',
        leftImg: 'assets/beverage.png',
        rightImg: 'assets/hero_dessert.png',
        spices: ['🥬', '🧀', '🍽️'],
        stats: [
          { num: 'Fresh', label: 'Daily Prep' },
          { num: 'Organic', label: 'Veggies' },
          { num: 'Import', label: 'Cheese' }
        ]
      }
    ]
  },
  thebark: {
    name: 'The Bark',
    name_lower: 'thebark',
    tagline: 'Pet-Friendly Cafe & Comfort Food in Nungambakkam, Chennai',
    primary_color: '#2e7d32',
    accent_color: '#1b5e20',
    light_color: '#e8f5e9',
    hero_image_url: 'assets/hero_burger.png',
    mascot_sprite_source: 'assets/mascot_transparent.png',
    location_tags: ['Nungambakkam', 'Chennai', 'Pet Friendly Cafe', 'Dog Park Dining', 'Comfort Food'],
    story_title: 'A Pet Sanctuary',
    story_text: 'The Bark is Chennai\'s premier pet-friendly dining retreat, featuring a vibrant dog garden, pet menus, and mouth-watering comfort food for human companions.',
    menu_data: [
      { id: "b1", category: "pizzas", name: "Puppy Treat Burger (Pet Safe)", price: 250, desc: "Salt-free chicken and pumpkin mash patty wrapped in a grain-free sweet potato bun, safe for your dogs.", tag: "Pet Special", img: "assets/burger.png" },
      { id: "b2", category: "pastas-mains", name: "Loaded Three-Cheese Mac", price: 380, desc: "Creamy cheddar, mozzarella, and processed cheese sauce baked with macaroni, topped with parsley crumbs.", tag: "Comfort Food", img: "assets/pasta.png" },
      { id: "b3", category: "burgers", name: "Bark Special Clubhouse", price: 420, desc: "Triple-decker sandwich with grilled chicken breast, fried egg, lettuce, sliced tomato, and garlic cheese spread.", tag: "Best Seller", img: "assets/burger.png" }
    ],
    slider_data: [
      {
        id: 0,
        heading: 'BARK',
        badge: 'Pet-Friendly Haven',
        desc: 'Let your pets play in our secure grass gardens while you enjoy thick milkshakes, loaded macaroni, and wood-fired pizzas.',
        bgColor: '#1b5e20',
        mainImg: 'assets/hero_burger.png',
        leftImg: 'assets/hero_dessert.png',
        rightImg: 'assets/pizza_slice_pepperoni.png',
        spices: ['🐶', '🍔', '🌳'],
        stats: [
          { num: 'Dog Park', label: 'Outdoor Garden' },
          { num: 'Fresh', label: 'Dog Treats' },
          { num: '100%', label: 'Pet Friendly' }
        ]
      }
    ]
  }
};

// Client-Side Multi-Tenant Query Parameter Sniffer
const urlParams = new URLSearchParams(window.location.search);
let activeCafeKey = urlParams.get('cafe');
if (activeCafeKey) activeCafeKey = activeCafeKey.toLowerCase();
if (!activeCafeKey || !CLIENT_CAFE_CONFIG[activeCafeKey]) {
  activeCafeKey = 'nolita';
}

// Check if we need client-side variable injection (when server-side injection is skipped)
if (!window.CAFE_BRAND_CONFIG) {
  const brandConfig = CLIENT_CAFE_CONFIG[activeCafeKey];
  window.CAFE_BRAND_CONFIG = {
    name: brandConfig.name,
    tagline: brandConfig.tagline
  };
  window.CAFE_MENU_DATA = brandConfig.menu_data;
  window.CAFE_SLIDER_DATA = brandConfig.slider_data;

  // Apply CSS overrides to Head immediately to prevent style flashes
  const clientStyle = document.createElement('style');
  clientStyle.id = 'dynamic-brand-variables-client';
  clientStyle.innerHTML = `
    :root {
      --clr-blue: ${brandConfig.primary_color} !important;
      --clr-blue-dark: ${brandConfig.accent_color} !important;
      --clr-blue-light: ${brandConfig.light_color} !important;
    }
    .mascot-avatar {
      background-image: url('${brandConfig.mascot_sprite_source}') !important;
    }
  `;
  document.head.appendChild(clientStyle);

  // Perform DOM substitutions on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    document.title = `${brandConfig.name} | ${brandConfig.tagline}`;
    
    document.querySelectorAll(".loader-logo").forEach(el => el.textContent = brandConfig.name_lower);
    document.querySelectorAll("#header-logo").forEach(el => el.textContent = brandConfig.name_lower);
    document.querySelectorAll(".ticket-brand").forEach(el => el.textContent = `${brandConfig.name} Chennai`);
    document.querySelectorAll(".merchant-name").forEach(el => el.textContent = `${brandConfig.name} Chennai`);
    document.querySelectorAll(".merchant-upi-id").forEach(el => el.textContent = `${brandConfig.name_lower}@ybl`);
    document.querySelectorAll(".marker-bubble").forEach(el => el.textContent = brandConfig.name_lower);
    
    const footerCopyright = document.querySelector("footer p");
    if (footerCopyright) {
      footerCopyright.innerHTML = footerCopyright.innerHTML.replace("Nolita Cafe", `${brandConfig.name} Cafe`);
    }

    // Story section swaps
    const storyCardTitle = document.getElementById("story-card-title");
    if (storyCardTitle) storyCardTitle.textContent = brandConfig.story_title;
    
    const storyCardText = document.getElementById("story-card-text");
    if (storyCardText) storyCardText.textContent = brandConfig.story_text;

    // Timeline and specific headings
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach(t => {
      if (t.textContent.includes("Nolita")) {
        t.textContent = t.textContent.replace(/Nolita/g, brandConfig.name);
      }
    });
  });
}

const MENU_DATA = window.CAFE_MENU_DATA || [
  // PIZZAS
  { id: "p1", category: "pizzas", name: "Pepperoni Pizza", price: 795, desc: "Pork pepperoni, premium rich mozzarella cheese, and our signature slow-simmered marinara pizza sauce on hand-stretched sourdough.", tag: "Chef Special", img: "assets/pizza.png" },
  { id: "p2", category: "pizzas", name: "Classic Margherita", price: 525, desc: "Fresh hand-pulled mozzarella, house pizza sauce, aromatic fresh basil leaves, and a drizzle of extra virgin olive oil.", tag: "Vegetarian", img: "assets/pizza.png" },
  { id: "p3", category: "pizzas", name: "Chicken & Jalapeños BBQ", price: 695, desc: "Sourdough crust topped with smoky BBQ chicken, hot jalapeños, mozzarella cheese, and red onions.", tag: "Spicy", img: "assets/pizza.png" },
  { id: "p4", category: "pizzas", name: "Salami Milano, Olives & Mushrooms", price: 795, desc: "Premium pork salami milano, house pizza sauce, fresh mozzarella, black olives, and button mushrooms.", tag: "Signature", img: "assets/pizza.png" },
  { id: "p5", category: "pizzas", name: "Chicken Pesto Cherry Tomatoes", price: 695, desc: "Grilled chicken strips, homemade green basil pesto base, juicy cherry tomatoes, and mozzarella cheese.", tag: "Fresh", img: "assets/pizza.png" },
  { id: "p6", category: "pizzas", name: "Shaved Asparagus, Olives & Truffle Oil", price: 895, desc: "Gourmet white pie topped with fresh arugula, cherry tomatoes, shaved asparagus, black olives, mozzarella, and white truffle oil.", tag: "Premium", img: "assets/pizza.png" },
  { id: "p7", category: "pizzas", name: "Curry Hill Pizza", price: 575, desc: "Indian spiced tikka sauce base, mozzarella cheese, roasted onions, bell peppers, and succulent chicken tikka.", tag: "Local Twist", img: "assets/pizza.png" },
  { id: "p8", category: "pizzas", name: "Brooklyn Special", price: 695, desc: "Classic tomato sauce, fresh broccoli, grilled eggplant, button mushrooms, red onions, and sundried tomatoes.", tag: "Vegan Friendly", img: "assets/pizza.png" },
  { id: "p9", category: "pizzas", name: "Times Square (All Meat)", price: 795, desc: "Meat lover's dream: pepperoni, chicken tikka, beef bits, marinara, and mozzarella on sourdough.", tag: "Chef Special", img: "assets/pizza.png" },

  // PASTAS & MAINS
  { id: "pa1", category: "pastas-mains", name: "Fettuccine Beef Bolognese", price: 595, desc: "Slow-simmered minced tenderloin ragù in red wine tomato sauce, served over fresh fettuccine, topped with shaved parmesan.", tag: "Classic", img: "assets/pasta.png" },
  { id: "pa2", category: "pastas-mains", name: "Brick Oven Roast Chicken Roulade", price: 650, desc: "Tender chicken breast stuffed with fresh spinach and cheese, roasted in our brick oven and served with white wine sauce.", tag: "Chef Special", img: "assets/pasta.png" },
  { id: "pa3", category: "pastas-mains", name: "Farfalle Truffle, Spinach & Corn", price: 495, desc: "Bow-tie pasta cooked with wild mushrooms, baby spinach, sweet corn, and a splash of aromatic white truffle paste.", tag: "Vegetarian", img: "assets/pasta.png" },
  { id: "pa4", category: "pastas-mains", name: "Gnocchi in Creamy Truffle", price: 550, desc: "Soft potato gnocchi served in a rich, creamy white sauce infused with premium truffle paste and parmesan.", tag: "Premium", img: "assets/pasta.png" },
  { id: "pa5", category: "pastas-mains", name: "Steak & Fries", price: 675, desc: "Pan-seared tenderloin steak (cooked to order) served with garlic butter, classic French fries, and pepper sauce.", tag: "Hearty", img: "assets/pasta.png" },

  // BURGERS & SANDWICHES
  { id: "b1", category: "burgers", name: "Heirloom Tomato, Burrata & Pesto", price: 675, desc: "Fresh heirloom tomatoes, homemade basil pesto, rich creamy burrata cheese, and wild arugula inside a foot-long rustic bread.", tag: "Vegetarian", img: "assets/burger.png" },
  { id: "b2", category: "burgers", name: "Philly Cheese Steak Footlong", price: 495, desc: "Sautéed tenderloin strips, caramelized onions, green bell peppers, crunchy lettuce, rich cheese sauce, and melted cheese.", tag: "Best Seller", img: "assets/burger.png" },
  { id: "b3", category: "burgers", name: "American Road House Burger (Chicken)", price: 525, desc: "Gourmet chicken patty, fresh crunchy lettuce, tomato, ketchup, mustard, melted cheddar, and grilled onions in a brioche bun.", tag: "Classic", img: "assets/burger.png" },
  { id: "b4", category: "burgers", name: "All About The Cheese (Beef)", price: 585, desc: "Homemade beef patty, double cheddar slices, lettuce, cucumber relish, and a signature creamy white cheese sauce.", tag: "Cheese Lover", img: "assets/burger.png" },

  // APPETISERS
  { id: "ap1", category: "appetisers", name: "Giant Mozzarella Sticks", price: 595, desc: "Crispy-fried giant mozzarella cheese sticks sprinkled with peri peri seasoning, served with a side of garlic aioli.", tag: "Popular", img: "assets/appetiser.png" },
  { id: "ap2", category: "appetisers", name: "Peri Peri Infused Chicken Wings", price: 595, desc: "Juicy, crispy chicken wings tossed in our signature hot peri peri glaze, served with cool chipotle mayo.", tag: "Spicy", img: "assets/appetiser.png" },
  { id: "ap3", category: "appetisers", name: "Fried Mac & Cheese Balls", price: 475, desc: "Baked macaroni and cheese balls breaded and golden-fried, served on hot marinara dip.", tag: "Comfort Food", img: "assets/appetiser.png" },
  { id: "ap4", category: "appetisers", name: "Stuffed Mushrooms", price: 375, desc: "Baked button mushrooms filled with seasoned bread crumbs, crushed pistachios, sundried tomatoes, pesto, and parmesan.", tag: "Vegetarian", img: "assets/appetiser.png" },

  // DESSERTS
  { id: "d1", category: "desserts", name: "Skillet Cookie Sundae", price: 595, desc: "Freshly-baked, warm chocochip skillet cookie topped with vanilla ice cream, hot chocolate fudge, and nuts.", tag: "Must Have", img: "assets/dessert.png" },
  { id: "d2", category: "desserts", name: "Old Fashioned Tiramisu", price: 375, desc: "Authentic Italian recipe with espresso-soaked ladyfingers, velvety mascarpone cream, and cocoa powder dusting.", tag: "Signature", img: "assets/dessert.png" },
  { id: "d3", category: "desserts", name: "Basque Cheesecake", price: 495, desc: "Burnt caramelized crust with a rich, super-creamy and custardy center. Served with berry compote.", tag: "Premium", img: "assets/dessert.png" },
  { id: "d4", category: "desserts", name: "Lotus Biscoff Serradurra", price: 325, desc: "Macanese sawdust pudding layered with whipped sweet cream and crushed Lotus Biscoff biscuit crumbs.", tag: "Trendy", img: "assets/dessert.png" },

  // BEVERAGES
  { id: "bv1", category: "beverages", name: "Oreo Cheesecake Milkshake", price: 350, desc: "Rich milkshake blended with real oreos, cream cheese, vanilla ice cream, and whipped cream topping.", tag: "Indulgent", img: "assets/beverage.png" },
  { id: "bv2", category: "beverages", name: "Hot Velvety Nutella (Premium)", price: 325, desc: "Thick, warm, and velvety hot chocolate blended with generous spoonfuls of Nutella hazelnut spread.", tag: "Best Seller", img: "assets/beverage.png" },
  { id: "bv3", category: "beverages", name: "Peach & Passion Fruit Iced Tea", price: 175, desc: "Freshly brewed Assam tea shaken with ice, sweet peach syrup, and tropical passion fruit pulp.", tag: "Refreshing", img: "assets/beverage.png" },
  { id: "bv4", category: "beverages", name: "Coffee Frappe", price: 195, desc: "Double shot espresso blended with milk, ice, and sweet vanilla syrup, finished with a chocolate drizzle.", tag: "Classic", img: "assets/beverage.png" }
];

// 2. Global State
let cart = [];
let bookingDetails = {};

// 3D Overlapping Slider Data
const SLIDER_DATA = window.CAFE_SLIDER_DATA || [
  {
    id: 0,
    heading: "PIZZA",
    badge: "NYC Sourdough Crust",
    desc: "Sourdough crust fermented for 48 hours, stretched by hand, and baked at 450°C in our brick oven for that perfect leopard-spotted char.",
    bgColor: "#8c2d19", // Terracotta Red
    mainImg: "assets/pizza_slice_pepperoni.png",
    leftImg: "assets/hero_dessert.png",
    rightImg: "assets/hero_burger.png",
    spices: ["🍕", "🌿", "🍅"],
    stats: [
      { num: "48H", label: "Fermented" },
      { num: "450°C", label: "Brick Oven" },
      { num: "100%", label: "Sourdough" }
    ]
  },
  {
    id: 1,
    heading: "BURGER",
    badge: "Craft Gourmet Grills",
    desc: "Juicy, flame-grilled premium patties, double cheddar cheese, and fresh farm ingredients layered in a toasted artisanal brioche bun.",
    bgColor: "#996f2d", // Mustard Golden Brown
    mainImg: "assets/hero_burger.png",
    leftImg: "assets/pizza_slice_pepperoni.png",
    rightImg: "assets/hero_dessert.png",
    spices: ["🧀", "🧅", "🍔"],
    stats: [
      { num: "100%", label: "Fresh Grills" },
      { num: "Fresh", label: "Brioche Bun" },
      { num: "Double", label: "Cheddar" }
    ]
  },
  {
    id: 2,
    heading: "SWEETS",
    badge: "Loaded Shakes & Treats",
    desc: "Indulge in our premium loaded strawberry milkshakes, warm chocolate chip skillet cookie sundae, and authentic Italian tiramisu.",
    bgColor: "#c58c82", // Rose-Blush
    mainImg: "assets/hero_dessert.png",
    leftImg: "assets/hero_burger.png",
    rightImg: "assets/pizza_slice_pepperoni.png",
    spices: ["🍓", "🍫", "🍪"],
    stats: [
      { num: "Fresh", label: "Baked Daily" },
      { num: "Premium", label: "Cream Blend" },
      { num: "100%", label: "Real Nutella" }
    ]
  }
];

let currentSlideIndex = 0;
let isSliderAnimating = false;

// 3. Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  setupMenuTabs();
  setupPromoBanner();
  setupCartEvents();
  setupBookingForm();
  setupUPIOverlay();
  setupTicketReset();
  
  // Set default date input value to today
  const dateInput = document.getElementById("booking-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  // Initialize immediately safe premium features (preloader, cursor, mobile menu, deep message modal)
  initLoader();
  initCustomCursor();
  setupMobileMenu();
  setupDeepMessagePopup();
  
  // Initialize default menu category filter
  filterCategory("pizzas");
});


// 5. Menu Rendering & Tab Filtering
function renderMenu() {
  const grid = document.getElementById("menu-items-grid");
  if (!grid) return;
  
  // Clear any existing menu items
  grid.innerHTML = "";
  
  MENU_DATA.forEach(item => {
    const card = document.createElement("div");
    card.className = `menu-card ${item.category}`;
    card.setAttribute("data-item-id", item.id);
    
    // Check if item is already in cart
    const inCart = cart.find(c => c.id === item.id);
    const btnText = inCart ? "Added ✔" : "Add to Pre-Order";
    const btnClass = inCart ? "btn-add-preorder selected" : "btn-add-preorder";
    
    card.innerHTML = `
      <div class="menu-card-image-wrapper">
        <img src="${item.img}" alt="${item.name}" class="menu-card-image">
      </div>
      <div class="menu-card-content">
        <div class="menu-card-header">
          <h3 class="item-title">${item.name}</h3>
          <span class="item-price">₹${item.price}</span>
        </div>
        <p class="item-description">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="item-tag">${item.tag}</span>
          <button class="${btnClass}" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">${btnText}</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Re-bind click event to newly created buttons
  bindMenuCardButtons();
}

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const category = tab.getAttribute("data-category");
      filterCategory(category);
    });
  });
}

function filterCategory(category) {
  const cards = document.querySelectorAll(".menu-card");
  cards.forEach(card => {
    if (card.classList.contains(category)) {
      card.style.display = "flex";
      gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
    } else {
      card.style.display = "none";
    }
  });
}

function bindMenuCardButtons() {
  const buttons = document.querySelectorAll(".btn-add-preorder");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      
      toggleCartItem(id, name, price);
    });
  });
}

// 6. Cart CRUD Operations
function toggleCartItem(id, name, price) {
  const index = cart.findIndex(item => item.id === id);
  
  if (index > -1) {
    // Remove if already exists (toggle action on menu card)
    cart.splice(index, 1);
    if (typeof triggerMascotReaction === "function") {
      triggerMascotReaction("sleepy", 3000);
    }
  } else {
    // Add to cart
    cart.push({ id, name, price, qty: 1 });
    // Scroll to cart container for immediate visual feedback
    const cartBox = document.getElementById("preorder-cart-box");
    if (cartBox) {
      cartBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (typeof triggerMascotReaction === "function") {
      triggerMascotReaction("heart", 3500);
    }
  }
  
  updateCartUI();
  updateMenuButtonsState();
}

function updateCartUI() {
  const badge = document.getElementById("cart-badge");
  const counterLabel = document.getElementById("cart-item-count-label");
  const emptyState = document.getElementById("empty-cart-msg");
  const listContainer = document.getElementById("cart-items-container");
  const footerDiv = document.getElementById("cart-footer-div");
  
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Update badges
  if (badge) {
    badge.innerText = totalQty;
    // Micro-interaction: scale pulse the cart badge when items change
    gsap.fromTo(badge,
      { scale: 0.7 },
      { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: "back.out(1.5)" }
    );
  }
  if (counterLabel) counterLabel.innerText = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;
  
  if (totalQty === 0) {
    if (emptyState) emptyState.style.display = "flex";
    if (listContainer) listContainer.style.display = "none";
    if (footerDiv) footerDiv.style.display = "none";
    
    // Hide preorder row in deposit calculations
    const preorderRow = document.getElementById("preorder-deposit-row");
    if (preorderRow) preorderRow.style.display = "none";
    
    updateDeposit(300);
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (listContainer) {
      listContainer.style.display = "flex";
      renderCartList(listContainer);
    }
    if (footerDiv) footerDiv.style.display = "flex";
    
    calculateTotals();
  }
}

function renderCartList(container) {
  container.innerHTML = "";
  
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₹${item.price}</span>
      </div>
      <div class="cart-item-actions">
        <button class="cart-btn-qty minus" data-id="${item.id}">&minus;</button>
        <span class="cart-item-qty">${item.qty}</span>
        <button class="cart-btn-qty plus" data-id="${item.id}">+</button>
        <button class="cart-btn-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
      </div>
    `;
    container.appendChild(div);
  });
  
  bindCartActionButtons();
}

function bindCartActionButtons() {
  document.querySelectorAll(".cart-btn-qty.plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = cart.find(c => c.id === id);
      if (item) {
        item.qty++;
        updateCartUI();
      }
    });
  });
  
  document.querySelectorAll(".cart-btn-qty.minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = cart.find(c => c.id === id);
      if (item) {
        item.qty--;
        if (item.qty <= 0) {
          const idx = cart.findIndex(c => c.id === id);
          cart.splice(idx, 1);
        }
        updateCartUI();
        updateMenuButtonsState();
      }
    });
  });
  
  document.querySelectorAll(".cart-btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const idx = cart.findIndex(c => c.id === id);
      if (idx > -1) {
        cart.splice(idx, 1);
        updateCartUI();
        updateMenuButtonsState();
      }
    });
  });
}

function updateMenuButtonsState() {
  const cards = document.querySelectorAll(".menu-card");
  cards.forEach(card => {
    const id = card.getAttribute("data-item-id");
    const btn = card.querySelector(".btn-add-preorder");
    if (!btn) return;
    
    const inCart = cart.find(c => c.id === id);
    if (inCart) {
      btn.innerText = "Added ✔";
      btn.classList.add("selected");
    } else {
      btn.innerText = "Add to Pre-Order";
      btn.classList.remove("selected");
    }
  });

  // Update preorder button in deep message popup modal if active
  const popupBtn = document.getElementById("deep-popup-preorder-btn");
  if (popupBtn) {
    const id = popupBtn.getAttribute("data-id");
    if (id) {
      const inCart = cart.find(c => c.id === id);
      if (inCart) {
        popupBtn.innerText = "Added ✔";
        popupBtn.classList.add("selected");
      } else {
        popupBtn.innerText = "Add to Pre-Order";
        popupBtn.classList.remove("selected");
      }
    }
  }
}

function calculateTotals() {
  const subtotalLabel = document.getElementById("cart-subtotal");
  const discountLabel = document.getElementById("cart-discount");
  const totalLabel = document.getElementById("cart-total");
  const preorderRow = document.getElementById("preorder-deposit-row");
  const preorderVal = document.getElementById("preorder-deposit-val");
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = Math.round(subtotal * 0.10); // 10% OFF discount
  const total = subtotal - discount;
  
  if (subtotalLabel) subtotalLabel.innerText = `₹${subtotal}`;
  if (discountLabel) discountLabel.innerText = `-₹${discount}`;
  if (totalLabel) totalLabel.innerText = `₹${total}`;
  
  // Table deposit calculations:
  // Standard table deposit is ₹300.
  // Pre-order deposit is calculated as 20% of food subtotal.
  // Total advance to pay is the higher of standard ₹300 or 20% of food subtotal.
  const preorderDeposit = Math.round(subtotal * 0.20);
  const finalDeposit = Math.max(300, preorderDeposit);
  
  if (preorderRow && preorderVal) {
    preorderRow.style.display = "flex";
    preorderVal.innerText = `₹${preorderDeposit}`;
  }
  
  updateDeposit(finalDeposit);
}

function updateDeposit(val) {
  const totalValLabel = document.getElementById("total-advance-val");
  const submitBtn = document.getElementById("booking-submit-btn");
  
  if (totalValLabel) totalValLabel.innerText = `₹${val}`;
  if (submitBtn) submitBtn.innerText = `Proceed to Secure Reservation (₹${val})`;
}

// Setup Pre-order Cart events
function setupCartEvents() {
  const cartTrigger = document.getElementById("cart-trigger-btn");
  if (cartTrigger) {
    cartTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      const cartBox = document.getElementById("preorder-cart-box");
      if (cartBox) {
        cartBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
}

// 7. High-Conversion Scroll-Triggered Promo Banner
function setupPromoBanner() {
  const banner = document.getElementById("sticky-promo");
  const closeBtn = document.getElementById("promo-close-btn");
  
  if (!banner) return;
  
  let isDismissed = false;
  
  const checkScroll = () => {
    if (isDismissed) return;
    // Trigger when scrolling past 400px
    if (window.scrollY > 400) {
      banner.classList.add("active");
    }
  };
  
  window.addEventListener("scroll", checkScroll);
  // Check immediately on load in case they refresh while already scrolled down
  checkScroll();
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      isDismissed = true;
      banner.classList.remove("active");
      window.removeEventListener("scroll", checkScroll);
    });
  }
  
  // Clicking CTA on banner scrolls to booking section
  const actionBtn = document.getElementById("promo-action-btn");
  if (actionBtn) {
    actionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("booking");
      if (target) {
        isDismissed = true;
        target.scrollIntoView({ behavior: "smooth" });
        banner.classList.remove("active");
        window.removeEventListener("scroll", checkScroll);
      }
    });
  }
}

// 8. Booking Form Submission
function setupBookingForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Retrieve inputs
    const name = document.getElementById("booking-name").value;
    const phone = document.getElementById("booking-phone").value;
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const guests = document.getElementById("booking-guests").value;
    
    // Save details
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deposit = Math.max(300, Math.round(subtotal * 0.20));
    
    bookingDetails = {
      name,
      phone,
      date,
      time,
      guests,
      deposit,
      preorders: cart.map(item => `${item.qty}x ${item.name}`).join(", ")
    };
    
    // Update amount in UPI modal
    const upiAmount = document.getElementById("upi-amount-label");
    if (upiAmount) upiAmount.innerText = `${deposit}.00`;
    
    // Open UPI Modal
    openUPIModal();
  });
}

// 9. UPI Payment Overlay Logic
function openUPIModal() {
  const modal = document.getElementById("upi-modal");
  const payScreen = document.getElementById("upi-pay-screen");
  const procScreen = document.getElementById("upi-processing-screen");
  const succScreen = document.getElementById("upi-success-screen");
  const failScreen = document.getElementById("upi-failure-screen");
  
  if (!modal) return;
  
  // Set initial screens state
  payScreen.style.display = "block";
  procScreen.style.display = "none";
  succScreen.style.display = "none";
  failScreen.style.display = "none";
  
  modal.classList.add("active");
}

function setupUPIOverlay() {
  const modal = document.getElementById("upi-modal");
  const closeBtn = document.getElementById("upi-close-btn");
  const appBtns = document.querySelectorAll(".upi-app-btn");
  const btnSuccess = document.getElementById("upi-btn-success");
  const btnFail = document.getElementById("upi-btn-fail");
  const btnRetry = document.getElementById("upi-btn-retry");
  
  const payScreen = document.getElementById("upi-pay-screen");
  const procScreen = document.getElementById("upi-processing-screen");
  const succScreen = document.getElementById("upi-success-screen");
  const failScreen = document.getElementById("upi-failure-screen");

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // UPI App click handler -> processing simulation
  appBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      payScreen.style.display = "none";
      procScreen.style.display = "flex";
      
      // Auto transition to success after 2.5 seconds (standard flow if simulator buttons aren't clicked)
      setTimeout(() => {
        if (procScreen.style.display === "flex") {
          triggerPaymentSuccess();
        }
      }, 2500);
    });
  });

  // Simulator Controls
  if (btnSuccess) {
    btnSuccess.addEventListener("click", () => {
      payScreen.style.display = "none";
      procScreen.style.display = "none";
      failScreen.style.display = "none";
      triggerPaymentSuccess();
    });
  }

  if (btnFail) {
    btnFail.addEventListener("click", () => {
      payScreen.style.display = "none";
      procScreen.style.display = "none";
      succScreen.style.display = "none";
      failScreen.style.display = "flex";
    });
  }

  if (btnRetry) {
    btnRetry.addEventListener("click", () => {
      failScreen.style.display = "none";
      payScreen.style.display = "block";
    });
  }
}

function triggerPaymentSuccess() {
  const succScreen = document.getElementById("upi-success-screen");
  const procScreen = document.getElementById("upi-processing-screen");
  const payScreen = document.getElementById("upi-pay-screen");
  
  if (procScreen) procScreen.style.display = "none";
  if (payScreen) payScreen.style.display = "none";
  if (succScreen) succScreen.style.display = "flex";
  
  // Auto redirect to ticket layout after 2 seconds
  setTimeout(() => {
    const modal = document.getElementById("upi-modal");
    if (modal) modal.classList.remove("active");
    
    renderBookingTicket();
  }, 2000);
}

// 10. Booking Ticket Render & Form Reset
function renderBookingTicket() {
  // Generate random Booking ID
  const randomId = `NOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Format Date for receipt
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(bookingDetails.date).toLocaleDateString("en-US", options);
  
  // Map time labels
  const timeLabels = {
    "14:00": "02:00 PM (Lunch)",
    "15:30": "03:30 PM (Late Lunch)",
    "19:00": "07:00 PM (Dinner)",
    "20:30": "08:30 PM (Prime Dinner)",
    "22:00": "10:00 PM (Late Night)",
    "23:00": "11:00 PM (Midnight Cravings)"
  };
  const timeText = timeLabels[bookingDetails.time] || bookingDetails.time;

  // Set values in ticket elements
  document.getElementById("t-booking-name").innerText = bookingDetails.name;
  document.getElementById("t-booking-id").innerText = randomId;
  document.getElementById("t-booking-date").innerText = formattedDate;
  document.getElementById("t-booking-time").innerText = timeText;
  document.getElementById("t-booking-guests").innerText = `${bookingDetails.guests} Guest${bookingDetails.guests !== '1' ? 's' : ''}`;
  
  // Render pre-orders list in ticket if any
  const preordersRow = document.getElementById("t-preorders-row");
  const preordersList = document.getElementById("t-preorders-list");
  
  if (bookingDetails.preorders) {
    if (preordersRow) preordersRow.style.display = "flex";
    if (preordersList) preordersList.innerText = bookingDetails.preorders;
  } else {
    if (preordersRow) preordersRow.style.display = "none";
  }
  
  // Set amounts
  document.getElementById("t-paid-amount").innerText = `₹${bookingDetails.deposit}.00`;
  document.getElementById("t-credit-amount").innerText = `-₹${bookingDetails.deposit}.00`;
  
  // Animate: hide booking form & show ticket with transition
  const formBox = document.getElementById("booking");
  const ticketShowcase = document.getElementById("ticket-showcase");
  
  if (formBox && ticketShowcase) {
    gsap.to(formBox, {
      opacity: 0,
      height: 0,
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      duration: 0.5,
      onComplete: () => {
        formBox.style.display = "none";
        ticketShowcase.style.display = "block";
        gsap.fromTo(ticketShowcase, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 });
        ticketShowcase.scrollIntoView({ behavior: "smooth" });
        if (typeof triggerMascotReaction === "function") {
          triggerMascotReaction("surprise", 6000);
        }
      }
    });
  }
}

function setupTicketReset() {
  const btnBookAnother = document.getElementById("btn-book-another");
  const btnPrint = document.getElementById("btn-print-ticket");
  
  if (btnBookAnother) {
    btnBookAnother.addEventListener("click", () => {
      // Clear cart
      cart = [];
      updateCartUI();
      updateMenuButtonsState();
      if (typeof triggerMascotReaction === "function") {
        triggerMascotReaction("cheerful", 3000);
      }
      
      // Reset form
      const form = document.getElementById("reservation-form");
      if (form) form.reset();
      
      // Animate transition back
      const formBox = document.getElementById("booking");
      const ticketShowcase = document.getElementById("ticket-showcase");
      
      if (formBox && ticketShowcase) {
        gsap.to(ticketShowcase, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: () => {
            ticketShowcase.style.display = "none";
            formBox.style.display = "block";
            gsap.fromTo(formBox, { opacity: 0, height: "auto", padding: "8rem 2rem" }, { opacity: 1, duration: 0.5 });
            formBox.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    });
  }
  
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }
}

// 12. Lightweight Scroll Parallax for Floating Elements
function initScrollParallax() {
  const floatingElements = document.querySelectorAll(".parallax-ingredient");
  if (floatingElements.length === 0) return;
  
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    floatingElements.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.1;
      const yOffset = scrollY * speed;
      gsap.to(el, {
        y: yOffset,
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto"
      });
    });
  });
}

// 13. GSAP ScrollTrigger Title & Elements Reveal Animations
function initGsapScrollReveals() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Section Tag and Section Title reveals
  gsap.utils.toArray(".section-title").forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  gsap.utils.toArray(".section-desc").forEach(desc => {
    gsap.from(desc, {
      scrollTrigger: {
        trigger: desc,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });
  });

  // Reveal for Menu Grid
  const menuGrid = document.querySelector(".menu-grid");
  if (menuGrid) {
    gsap.from(menuGrid, {
      scrollTrigger: {
        trigger: menuGrid,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  // Reveal for Highlights Grid
  const highlightsGrid = document.querySelector(".highlights-grid");
  if (highlightsGrid) {
    gsap.from(highlightsGrid, {
      scrollTrigger: {
        trigger: highlightsGrid,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });
  }
}

// 14. 3D Overlapping Hero Slider Functions
let sliderTimer = null;
const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds transition interval

function startAutoplay() {
  stopAutoplay();
  sliderTimer = setInterval(() => {
    navigateSlider(1);
  }, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (sliderTimer) {
    clearInterval(sliderTimer);
    sliderTimer = null;
  }
}

function resetAutoplay() {
  startAutoplay();
}

function initHeroSlider() {
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const heroSection = document.getElementById("hero");
  
  if (!prevBtn || !nextBtn) return;
  
  // Set initial state
  updateSliderContent(0);
  
  // Start Autoplay
  startAutoplay();
  
  prevBtn.addEventListener("click", (e) => {
    if (e) e.preventDefault();
    navigateSlider(-1);
    resetAutoplay();
  });
  
  nextBtn.addEventListener("click", (e) => {
    if (e) e.preventDefault();
    navigateSlider(1);
    resetAutoplay();
  });
  
  // Pause on hover
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopAutoplay);
    heroSection.addEventListener("mouseleave", startAutoplay);
  }
}

function navigateSlider(direction) {
  if (isSliderAnimating) return;
  isSliderAnimating = true;
  
  let newIndex = currentSlideIndex + direction;
  if (newIndex < 0) {
    newIndex = SLIDER_DATA.length - 1;
  } else if (newIndex >= SLIDER_DATA.length) {
    newIndex = 0;
  }
  
  animateSliderTransition(newIndex, direction);
}

function animateSliderTransition(newIndex, direction) {
  // Stop pizza slice carousel immediately when transition starts
  stopPizzaSliceCarousel();

  const slideData = SLIDER_DATA[newIndex];
  
  const heroSection = document.getElementById("hero");
  const bgText = document.getElementById("hero-text-bg");
  const centerProductWrap = document.getElementById("center-product-wrap");
  const mainImg = document.getElementById("center-product-main");
  const leftProductWrap = document.getElementById("side-product-left-wrap");
  const leftImg = document.getElementById("side-product-left");
  const rightProductWrap = document.getElementById("side-product-right-wrap");
  const rightImg = document.getElementById("side-product-right");
  
  const slideBadge = document.getElementById("slide-badge");
  const slideDesc = document.getElementById("slide-description");
  const spicesContainer = document.getElementById("floating-spices");
  
  const stat1Num = document.getElementById("stat-1-num");
  const stat1Lbl = document.getElementById("stat-1-label");
  const stat2Num = document.getElementById("stat-2-num");
  const stat2Lbl = document.getElementById("stat-2-label");
  const stat3Num = document.getElementById("stat-3-num");
  const stat3Lbl = document.getElementById("stat-3-label");
  
  // Create timeline for smooth transition
  const tl = gsap.timeline({
    onComplete: () => {
      currentSlideIndex = newIndex;
      isSliderAnimating = false;
      
      // Start Pizza Slice Carousel when we arrive back at Slide 0 (Pizza)
      if (currentSlideIndex === 0) {
        startPizzaSliceCarousel();
      }
    }
  });
  
  // 1. Animate background color transition
  tl.to(heroSection, {
    backgroundColor: slideData.bgColor,
    duration: 0.8,
    ease: "power2.out"
  }, 0);
  
  // 2. Animate background typography (slide out and fade)
  const textExitX = direction > 0 ? -120 : 120;
  const textEnterX = direction > 0 ? 120 : -120;
  
  tl.to(bgText, {
    x: textExitX,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      bgText.innerText = slideData.heading;
      gsap.set(bgText, { x: textEnterX });
    }
  }, 0);
  
  tl.to(bgText, {
    x: 0,
    opacity: 1,
    duration: 0.45,
    ease: "power2.out"
  }, 0.4);
  
  // 3. Animate product showcase assets
  // Scale down and slide out current products
  tl.to([centerProductWrap, leftProductWrap, rightProductWrap], {
    scale: 0.6,
    opacity: 0,
    y: 30,
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      // Reset background removal flags before setting src
      mainImg.dataset.bgRemoved = "false";
      mainImg.onload = () => removeHeroSliceBackground(mainImg);
      leftImg.dataset.bgRemoved = "false";
      leftImg.onload = () => removeHeroSliceBackground(leftImg);
      rightImg.dataset.bgRemoved = "false";
      rightImg.onload = () => removeHeroSliceBackground(rightImg);

      // Set new image sources
      mainImg.src = slideData.mainImg;
      leftImg.src = slideData.leftImg;
      rightImg.src = slideData.rightImg;
      
      // Update floating spices emojis
      if (spicesContainer) {
        spicesContainer.innerHTML = slideData.spices.map((spice, idx) => `
          <span class="spice spice-${idx + 1}">${spice}</span>
        `).join("");
      }
      
      // Update text details
      if (slideBadge) slideBadge.innerText = slideData.badge;
      if (slideDesc) slideDesc.innerText = slideData.desc;
      
      // Update stats
      if (stat1Num) stat1Num.innerText = slideData.stats[0].num;
      if (stat1Lbl) stat1Lbl.innerText = slideData.stats[0].label;
      if (stat2Num) stat2Num.innerText = slideData.stats[1].num;
      if (stat2Lbl) stat2Lbl.innerText = slideData.stats[1].label;
      if (stat3Num) stat3Num.innerText = slideData.stats[2].num;
      if (stat3Lbl) stat3Lbl.innerText = slideData.stats[2].label;
      
      // Reset position for entrance
      gsap.set(centerProductWrap, { y: -50, scale: 0.8, rotate: direction > 0 ? 15 : -15 });
      gsap.set(leftProductWrap, { x: -50, scale: 0.6, rotate: -30 });
      gsap.set(rightProductWrap, { x: 50, scale: 0.6, rotate: 30 });
    }
  }, 0);
  
  // Slide in new products with springy feel
  tl.to(centerProductWrap, {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    duration: 0.65,
    ease: "back.out(1.2)"
  }, 0.4);
  
  tl.to(leftProductWrap, {
    scale: 0.8,
    opacity: 0.6,
    x: 0,
    rotate: -15,
    duration: 0.65,
    ease: "power2.out"
  }, 0.45);
  
  // Slide right product in
  tl.to(rightProductWrap, {
    scale: 0.8,
    opacity: 0.6,
    x: 0,
    rotate: 15,
    duration: 0.65,
    ease: "power2.out"
  }, 0.45);
  
  // 4. Animate text information sliding up
  tl.fromTo([slideBadge, slideDesc, stat1Num, stat2Num, stat3Num], 
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
    0.4
  );
}

function updateSliderContent(index) {
  const slideData = SLIDER_DATA[index];
  
  const heroSection = document.getElementById("hero");
  const bgText = document.getElementById("hero-text-bg");
  const mainImg = document.getElementById("center-product-main");
  const leftImg = document.getElementById("side-product-left");
  const rightImg = document.getElementById("side-product-right");
  const slideBadge = document.getElementById("slide-badge");
  const slideDesc = document.getElementById("slide-description");
  const spicesContainer = document.getElementById("floating-spices");
  
  const stat1Num = document.getElementById("stat-1-num");
  const stat1Lbl = document.getElementById("stat-1-label");
  const stat2Num = document.getElementById("stat-2-num");
  const stat2Lbl = document.getElementById("stat-2-label");
  const stat3Num = document.getElementById("stat-3-num");
  const stat3Lbl = document.getElementById("stat-3-label");
  
  if (heroSection) heroSection.style.backgroundColor = slideData.bgColor;
  if (bgText) bgText.innerText = slideData.heading;
  
  if (mainImg) {
    mainImg.dataset.bgRemoved = "false";
    mainImg.onload = () => removeHeroSliceBackground(mainImg);
    mainImg.src = slideData.mainImg;
  }
  if (leftImg) {
    leftImg.dataset.bgRemoved = "false";
    leftImg.onload = () => removeHeroSliceBackground(leftImg);
    leftImg.src = slideData.leftImg;
  }
  if (rightImg) {
    rightImg.dataset.bgRemoved = "false";
    rightImg.onload = () => removeHeroSliceBackground(rightImg);
    rightImg.src = slideData.rightImg;
  }
  if (slideBadge) slideBadge.innerText = slideData.badge;
  if (slideDesc) slideDesc.innerText = slideData.desc;
  
  if (spicesContainer) {
    spicesContainer.innerHTML = slideData.spices.map((spice, idx) => `
      <span class="spice spice-${idx + 1}">${spice}</span>
    `).join("");
  }
  
  if (stat1Num) stat1Num.innerText = slideData.stats[0].num;
  if (stat1Lbl) stat1Lbl.innerText = slideData.stats[0].label;
  if (stat2Num) stat2Num.innerText = slideData.stats[1].num;
  if (stat2Lbl) stat2Lbl.innerText = slideData.stats[1].label;
  if (stat3Num) stat3Num.innerText = slideData.stats[2].num;
  if (stat3Lbl) stat3Lbl.innerText = slideData.stats[2].label;
}

// 15. Pizza Slice Sub-Carousel Logic (Landing Screen Hero Slider)
const PIZZA_SLICES = [
  "assets/pizza_slice_pepperoni.png",
  "assets/pizza_slice_margherita.png",
  "assets/pizza_slice_veggie.png",
  "assets/pizza_slice_chicken.png",
  "assets/pizza_slice_truffle.png"
];
let activeSliceIndex = 0;
let pizzaSliceInterval = null;

function startPizzaSliceCarousel() {
  stopPizzaSliceCarousel();
  pizzaSliceInterval = setInterval(() => {
    transitionPizzaSlice();
  }, 3000); // cycle slices every 3 seconds
}

function stopPizzaSliceCarousel() {
  if (pizzaSliceInterval) {
    clearInterval(pizzaSliceInterval);
    pizzaSliceInterval = null;
  }
}

function transitionPizzaSlice() {
  const centerImg = document.getElementById("center-product-main");
  if (!centerImg || currentSlideIndex !== 0) return;
  
  activeSliceIndex = (activeSliceIndex + 1) % PIZZA_SLICES.length;
  const nextSrc = PIZZA_SLICES[activeSliceIndex];
  
  // Slide out to left, swap src, slide in from right
  const tl = gsap.timeline();
  tl.to(centerImg, {
    x: -50,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      centerImg.dataset.bgRemoved = "false";
      centerImg.onload = () => removeHeroSliceBackground(centerImg);
      centerImg.src = nextSrc;
      gsap.set(centerImg, { x: 50 });
    }
  });
  tl.to(centerImg, {
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.2)"
  });
}

// 16. Dynamic Background Removal (Chroma Keying) for Pizza Slice & Hero Images
function removeHeroSliceBackground(imgElement) {
  if (!imgElement) return;
  
  // Only process hero images (pizza slices, burger, dessert)
  if (!imgElement.src.includes("pizza_slice") && !imgElement.src.includes("hero_burger") && !imgElement.src.includes("hero_dessert")) return;
  
  // Wait for the image to finish loading
  if (!imgElement.complete) {
    imgElement.onload = () => removeHeroSliceBackground(imgElement);
    return;
  }
  
  if (imgElement.dataset.bgRemoved === "true") return;
  
  try {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.naturalWidth || imgElement.width;
    canvas.height = imgElement.naturalHeight || imgElement.height;
    
    if (canvas.width === 0 || canvas.height === 0) return;
    
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample top-left corner pixel as target background color
    const targetR = data[0];
    const targetG = data[1];
    const targetB = data[2];
    
    // Check if the sampled background color is light/pastel
    const isLightBackground = (targetR + targetG + targetB) / 3 > 150;
    const tolerance = 85; // Manhattan distance tolerance for color match
    
    // Flood fill algorithm to key out background pixels connected to the borders
    const queue = [];
    const visited = new Uint8Array(width * height);
    
    // Add all border pixels to the queue to initiate flood fill
    for (let x = 0; x < width; x++) {
      queue.push(x); // Top border
      queue.push((height - 1) * width + x); // Bottom border
    }
    for (let y = 1; y < height - 1; y++) {
      queue.push(y * width); // Left border
      queue.push(y * width + (width - 1)); // Right border
    }
    
    let qIdx = 0;
    
    while (qIdx < queue.length) {
      const idx = queue[qIdx++];
      if (visited[idx]) continue;
      visited[idx] = 1;
      
      const pixelStart = idx * 4;
      const r = data[pixelStart];
      const g = data[pixelStart + 1];
      const b = data[pixelStart + 2];
      
      // Determine if pixel matches background color
      const match = isLightBackground
        ? (Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB) < tolerance)
        : (r > 230 && g > 230 && b > 230);
      
      if (match) {
        data[pixelStart + 3] = 0; // Make transparent
        
        const x = idx % width;
        const y = Math.floor(idx / width);
        
        // Add 4-neighbors
        if (x > 0 && !visited[idx - 1]) queue.push(idx - 1);
        if (x < width - 1 && !visited[idx + 1]) queue.push(idx + 1);
        if (y > 0 && !visited[idx - width]) queue.push(idx - width);
        if (y < height - 1 && !visited[idx + width]) queue.push(idx + width);
      }
    }
    
    ctx.putImageData(imgData, 0, 0);
    imgElement.onload = () => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
      imgElement.onload = null;
    };
    imgElement.src = canvas.toDataURL("image/png");
    imgElement.dataset.bgRemoved = "true";
  } catch (error) {
    console.warn("Dynamic background removal skipped:", error);
  }
}

// 17. ESPN-Inspired Scrollytelling Timeline Animations
function initTimelineAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded. Timeline scrollytelling disabled.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Scrub the timeline line fill height based on the scroll progress of the container
  const timelineContainer = document.querySelector(".timeline-container");
  const lineFill = document.querySelector(".timeline-line-fill");

  if (timelineContainer && lineFill) {
    gsap.to(lineFill, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timelineContainer,
        start: "top 30%",
        end: "bottom 80%",
        scrub: true
      }
    });
  }

  // 2. Loop over each timeline item to animate node states and card fades/slides
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => {
    const marker = item.querySelector(".timeline-marker");
    const card = item.querySelector(".timeline-card");

    if (!marker || !card) return;

    // Toggle active class on marker when it reaches center of viewport
    ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 35%",
      onToggle: (self) => {
        if (self.isActive) {
          marker.classList.add("active-marker");
        } else {
          marker.classList.remove("active-marker");
        }
      }
    });

    // Reveal animations using matchMedia (slide-in from sides on desktop, slide-up on mobile)
    let mm = gsap.matchMedia();
    const isLeft = item.classList.contains("left-item");

    // Hide cards initially with GSAP to prevent flash of unstyled content
    // and to preserve raw styling if JS doesn't run.
    gsap.set(card, { opacity: 0 });

    // Desktop: slide from left/right
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: isLeft ? -80 : 80,
          y: 0
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Mobile: slide up from bottom
    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: 0,
          y: 50
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  });
}

// 18. Brand Loader Animation
function initLoader() {
  const percentEl = document.querySelector(".loader-percent");
  const barEl = document.querySelector(".loader-bar");
  
  if (!percentEl || !barEl) return;
  
  // Fade in loader logo immediately
  gsap.to(".loader-logo", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  });

  const progress = { value: 0 };
  
  gsap.to(progress, {
    value: 100,
    duration: 1.6,
    ease: "power1.inOut",
    onUpdate: () => {
      const currentVal = Math.round(progress.value);
      percentEl.textContent = `${currentVal}%`;
      barEl.style.width = `${currentVal}%`;
    },
    onComplete: () => {
      // Loader completion timeline
      const tl = gsap.timeline();
      
      // 1. Fade out the progress bar wrapper and percentage count, leaving loader logo visible
      tl.to(".loader-bar-wrap, .loader-percent", {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: "power2.in"
      });
      
      // 2. Perform the logo flight transition from splash screen to navbar and page-loader slide out
      tl.call(() => {
        const loaderLogo = document.querySelector(".loader-logo");
        const headerLogo = document.querySelector("#header-logo");
        const pageLoader = document.querySelector("#page-loader");
        
        if (!loaderLogo || !headerLogo || !pageLoader) return;
        
        // Ensure header logo is hidden during flight
        gsap.set(headerLogo, { opacity: 0 });
        
        // Measure coordinates relative to viewport
        const firstRect = loaderLogo.getBoundingClientRect();
        const lastRect = headerLogo.getBoundingClientRect();
        
        // Calculate the scale and translation offset for GPU-accelerated transforms
        const scale = firstRect.width / lastRect.width;
        const translateX = firstRect.left - lastRect.left;
        const translateY = firstRect.top - lastRect.top;
        
        // Create the flying copy
        const flyingLogo = document.createElement("div");
        flyingLogo.className = "flying-logo";
        flyingLogo.textContent = loaderLogo.textContent || "nolita";
        document.body.appendChild(flyingLogo);
        
        // Position it exactly at the final target location, but transform it to match the starting location
        gsap.set(flyingLogo, {
          left: lastRect.left,
          top: lastRect.top,
          fontSize: window.getComputedStyle(headerLogo).fontSize,
          letterSpacing: window.getComputedStyle(headerLogo).letterSpacing,
          lineHeight: window.getComputedStyle(headerLogo).lineHeight,
          margin: 0,
          padding: 0,
          transformOrigin: "top left",
          x: translateX,
          y: translateY,
          scale: scale
        });
        
        // Hide the static loader logo
        gsap.set(loaderLogo, { opacity: 0 });
        
        // Create a sub-timeline to coordinate the logo flight and loader slide up
        const desktopTl = gsap.timeline();
        
        // 2a. Animate flying logo using only GPU-accelerated transforms (x, y, scale)
        desktopTl.to(flyingLogo, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.inOut" // Ultra-smooth, high-end deceleration curve
        }, 0);
        
        // 2b. Slide up the page loader screen panel with a slight overlap (0.15s after flight starts)
        desktopTl.to(pageLoader, {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut"
        }, 0.15);
        
        // 2c. Swap flying logo to actual header logo once flight completes
        desktopTl.call(() => {
          gsap.set(headerLogo, { opacity: 1 });
          flyingLogo.remove();
        }, null, 1.1);
        
        // 2d. Animate Hero typography reveal
        const bgTitle = document.querySelector(".hero-slide-active .hero-text-bg");
        if (bgTitle) {
          desktopTl.from(bgTitle, {
            y: 80,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
          }, 1.1 - 0.45);
        }
        
        // 2e. Stagger nav links and header actions reveal (excluding the logo which is already settled!)
        desktopTl.from(".nav-link, .header-actions", {
          y: -25,
          opacity: 0,
          stagger: 0.05,
          duration: 0.65,
          ease: "power2.out"
        }, 1.1 - 0.5);
        
        // 2f. Remove loader wrapper from DOM after transition
        desktopTl.set(pageLoader, { display: "none" });
        
        // 2g. Initialize other premium animations now that page is fully visible
        desktopTl.call(() => {
          initScrollParallax();
          initGsapScrollReveals();
          initHeroSlider();
          initTimelineAnimations();
          init3DTilt();
          initMagneticButtons();
          startPizzaSliceCarousel();
          initMascotAssistant();
          if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
        });
      });
    }
  });
}

// 19. Custom Trailing Cursor with Inertia
function initCustomCursor() {
  // Disable custom cursor on mobile/touch screens or small viewports
  const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  if (isTouch || window.innerWidth <= 768) return;
  
  const dot = document.querySelector(".custom-cursor-dot");
  const ring = document.querySelector(".custom-cursor-ring");
  
  if (!dot || !ring) return;
  
  // Add body trigger class
  document.body.classList.add("has-custom-cursor");
  
  // Set initial position out of bounds
  gsap.set([dot, ring], { x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
  const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
  const xRingTo = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power2.out" });
  const yRingTo = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power2.out" });
  
  window.addEventListener("mousemove", (e) => {
    xDotTo(e.clientX);
    yDotTo(e.clientY);
    xRingTo(e.clientX);
    yRingTo(e.clientY);
  });
  
  // Expand on hover
  const hoverSelector = "a, button, .btn, .cart-trigger, .menu-card, .highlight-card, .vibe-image-frame, .promo-close, .logo";
  
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      ring.classList.add("cursor-hover");
      gsap.to(dot, { scale: 0.4, duration: 0.15 });
    }
  });
  
  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      ring.classList.remove("cursor-hover");
      gsap.to(dot, { scale: 1, duration: 0.15 });
    }
  });
}

// 20. 3D Card Hover Tilt Motion
function init3DTilt() {
  const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  if (isTouch || window.innerWidth <= 768) return;
  
  const items = document.querySelectorAll(".menu-card, .highlight-card, .vibe-image-frame");
  
  items.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 10; // Max 10 deg X tilt
      const rotateY = ((x - centerX) / centerX) * -10; // Max 10 deg Y tilt
      
      gsap.to(item, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
    
    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });
}

// 21. Magnetic Button Interaction
function initMagneticButtons() {
  const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  if (isTouch || window.innerWidth <= 768) return;
  
  const buttons = document.querySelectorAll(".btn, .cart-trigger, .nav-link, .promo-close, .main-header .logo");
  
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3, // Pull strength 30%
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
    
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });
    });
  });
}

// 22. Mobile Navigation Drawer Setup
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-nav-close-btn");
  const drawer = document.getElementById("mobile-nav-drawer");
  const links = document.querySelectorAll(".mobile-nav-link, #mobile-drawer-delivery-btn, #mobile-drawer-book-btn");

  if (!btn || !drawer) return;

  const toggleMenu = () => {
    btn.classList.toggle("active");
    const isOpen = btn.classList.contains("active");
    drawer.style.transform = isOpen ? "translateX(0)" : "translateX(100%)";
  };

  btn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

  links.forEach(link => {
    link.addEventListener("click", () => {
      btn.classList.remove("active");
      drawer.style.transform = "translateX(100%)";
    });
  });
}

// Global window load fallback for ScrollTrigger positions
window.addEventListener("load", () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

// 22. Deep Messages Data & Popup System
const DEEP_HIGHLIGHTS_MESSAGES = {
  "lunch": {
    icon: "☀️",
    title: "Midday Nourishment",
    message: "Lunch is a gentle pause in the turning of the day—a moment to step away from the bustle, nourish the temple, and renew the spirit over honest fire-roasted flavors."
  },
  "dinner": {
    icon: "🌃",
    title: "Nightfall & Gathering",
    message: "As the sun dips below the Chennai horizon, our table lights up. Dinner is more than dining; it is a warm circle of light where the night comes alive with soft murmurs and deep laughter."
  },
  "home delivery": {
    icon: "🚚",
    title: "The Warm Hearth, Delivered",
    message: "A recipe is a story that travels. When we deliver, we carry the warmth of our brick oven directly to your sanctuary, bridging the distance between our home and yours."
  },
  "takeaway available": {
    icon: "🛍",
    title: "Flavors on a Journey",
    message: "Takeaway is a slice of joy packaged for the road. Carry our hand-shaped sourdough out into the wild world, a delicious anchor to comfort on your travels."
  },
  "stags allowed": {
    icon: "👥",
    title: "A Haven for Seekers",
    message: "At Nolita, borders dissolve. Whether you walk alone, in pair, or in groups, every soul seeking a slice of fire-kissed bread and quiet sanctuary finds an equal home."
  },
  "parking available": {
    icon: "🅿️",
    title: "Unburdened Arrival",
    message: "Let go of the road's friction. We clear the path so that your mind can settle into the anticipation of warm crusts and rich conversations, starting from the curb."
  },
  "free parking": {
    icon: "🚗",
    title: "The Gift of Welcome",
    message: "Hospitality begins before you cross our threshold. Free parking is our small gesture of grace, ensuring your arrival is as light as our sourdough crust."
  },
  "less noisy": {
    icon: "🤫",
    title: "The Quiet Sanctuary",
    message: "In a world that never stops shouting, quietness is luxury. Here, the hum of city life recedes, leaving space for whispers, thoughts, and the crisp crackle of wood-fired dough."
  },
  "indoor seating": {
    icon: "🛋",
    title: "The Cozy Enclosure",
    message: "Step inside our walls of brick and sky-blue glass. Our indoor seating is a sheltered harbor, cocooned in warmth, aroma, and the quiet comfort of home."
  },
  "outdoor seating": {
    icon: "🍃",
    title: "Al Fresco Whispers",
    message: "Under the open sky, flavors breathe. Dine al fresco and let Chennai's evening breeze carry the aroma of basil and woodsmoke, a perfect canopy for unhurried evenings."
  },
  "buffet": {
    icon: "🍽",
    title: "A Celebration of Abundance",
    message: "Life is a rich tapestry of choices. Our buffet is a culinary landscape, inviting you to sample, celebrate, and feast upon the endless variety of hand-crafted eats."
  },
  "table booking": {
    icon: "📅",
    title: "Reserve Your Chapter",
    message: "A table is a blank page. By reserving your place, you claim a space in our story—a setting for memory, connection, and the breaking of bread."
  },
  "card accepted": {
    icon: "💳",
    title: "Seamless Exchange",
    message: "Let transaction fade into the background. We support effortless digital exchanges, so your focus stays exactly where it belongs—on the sensory feast ahead."
  },
  "air conditioned": {
    icon: "❄️",
    title: "The Cool Refuge",
    message: "A sanctuary from Chennai's warm embrace. Our cool breeze provides a fresh canvas, turning the warm, rich steam of fresh pizza into pure refreshment."
  },
  "desserts": {
    icon: "🍰",
    title: "The Sweet Horizon",
    message: "A sweet finish is a lingering memory. Dessert is the quiet coda to a beautiful symphony of tastes—a spoonful of comfort that makes time stand still."
  },
  "cafe style": {
    icon: "☕",
    title: "The Art of Slow Living",
    message: "We grind, press, and pour with intention. Cafe style is a commitment to the slow extraction of life's best elements—coffee, sourdough, and conversation."
  },
  "pizzas": {
    icon: "🍕",
    title: "Born of Fire & Time",
    message: "Flour, water, wild yeast, and heat. Our sourdough pizza is a testament to natural fermentation—a craft that cannot be rushed, baked in minutes but perfected over days."
  },
  "quick service": {
    icon: "⚡",
    title: "Efficient Harmony",
    message: "We respect the rhythm of your day. Quick service is our promise of swift craftsmanship, delivering hot, fire-kissed quality without compromising on details."
  }
};

const DEEP_MENU_MESSAGES = {
  "p1": {
    icon: "🍕",
    title: "Classic Margherita Sourdough",
    message: "Margherita is the mother of pizzas. With pure red san marzano tomato, white buffalo mozzarella, and green basil, it represents a simple triad of culinary perfection that stands unchanged through time."
  },
  "p2": {
    icon: "🌶️",
    title: "Spicy Pepperoni Sourdough",
    message: "A classic clash of heat and richness. The pepperoni cups curl under our intense wood fire, trapping hot oils that harmonize beautifully with our tangy 48-hour sourdough base."
  },
  "p3": {
    icon: "🍄",
    title: "Truffle Mushroom Sourdough",
    message: "Earth meets fire. Wild mushrooms roasted in garlic olive oil, finished with a drizzle of white truffle oil—a fragrant, earthy walk through an ancient forest on a hot, bubbly crust."
  },
  "p4": {
    icon: "🍗",
    title: "BBQ Chicken Sourdough",
    message: "Sweet smokiness and savory fire. Tender grilled chicken meets our rich house BBQ reduction, creating a bold, comforting chord that sings of backyard fires and summer days."
  },
  "b1": {
    icon: "🍔",
    title: "Nolita Classic Craft Burger",
    message: "A burger is a study in vertical balance. The soft pillowy brioche, the charred, juicy hand-pressed patty, and the sharp cheddar create a heavy, satisfying chord of comfort."
  },
  "b2": {
    icon: "🔥",
    title: "Spicy Jalapeno Crunch Burger",
    message: "A sensory spark of crunch and heat. Spicy house-pickled jalapenos collide with crispy onion rings and zesty sauce, lighting up your palate with a vibrant, fiery energy."
  },
  "pa1": {
    icon: "🍝",
    title: "Fettuccine Bolognese",
    message: "Slow-simmered comfort. A rich, thick ragu that has spent hours melting into savory sweetness, clinging lovingly to ribbons of hand-stretched pasta. An Italian Sunday in a bowl."
  },
  "pa2": {
    icon: "🧀",
    title: "Penne Alfredo with Grilled Chicken",
    message: "Velvet in culinary form. A rich, heavy cream reduction infused with parmesan cheese, coating every penne tube in a silky blanket of comfort."
  },
  "d1": {
    icon: "🍪",
    title: "Skillet Cookie Sundae",
    message: "Warmth colliding with ice. A fresh, gooey chocolate-chip cookie straight from the oven, topped with cold, melting vanilla bean ice cream—a beautiful study of thermal contrast."
  },
  "d2": {
    icon: "☕",
    title: "Old Fashioned Tiramisu",
    message: "Literal meaning: 'Pull me up'. Saturated espresso-soaked ladyfingers blanketed in airy mascarpone whip, dusted with cocoa—a perfect espresso-infused cloud of indulgence."
  }
};

const DEEP_TIMELINE_MESSAGES = {
  "the nyc spark": {
    icon: "🗽",
    title: "The NYC Spark (2018)",
    message: "NoLiTa, Manhattan. A collision of narrow brick alleys, fire escapes, and the aroma of baking yeast. Nolita was born of a dream to capture the sensory romance of New York's historic pizzerias and bring that slow-fermented soul back home."
  },
  "baking the sourdough": {
    icon: "🔥",
    title: "Baking the Sourdough (2020)",
    message: "Bread is alive. It requires nothing but flour, water, salt, wild yeast, and infinite patience. Our 48-hour slow cold fermentation allows gluten structures to relax and develop deep, complex lactic acids—unmatched in texture, digestible by nature."
  },
  "chennai launch": {
    icon: "🏙️",
    title: "Chennai Launch (2023)",
    message: "Bridging NYC industrial vibes with Chennai's warm spirit. We created our Nungambakkam space on KNK Road as a visual haven—combining exposed brick walls, matte grids, mosaic floors, and our signature sky-blue ceilings."
  },
  "today & beyond": {
    icon: "🚀",
    title: "Today & Beyond (2026)",
    message: "Every day, we fuel connections. A table at Nolita is a shared sanctuary. As we move forward, our commitment remains simple: pure ingredients, unhurried craft, and warm welcome for every guest."
  }
};

function setupDeepMessagePopup() {
  const modal = document.getElementById("deep-popup-modal");
  const overlay = document.getElementById("deep-popup-overlay");
  const closeBtn = document.getElementById("deep-popup-close-btn");
  
  if (!modal || !overlay || !closeBtn) return;
  
  function showDeepPopup(imageSrc, dietType, badgeText, titleText, subinfoText, allergensArray, messageText, priceText, itemId, itemPrice) {
    const imageEl = document.getElementById("deep-popup-image");
    const dietIndicator = document.getElementById("deep-popup-diet");
    const badgeEl = document.getElementById("deep-popup-badge");
    const titleEl = document.getElementById("deep-popup-title");
    const subinfoEl = document.getElementById("deep-popup-subinfo");
    const allergensContainer = document.getElementById("deep-popup-allergens");
    const messageEl = document.getElementById("deep-popup-message");
    const priceRow = document.getElementById("deep-popup-price-row");
    const priceEl = document.getElementById("deep-popup-price");
    const preorderBtn = document.getElementById("deep-popup-preorder-btn");
    
    // Set Image
    if (imageEl) imageEl.src = imageSrc || "assets/interior.png";
    
    // Veg/Non-Veg Diet Indicator
    if (dietIndicator) {
      if (dietType === "non-veg") {
        dietIndicator.classList.add("non-veg");
      } else {
        dietIndicator.classList.remove("non-veg");
      }
    }
    
    // Badge/Tag
    if (badgeEl) {
      badgeEl.textContent = badgeText || "Featured";
      if (dietType === "non-veg") {
        badgeEl.classList.add("non-veg");
      } else {
        badgeEl.classList.remove("non-veg");
      }
    }
    
    if (titleEl) titleEl.textContent = titleText;
    if (subinfoEl) subinfoEl.textContent = subinfoText || "";
    
    // Allergens
    if (allergensContainer) {
      allergensContainer.innerHTML = "";
      if (allergensArray && allergensArray.length > 0) {
        allergensArray.forEach(allergen => {
          const parts = allergen.split(" ");
          const icon = parts[0];
          const text = parts.slice(1).join(" ");
          
          const tag = document.createElement("span");
          tag.className = "allergen-tag";
          tag.innerHTML = `<span class="allergen-icon">${icon}</span> ${text}`;
          allergensContainer.appendChild(tag);
        });
        allergensContainer.style.display = "flex";
      } else {
        allergensContainer.style.display = "none";
      }
    }
    
    if (messageEl) messageEl.textContent = messageText;
    
    // Price Row and Pre-order Button
    if (priceRow) {
      if (priceText) {
        priceRow.style.display = "flex";
        if (priceEl) priceEl.textContent = priceText;
        
        if (preorderBtn && itemId && itemPrice !== undefined) {
          preorderBtn.style.display = "inline-block";
          preorderBtn.setAttribute("data-id", itemId);
          preorderBtn.setAttribute("data-name", titleText);
          preorderBtn.setAttribute("data-price", itemPrice);
          
          // Sync current cart state
          const inCart = cart.find(c => c.id === itemId);
          if (inCart) {
            preorderBtn.innerText = "Added ✔";
            preorderBtn.classList.add("selected");
          } else {
            preorderBtn.innerText = "Add to Pre-Order";
            preorderBtn.classList.remove("selected");
          }
        } else if (preorderBtn) {
          preorderBtn.style.display = "none";
        }
      } else {
        priceRow.style.display = "none";
        if (preorderBtn) preorderBtn.style.display = "none";
      }
    }
    
    modal.classList.add("active");
    
    // Animate modal entry using GSAP
    gsap.fromTo(".deep-popup-card", 
      { scale: 0.85, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.2)", overwrite: "auto" }
    );
  }
  
  function closeDeepPopup() {
    gsap.to(".deep-popup-card", {
      scale: 0.85,
      y: 30,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("active");
        // Clear preorder button attributes on close
        const preorderBtn = document.getElementById("deep-popup-preorder-btn");
        if (preorderBtn) {
          preorderBtn.removeAttribute("data-id");
          preorderBtn.removeAttribute("data-name");
          preorderBtn.removeAttribute("data-price");
        }
      }
    });
  }
  
  closeBtn.addEventListener("click", closeDeepPopup);
  overlay.addEventListener("click", closeDeepPopup);
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeDeepPopup();
    }
  });

  // Bind click listener for the popup preorder button
  const popupPreorderBtn = document.getElementById("deep-popup-preorder-btn");
  if (popupPreorderBtn) {
    popupPreorderBtn.addEventListener("click", () => {
      const id = popupPreorderBtn.getAttribute("data-id");
      const name = popupPreorderBtn.getAttribute("data-name");
      const priceVal = popupPreorderBtn.getAttribute("data-price");
      if (id && name && priceVal) {
        const price = parseFloat(priceVal);
        if (!isNaN(price)) {
          toggleCartItem(id, name, price);
        }
      }
    });
  }

  // Use event delegation
  document.addEventListener("click", (e) => {
    // 1. Highlights cards
    const highlightCard = e.target.closest(".highlight-card");
    if (highlightCard) {
      const hTitleEl = highlightCard.querySelector("h3");
      const hIconEl = highlightCard.querySelector(".highlight-icon");
      if (!hTitleEl) return;
      
      const titleText = hTitleEl.textContent.trim();
      const iconText = hIconEl ? hIconEl.textContent.trim() : "✨";
      const key = titleText.toLowerCase();
      
      let data = DEEP_HIGHLIGHTS_MESSAGES[key];
      const messageText = data ? data.message : `${titleText} represents a fundamental pillar of our guest experience at Nolita—a thoughtful touch designed to elevate your dining journey.`;
      const titleDisplayText = data ? data.title : titleText;
      const iconDisplay = data ? data.icon : iconText;
      
      showDeepPopup(
        "assets/interior.png",
        "veg",
        "Highlight",
        titleDisplayText,
        "Nolita Chennai · Service Detail",
        [iconDisplay + " Amenity", "🛋️ Comfort", "✨ Premium"],
        messageText,
        "",
        null,
        0
      );
      return;
    }
    
    // 2. Timeline cards
    const timelineCard = e.target.closest(".timeline-card");
    if (timelineCard) {
      const tTitleEl = timelineCard.querySelector("h3");
      const tYearEl = timelineCard.querySelector(".card-year");
      if (!tTitleEl) return;
      
      const titleText = tTitleEl.textContent.trim();
      const yearText = tYearEl ? tYearEl.textContent.trim() : "";
      const key = titleText.toLowerCase();
      
      let data = DEEP_TIMELINE_MESSAGES[key];
      const messageText = data ? data.message : (timelineCard.querySelector("p") ? timelineCard.querySelector("p").textContent.trim() : "A defining chapter in our craft journey.");
      const titleDisplay = data ? data.title : `${titleText} (${yearText})`;
      const iconDisplay = data ? data.icon : "📜";
      
      showDeepPopup(
        "assets/hero.png",
        "veg",
        "Our Journey",
        titleDisplay,
        `Est. ${yearText || '2018'} · Brand Milestone`,
        [iconDisplay + " Story", "🍕 Sourdough", "🔥 Wood-fired"],
        messageText,
        "",
        null,
        0
      );
      return;
    }
    
    // 3. Menu cards (excluding clicking pre-order button directly)
    const menuCard = e.target.closest(".menu-card");
    if (menuCard && !e.target.closest(".btn-add-preorder")) {
      const itemId = menuCard.getAttribute("data-item-id");
      const item = MENU_DATA.find(x => x.id === itemId);
      if (!item) return;
      
      // Determine diet type (Veg / Non-veg)
      const nameLower = item.name.toLowerCase();
      const isNonVeg = nameLower.includes("chicken") || nameLower.includes("pepperoni") || nameLower.includes("beef") || nameLower.includes("steak") || nameLower.includes("meat");
      const dietType = isNonVeg ? "non-veg" : "veg";
      
      // Determine subinfo by category
      let subinfo = "";
      if (item.category === "pizzas") {
        subinfo = "12 Inch Pizza · 48H Fermented Sourdough · 380 kcal";
      } else if (item.category === "burgers") {
        subinfo = "Craft Burger · Double Patty · 510 kcal";
      } else if (item.category === "pastas-mains") {
        subinfo = "Handmade Pasta · Parmesan Infused · 420 kcal";
      } else if (item.category === "desserts") {
        subinfo = "Premium Dessert · Freshly Baked · 390 kcal";
      } else if (item.category === "beverages") {
        subinfo = "Craft Beverage · Ice-Blended · 180 kcal";
      } else {
        subinfo = "Nolita Craft Eats · Fresh Quality · 240 kcal";
      }
      
      // Determine allergens based on category
      let allergens = [];
      if (item.category === "desserts") {
        allergens = ["🥛 Milk", "🌾 Gluten", "🍫 Cocoa"];
      } else if (item.category === "pizzas" || item.category === "pastas-mains") {
        allergens = ["🥛 Milk", "🌾 Gluten"];
      } else if (item.category === "burgers") {
        allergens = ["🌾 Gluten", "🥩 Protein"];
      } else if (item.category === "beverages") {
        allergens = ["🥛 Milk"];
      }
      
      let data = DEEP_MENU_MESSAGES[itemId];
      const messageText = data ? data.message : item.desc;
      
      showDeepPopup(
        item.img,
        dietType,
        item.tag || "Signature",
        item.name,
        subinfo,
        allergens,
        messageText,
        `₹ ${item.price}`,
        item.id,
        item.price
      );
    }
  });
}

// ==========================================================================
// 20. Nolita Mascot Assistant (Noli) Interactive Logic
// ==========================================================================

let mascotReactionTimeout = null;

function setMascotExpression(expression) {
  const avatar = document.getElementById("mascot-avatar");
  if (!avatar) return;
  avatar.className = "mascot-avatar"; // Reset classes
  if (expression === "heart") {
    avatar.classList.add("active-heart");
  } else if (expression === "surprise") {
    avatar.classList.add("active-surprise");
  } else if (expression === "sleepy") {
    avatar.classList.add("active-sleepy");
  } else {
    avatar.classList.add("active-cheerful");
  }
}

function initMascotAssistant() {
  const container = document.getElementById("nolita-mascot-container");
  const avatar = document.getElementById("mascot-avatar");

  if (!container || !avatar) return;

  // Welcome mascot on load (with delay after preloader exits)
  setTimeout(() => {
    container.classList.remove("hidden");
    setMascotExpression("cheerful");
  }, 1200);

  // Setup cursor trailing follow logic for desktop viewports
  const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  const useFollow = !isTouch && window.innerWidth > 768;

  if (useFollow) {
    // Set initial position off-screen
    gsap.set(container, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const xMascotTo = gsap.quickTo(container, "x", { duration: 0.5, ease: "power2.out" });
    const yMascotTo = gsap.quickTo(container, "y", { duration: 0.5, ease: "power2.out" });

    let isMascotFrozen = false;

    // Freeze Noli when the cursor hovers directly on the mascot avatar.
    // This allows clicking him, and prevents Noli from running away or getting stuck.
    avatar.addEventListener("mouseenter", () => {
      isMascotFrozen = true;
    });

    avatar.addEventListener("mouseleave", () => {
      isMascotFrozen = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isMascotFrozen) {
        // Offset mascot diagonally to the bottom-right of the cursor so it behaves like a companion/pet
        // and does not block clicks
        xMascotTo(e.clientX + 45);
        yMascotTo(e.clientY + 45);
      }
    });
  }

  // Click handler to cycle expressions as an easter egg
  const expressions = ["cheerful", "heart", "surprise", "sleepy"];
  let expressionIndex = 0;
  avatar.addEventListener("click", () => {
    expressionIndex = (expressionIndex + 1) % expressions.length;
    setMascotExpression(expressions[expressionIndex]);
  });

  // Global hover trigger: React visually to hovered page elements
  const hoverSelector = "a, button, .btn, .cart-trigger, .menu-card, .highlight-card, .vibe-image-frame, .logo";
  
  document.addEventListener("mouseover", (e) => {
    if (mascotReactionTimeout) return; // Do not overwrite active event reactions (e.g. cart add/remove or booking success)
    const target = e.target.closest(hoverSelector);
    if (target) {
      if (target.classList.contains("menu-card") || target.classList.contains("highlight-card") || target.classList.contains("minus")) {
        setMascotExpression("surprise");
      } else {
        setMascotExpression("heart");
      }
    } else {
      setMascotExpression("cheerful");
    }
  });
}

function triggerMascotReaction(expression = "heart", duration = 3000) {
  const container = document.getElementById("nolita-mascot-container");
  if (!container || container.classList.contains("hidden")) return;

  setMascotExpression(expression);

  if (mascotReactionTimeout) {
    clearTimeout(mascotReactionTimeout);
  }

  mascotReactionTimeout = setTimeout(() => {
    setMascotExpression("cheerful");
  }, duration);
}


