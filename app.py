from flask import Flask, jsonify, request
from flask_cors import CORS
from .cart_utilities.cart_utilities import validate_products, initialize_variables, check, apply_discount, CartError



app = Flask(__name__)
CORS(app)

products = [
    {"id": "0001dev" ,"name": "Catan", "price": 45.99, "manufacturer": "Devir", "stock": 20, "bulk_discount": {"min_qty": 3, "discount_percent": 10},"image": "https://m.media-amazon.com/images/I/71O7UMaQr0L.jpg"},
    {"id": "0002zma", "name": "Carcassonne", "price": "34.99", "manufacturer": "Z-Man Games", "stock": 15,"image": "https://i.ebayimg.com/images/g/kdUAAOSwaXNenCip/s-l1200.jpg"},  # Price should be float
    {"id": "0003unk", "name": "Gloomhaven", "price": 120.00, "manufacturer": None, "stock": 10,"image": "https://m.media-amazon.com/images/I/71KfUf4ySkL.jpg"},  # Missing manufacturer
    {"id": "0004fry", "name": "Terraforming Mars", "price": 55.00, "manufacturer": "FryxGames", "stock": "12","image": "https://m.media-amazon.com/images/I/91x5bb0PyaL.jpg"},  # Stock should be int
    {"id": "0005fcmo", "name": "Zombicide", "price": 89.99, "manufacturer": "CMON", "stock": 8, "bulk_discount": {"min_qty": 2, "discount_percent": 5},"image": "https://www.ludokubo.com/wp-content/uploads/2019/01/Zombicide.jpg"},
    {"id": "0006fan", "name": "Arkham Horror", "price": 64.99, "manufacturer": "Fantasy Flight", "stock": 14,"image": "https://3meeples.es/6915-large_default/arkham-horror-lcg-los-devoradores-de-suenos-expansion-de-investigadores-castellano.jpg"},
    {"id": "0007rep", "name": "7 Wonders", "price": 42.50, "manufacturer": "Repos", "stock": 18,"image": "https://lacomarcagames.com/wp-content/uploads/2021/10/7-Wonders.jpg"},
    {"id": "0008sto", "name": "Scythe", "price": 75.00, "manufacturer": "Stonemaier", "stock": 7,"image": "https://images-cdn.ubuy.ae/66f63b09ee3b3f3fe202a8e8-stonemaier-games-scythe-board-game.jpg"},
    {"id": "0009led", "name": "Root", "price": 60.00, "manufacturer": "Leder Games", "stock": None,"image": "https://m.media-amazon.com/images/I/91ezFG-gQ6L._AC_UF894,1000_QL80_.jpg"},  # Missing stock
    {"id": "0010lib", "name": "Dixit", "price": 29.99, "manufacturer": "Libellud", "stock": 20,"image": "https://m.media-amazon.com/images/I/81mJJefl2pL._AC_UF1000,1000_QL80_.jpg"},
]

cart = []

orders = []


products = validate_products(products) #Valido antes de nada para "depurar" lo que esta irregular

@app.route('/products')
def get_products():
    return jsonify(products)

@app.route('/cart')
def get_cart():
    total_price = sum(item['price']*item['units'] for item in cart)
    return jsonify({"cart": cart, "total": total_price})

@app.route('/cart/add', methods=['POST'])
def add_cart():
    try:
        data, product, cart_item = initialize_variables(products,cart, request)
        check(product, data, 'stock')
        product['stock'] -=  data.get('units')

        if cart_item:
            cart_item['units'] +=  data.get('units')
            cart_item['discounted'], discount_message = apply_discount(product, cart_item.get('units'))

        else:
            discounted, discount_message = apply_discount(product, data.get('units'))
            cart.append({
                "id": product.get('id'),
                "image": product.get('image'),
                "name": product.get('name'),
                "price": product.get('price'), 
                "discounted": discounted,
                "manufacturer": product.get('manufacturer'),
                "units":  data.get('units'),
                "max_stock": product.get('stock') + data.get('units')
            })

        message = "Product successfully added"
        if discount_message:
            message += f" // {discount_message}"
        return jsonify({"message": message})
    except CartError as e:
        return jsonify({"error": e.message}), 400


@app.route('/cart/remove', methods=['DELETE'])
def remove_cart():
    try:
        data, product, cart_item = initialize_variables(products, cart, request)
        check(cart_item, data, 'units')
        
        if product:
            product['stock'] += data.get('units')
        
        cart_item['units'] -= data.get('units')
        
        if cart_item['units'] <= 0:
            cart.remove(cart_item)
            message = f"All units of {data.get('name')} removed"
        else:
            cart_item['discounted'], discount_message = apply_discount(product, cart_item.get('units'))
            message = f"Removed {data.get('units')} units of {cart_item.get('name')}"
            if not discount_message:
                message += " //Careful, DISCOUNT REMOVED!"
        
        return jsonify({"message": message})
    except CartError as e:
        return jsonify({"error": e.message}), 400
    
@app.route('/order', methods=['POST'])
def create_order():
    global cart, orders
    if not cart:
        return jsonify({"error": "Cart is empty"}), 400
    
    total = 0
    for item in cart:
        total += item['price'] * item['units']

    order_id = len(orders) + 1

    order = {
        "order_id": order_id,
        "items": cart.copy(),
        "total": round(total, 2)
    }
    orders.append(order)
    

    cart = []

    return jsonify({
        "message": "Order created successfully",
        "order_id": order_id,
        "order": order
    }), 201

    
if __name__ == '__main__':
    app.run(debug=True)
