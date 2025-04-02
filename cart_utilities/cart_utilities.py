from flask import jsonify

class CartError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message

#Funcion auxilar para validar
def validate_products(products_list):
    for product in products_list:
        product['price'] = float(product.get('price'))
        product['stock'] = int(product.get('stock') or 0)
        product['manufacturer'] = product.get('manufacturer', 'unknown')
        if 'bulk_discount' not in product:
            product['bulk_discount'] = None
    return products_list

#Funcion auxuliar para el descuento #AÑADIR A LO QUE DEVUELVE EL DESUENTO APLICADO PARA EL FRONT
def apply_discount(product, units):
    discount_info = product.get('bulk_discount')
    if discount_info and units >= discount_info.get('min_qty'):
        discount_percent = discount_info.get('discount_percent')
        price = product.get('price') * (1 - discount_percent / 100)
        message = f"{discount_percent}% discount applied to {product.get('name')}!!!"
        return price, message
    return product. get('price'), None

#Funcion de buscar por nombre que se repite alguna que otra vez
def find_by_name(name, entity):
    for item in entity:
        if item.get('name', '').lower() == name.lower():
            return item
    return None
#Funcion de buscar por id 
def find_by_id(id, entity):
    for item in entity:
        if item.get('id', '').lower() == id.lower():
            return item
    return None

#la he cambiado para poner lo de las excepciones y asi ya me hace un "return" desde fuera
def check(product, data, units_available):    
    if not product:
        raise CartError("Product not found")
    elif product.get(units_available) == 0:
        raise CartError(f"We are so sorry, there are no available units of {product.get('name')}")
    elif data.get('units') <= 0 or product.get(units_available) < data.get('units'):
        raise CartError(f"Invalid units, only a maximum of {product.get(units_available)} units and a minimum of 1")

def initialize_variables(products,cart,request):
    data = request.json
    product = find_by_name(data.get('name'), products)
    cart_item = find_by_name(data.get('name'), cart)
    return data, product, cart_item
