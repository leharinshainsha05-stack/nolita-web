#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Nolita Multi-Tenant Cafe Server
===============================
This server manages 50+ local cafés using a single master template (index.html)
and a unified deployment pipeline. It routes incoming traffic based on path
segments or query parameters (e.g., ?cafe=chamiers) and dynamically injects
brand assets, colors, and menu lists on the fly with zero client-side latency.

Operating System: Windows
Port: 8080
Dependencies: None (uses Python Standard Library)
"""

import os
import json
import urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# ==============================================================================
# 1. MASTER CONFIGURATION DICTIONARY (cafe_config)
# ==============================================================================
# This dictionary maps unique URL keys to their respective branding assets,
# stylesheet overrides, Local SEO keywords, and category-level menus.
cafe_config = {
    'nolita': {
        'name': 'Nolita',
        'name_lower': 'nolita',
        'tagline': 'Sourdough Pizza & Craft Eats in Nungambakkam, Chennai',
        'primary_color': '#52a6de',        # Ceiling & logo sky blue
        'accent_color': '#3a8cbf',         # Darker blue focus
        'light_color': '#e5f4fd',          # Faint blue backdrop
        'hero_image_url': 'assets/hero.png',
        'mascot_sprite_source': 'assets/mascot_transparent.png',
        'location_tags': ['Nungambakkam', 'Chennai', 'Khader Nawaz Khan Road', 'Sourdough Pizza', 'NYC Industrial Cafe'],
        'story_title': 'Our Sourdough Story',
        'story_text': 'Inspired by the espresso bars and rustic sourdough pizzerias of NoLiTa (North of Little Italy), Manhattan, we bring wood-fired authenticity and craft comfort eats straight to Chennai.',
        'menu_data': [
            { "id": "p1", "category": "pizzas", "name": "Pepperoni Pizza", "price": 795, "desc": "Pork pepperoni, premium rich mozzarella cheese, and our signature slow-simmered marinara pizza sauce on hand-stretched sourdough.", "tag": "Chef Special", "img": "assets/pizza.png" },
            { "id": "p2", "category": "pizzas", "name": "Classic Margherita", "price": 525, "desc": "Fresh hand-pulled mozzarella, house pizza sauce, aromatic fresh basil leaves, and a drizzle of extra virgin olive oil.", "tag": "Vegetarian", "img": "assets/pizza.png" },
            { "id": "pa1", "category": "pastas-mains", "name": "Fettuccine Beef Bolognese", "price": 595, "desc": "Slow-simmered minced tenderloin ragù in red wine tomato sauce, served over fresh fettuccine, topped with shaved parmesan.", "tag": "Classic", "img": "assets/pasta.png" },
            { "id": "b1", "category": "burgers", "name": "Heirloom Tomato, Burrata & Pesto", "price": 675, "desc": "Fresh heirloom tomatoes, homemade basil pesto, rich creamy burrata cheese, and wild arugula inside a foot-long rustic bread.", "tag": "Vegetarian", "img": "assets/burger.png" },
            { "id": "ap1", "category": "appetisers", "name": "Giant Mozzarella Sticks", "price": 595, "desc": "Crispy-fried giant mozzarella cheese sticks sprinkled with peri peri seasoning, served with a side of garlic aioli.", "tag": "Popular", "img": "assets/appetiser.png" }
        ],
        'slider_data': [
            {
                'id': 0,
                'heading': 'PIZZA',
                'badge': 'NYC Sourdough Crust',
                'desc': 'Sourdough crust fermented for 48 hours, stretched by hand, and baked at 450°C in our brick oven for that perfect leopard-spotted char.',
                'bgColor': '#8c2d19',
                'mainImg': 'assets/pizza_slice_pepperoni.png',
                'leftImg': 'assets/hero_dessert.png',
                'rightImg': 'assets/hero_burger.png',
                'spices': ['🍕', '🌿', '🍅'],
                'stats': [
                    { 'num': '48H', 'label': 'Fermented' },
                    { 'num': '450°C', 'label': 'Brick Oven' },
                    { 'num': '100%', 'label': 'Sourdough' }
                ]
            },
            {
                'id': 1,
                'heading': 'BURGER',
                'badge': 'Craft Gourmet Grills',
                'desc': 'Juicy, flame-grilled premium patties, double cheddar cheese, and fresh farm ingredients layered in a toasted artisanal brioche bun.',
                'bgColor': '#996f2d',
                'mainImg': 'assets/hero_burger.png',
                'leftImg': 'assets/pizza_slice_pepperoni.png',
                'rightImg': 'assets/hero_dessert.png',
                'spices': ['🧀', '🧅', '🍔'],
                'stats': [
                    { 'num': '100%', 'label': 'Fresh Grills' },
                    { 'num': 'Fresh', 'label': 'Brioche Bun' },
                    { 'num': 'Double', 'label': 'Cheddar' }
                ]
            },
            {
                'id': 2,
                'heading': 'SWEETS',
                'badge': 'Loaded Shakes & Treats',
                'desc': 'Indulge in our premium loaded strawberry milkshakes, warm chocolate chip skillet cookie sundae, and authentic Italian tiramisu.',
                'bgColor': '#c58c82',
                'mainImg': 'assets/hero_dessert.png',
                'leftImg': 'assets/hero_burger.png',
                'rightImg': 'assets/pizza_slice_pepperoni.png',
                'spices': ['🍓', '🍫', '🍪'],
                'stats': [
                    { 'num': 'Fresh', 'label': 'Baked Daily' },
                    { 'num': 'Premium', 'label': 'Cream Blend' },
                    { 'num': '100%', 'label': 'Real Nutella' }
                ]
            }
        ]
    },
    'chamiers': {
        'name': 'Chamiers Cafe',
        'name_lower': 'chamiers',
        'tagline': 'Artisanal Coffee & All-Day Dining in Alwarpet, Chennai',
        'primary_color': '#8c7853',        # Vintage Brass Gold
        'accent_color': '#5c4e36',         # Deep roasted coffee brown
        'light_color': '#f5f2eb',          # Vintage cream
        'hero_image_url': 'assets/beverage.png',
        'mascot_sprite_source': 'assets/mascot_transparent.png',
        'location_tags': ['Alwarpet', 'Chennai', 'Chamiers Road', 'Artisanal Coffee', 'All-Day English Breakfast'],
        'story_title': 'The Chamiers Vibe',
        'story_text': 'Chamiers Cafe is an elegant, vintage-inspired sanctuary in Chennai, serving artisanal coffees, fresh salads, and comforting European plates surrounded by classic brass aesthetics.',
        'menu_data': [
            { "id": "c1", "category": "pizzas", "name": "Classic Flat White", "price": 220, "desc": "Premium hand-selected espresso roast, extracted double and combined with velvety microfoamed milk.", "tag": "House Blend", "img": "assets/beverage.png" },
            { "id": "c2", "category": "pizzas", "name": "Cold Brew Tonic", "price": 240, "desc": "Signature 18-hour cold steeped coffee, served over sparkling tonic and an orange wheel.", "tag": "Refreshing", "img": "assets/beverage.png" },
            { "id": "c3", "category": "pastas-mains", "name": "Wild Mushroom Risotto", "price": 485, "desc": "Creamy arborio rice cooked with fresh shiitake, button, and porcini mushrooms, finished with white truffle oil.", "tag": "Gluten Free", "img": "assets/pasta.png" },
            { "id": "c4", "category": "burgers", "name": "Chamiers Club Sandwich", "price": 395, "desc": "Double decker toasted bread layered with grilled chicken, eggs, crispy bacon, tomatoes, and herb mustard.", "tag": "Signature", "img": "assets/burger.png" }
        ],
        'slider_data': [
            {
                'id': 0,
                'heading': 'COFFEE',
                'badge': 'Artisanal Roasts',
                'desc': 'Slow-extracted specialty grade coffee beans sourced directly from Chikmagalur, ground fresh on our Mazzer grinders.',
                'bgColor': '#5c4e36',
                'mainImg': 'assets/beverage.png',
                'leftImg': 'assets/hero_burger.png',
                'rightImg': 'assets/hero_dessert.png',
                'spices': ['☕', '🍪', '🥛'],
                'stats': [
                    { 'num': '100%', 'label': 'Arabica' },
                    { 'num': '88+', 'label': 'Cupping Score' },
                    { 'num': 'Local', 'label': 'Sourced' }
                ]
            },
            {
                'id': 1,
                'heading': 'CLASSIC',
                'badge': 'European Dining',
                'desc': 'Comforting recipes from southern Europe, using imported parmesan, extra virgin olive oil, and organic farm greens.',
                'bgColor': '#8c7853',
                'mainImg': 'assets/hero_burger.png',
                'leftImg': 'assets/beverage.png',
                'rightImg': 'assets/hero_dessert.png',
                'spices': ['🥬', '🧀', '🍽️'],
                'stats': [
                    { 'num': 'Fresh', 'label': 'Daily Prep' },
                    { 'num': 'Organic', 'label': 'Veggies' },
                    { 'num': 'Import', 'label': 'Cheese' }
                ]
            }
        ]
    },
    'thebark': {
        'name': 'The Bark',
        'name_lower': 'thebark',
        'tagline': 'Pet-Friendly Cafe & Comfort Food in Nungambakkam, Chennai',
        'primary_color': '#2e7d32',        # Forest green
        'accent_color': '#1b5e20',         # Deep leaf green
        'light_color': '#e8f5e9',          # Mint backdrop
        'hero_image_url': 'assets/hero_burger.png',
        'mascot_sprite_source': 'assets/mascot_transparent.png',
        'location_tags': ['Nungambakkam', 'Chennai', 'Pet Friendly Cafe', 'Dog Park Dining', 'Comfort Food'],
        'story_title': 'A Pet Sanctuary',
        'story_text': 'The Bark is Chennai\'s premier pet-friendly dining retreat, featuring a vibrant dog garden, pet menus, and mouth-watering comfort food for human companions.',
        'menu_data': [
            { "id": "b1", "category": "pizzas", "name": "Puppy Treat Burger (Pet Safe)", "price": 250, "desc": "Salt-free chicken and pumpkin mash patty wrapped in a grain-free sweet potato bun, safe for your dogs.", "tag": "Pet Special", "img": "assets/burger.png" },
            { "id": "b2", "category": "pastas-mains", "name": "Loaded Three-Cheese Mac", "price": 380, "desc": "Creamy cheddar, mozzarella, and processed cheese sauce baked with macaroni, topped with parsley crumbs.", "tag": "Comfort Food", "img": "assets/pasta.png" },
            { "id": "b3", "category": "burgers", "name": "Bark Special Clubhouse", "price": 420, "desc": "Triple-decker sandwich with grilled chicken breast, fried egg, lettuce, sliced tomato, and garlic cheese spread.", "tag": "Best Seller", "img": "assets/burger.png" }
        ],
        'slider_data': [
            {
                'id': 0,
                'heading': 'BARK',
                'badge': 'Pet-Friendly Haven',
                'desc': 'Let your pets play in our secure grass gardens while you enjoy thick milkshakes, loaded macaroni, and wood-fired pizzas.',
                'bgColor': '#1b5e20',
                'mainImg': 'assets/hero_burger.png',
                'leftImg': 'assets/hero_dessert.png',
                'rightImg': 'assets/pizza_slice_pepperoni.png',
                'spices': ['🐶', '🍔', '🌳'],
                'stats': [
                    { 'num': '100%', 'label': 'Pet Safe' },
                    { 'num': 'Large', 'label': 'Play Garden' },
                    { 'num': 'Dog', 'label': 'Menu' }
                ]
            }
        ]
    }
}

# ==============================================================================
# 2. URL PARAMETER INTERCEPTOR ROUTE (RequestHandler)
# ==============================================================================
class MultiTenantCafeServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_segments = parsed_url.path.strip('/').split('/')
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        # Intercept route-based path requests (e.g., /chamiers or /thebark)
        # Send a 302 redirect to the root page with query parameters (?cafe=...)
        # This keeps all relative static assets (JS, CSS, images) loading from root.
        route_cafe = path_segments[0].lower()
        if route_cafe in cafe_config:
            self.send_response(302)
            self.send_header('Location', f'/?cafe={route_cafe}')
            self.end_headers()
            return
            
        # Intercept requests for root or index.html to apply dynamic template injection
        if parsed_url.path in ('', '/', '/index.html'):
            # Fetch cafe variable from query parameter, default to 'nolita'
            cafe_key = query_params.get('cafe', ['nolita'])[0].lower()
            if cafe_key not in cafe_config:
                cafe_key = 'nolita'
                
            config = cafe_config[cafe_key]
            
            # Read index.html as our master template
            master_template_path = os.path.join(DIRECTORY, 'index.html')
            if not os.path.exists(master_template_path):
                self.send_error(404, "Master index.html template file not found")
                return
                
            with open(master_template_path, 'r', encoding='utf-8') as f:
                html_template = f.read()
                
            # Perform server-side dynamic template variable injection
            rendered_html = self.inject_variables(html_template, config)
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(rendered_html.encode('utf-8'))
            return
            
        # Serve static assets (CSS, JS, PNGs, etc.) normally
        super().do_GET()

    # ==========================================================================
    # 3. DYNAMIC TEMPLATE VARIABLE INJECTION (Server-Side Rendering)
    # ==========================================================================
    def inject_variables(self, html, config):
        """
        Injects the brand configurations, dynamic colors, SEO tokens,
        and JSON variables directly into the HTML context before serving.
        """
        # A. Page Head: SEO, Title & OpenGraph Injection
        html = html.replace(
            '<title>Nolita | Sourdough Pizza & Craft Eats in Nungambakkam, Chennai</title>',
            f"<title>{config['name']} | {config['tagline']}</title>"
        )
        html = html.replace(
            'Experience authentic NYC sourdough pizza, craft burgers, pastas, and indulgent desserts at Nolita, Nungambakkam, Chennai. Book your table online and get 10% off.',
            f"Welcome to {config['name']}. {config['tagline']}. Book your table online today!"
        )
        html = html.replace(
            'Nolita Chennai, Nolita Nungambakkam, pizza in Chennai, sourdough pizza Chennai, cafe near me, Khader Nawaz Khan road restaurants',
            ', '.join(config['location_tags'])
        )
        html = html.replace(
            '<meta property="og:title" content="Nolita | Sourdough Pizza & Craft Eats in Chennai">',
            f'<meta property="og:title" content="{config["name"]} | {config["tagline"]}">'
        )
        
        # B. CSS Variable Injection (Head Stylesheet)
        # Dynamically inject brand colors and mascot sprite paths directly into the layout.
        style_override = f"""
  <!-- Dynamic Multi-Tenant Stylesheet Injection -->
  <style id="dynamic-brand-variables">
    :root {{
      --clr-blue: {config['primary_color']} !important;
      --clr-blue-dark: {config['accent_color']} !important;
      --clr-blue-light: {config['light_color']} !important;
    }}
    .mascot-avatar {{
      background-image: url('{config['mascot_sprite_source']}') !important;
    }}
  </style>
  
  <!-- Injected client-side state hooks -->
  <script id="dynamic-client-state">
    window.CAFE_MENU_DATA = {json.dumps(config['menu_data'])};
    window.CAFE_SLIDER_DATA = {json.dumps(config['slider_data'])};
    window.CAFE_BRAND_CONFIG = {{
      name: "{config['name']}",
      tagline: "{config['tagline']}"
    }};
  </script>
</head>"""
        
        html = html.replace('</head>', style_override)
        
        # C. Brand name strings in HTML structures
        html = html.replace('<h1 class="loader-logo">nolita</h1>', f'<h1 class="loader-logo">{config["name_lower"]}</h1>')
        html = html.replace('<a href="#" class="logo" id="header-logo">nolita</a>', f'<a href="#" class="logo" id="header-logo">{config["name_lower"]}</a>')
        html = html.replace('<span class="ticket-brand">Nolita Chennai</span>', f'<span class="ticket-brand">{config["name"]} Chennai</span>')
        html = html.replace('<h4 class="merchant-name">Nolita Chennai</h4>', f'<h4 class="merchant-name">{config["name"]} Chennai</h4>')
        html = html.replace('<p class="merchant-upi-id">nolita@ybl</p>', f'<p class="merchant-upi-id">{config["name_lower"]}@ybl</p>')
        html = html.replace('&copy; 2026 Nolita Cafe. All rights reserved.', f'&copy; 2026 {config["name"]} Cafe. All rights reserved.')
        html = html.replace('<div class="marker-bubble">nolita</div>', f'<div class="marker-bubble">{config["name_lower"]}</div>')
        html = html.replace('<h2 class="section-title text-white">More About Nolita</h2>', f'<h2 class="section-title text-white">More About {config["name"]}</h2>')
        
        # D. Brand Story Injection
        html = html.replace('<h3 id="story-card-title">The NYC Spark</h3>', f'<h3 id="story-card-title">{config["story_title"]}</h3>')
        html = html.replace('<p id="story-card-text">Inspired by the espresso bars and rustic sourdough pizzerias of NoLiTa (North of Little Italy), Manhattan. We set out to bring the authentic 48-hour slow-fermentation craft to India.</p>', f'<p id="story-card-text">{config["story_text"]}</p>')
        
        return html

# ==============================================================================
# 4. RUN SERVER
# ==============================================================================
def run(server_class=HTTPServer, handler_class=MultiTenantCafeServer, port=PORT):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"================================================================")
    print(f" Nolita Multi-Tenant Cafe Server successfully running on port {port}")
    print(f" Serving out of: {DIRECTORY}")
    print(f"================================================================")
    print(f" Try visiting:")
    print(f"   * http://localhost:{port}/?cafe=nolita   (Nolita Cafe - Default)")
    print(f"   * http://localhost:{port}/?cafe=chamiers (Chamiers Cafe - Gold Vibe)")
    print(f"   * http://localhost:{port}/?cafe=thebark   (The Bark Cafe - Forest Green)")
    print(f"   * Route redirects: http://localhost:{port}/chamiers")
    print(f"================================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    run()

# ==============================================================================
# FLASK EQUIVALENT (Scale Reference)
# ==============================================================================
"""
If migrating to an enterprise framework like Flask, the dynamic variable injection
and interceptor route map neatly to this decorator model:

from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    cafe_key = request.args.get('cafe', 'nolita').lower()
    if cafe_key not in cafe_config:
        cafe_key = 'nolita'
    
    config = cafe_config[cafe_key]
    return render_template('index.html', config=config)

@app.route('/<cafe_name>')
def path_route(cafe_name):
    if cafe_name.lower() in cafe_config:
        return redirect(url_for('home', cafe=cafe_name.lower()))
    return "Cafe Not Found", 404
"""
