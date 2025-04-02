import requests

BASE_URL = "http://localhost:5000"

def menu():
    option = input("""
    ==== Board Game Online Store ====
    1. View Cart
    2. Add Product
    3. Remove Product
    4. Exit
    Select an option: """)
    if option.isdigit() and int(option)>0 and int(option)<=4:
        return int(option)

# FUNCION PARA MOSTRAR NOMBRES DE JUEGOS
def show_product_names(): #preguntar si esta bien devolver algo en una funcion que es para otra cosa
    products = (requests.get(f"{BASE_URL}/products")).json()
    product_names = [product.get('name') for product in products]
    output_games_list = ", ".join(product_names)
    print(output_games_list)
    return product_names

#OPCION 1: MOSTRAR EL CARRO
def view_cart():    
    cart_data = (requests.get(f"{BASE_URL}/cart")).json()
    cart = cart_data.get('cart') #no va del tirón porque se manda tambien el total
    if not cart:
        print("Your cart is empty")
        return None
    else:
        for cart_item in cart:
            print(f"Name: {cart_item.get('name', '')} unit price:{round(cart_item.get('price', 0),2)} units:{round(cart_item.get('units', 0),2)}")
        print(f"Total Amount: {round(cart_data.get('total'),2)}")
        return cart     

#OPCION 2: AÑADIR AL CARRO
def add_to_cart():
    product_names = show_product_names()
    name = input("Enter product name: ").strip().lower().title()
    

    if name not in product_names:
        print("We are sorry, we don't have that game. You can check our game list:")
        print(", ".join(product_names))
        return  
    try:
        units = int(input("Enter te quantity: "))
        if units <= 0:
            print("Enter a positive number.")
            return
    except ValueError:
        print("Invalid input, enter a number")
        return

    response = (requests.post(f"{BASE_URL}/cart/add", json={"name": name, "units": units})).json()
    print(response.get('message', response.get('error', ''))) #es un default el error si message bien, si no  pues error




#OPCION 3: ELMINAR DEL CARRO
def remove_from_cart():
    cart = view_cart()
    if not cart:
        return
    product_names = [cart_item.get('name') for cart_item in cart]
    name = input("Enter product name: ").strip().lower().title()
    if name not in product_names:
        print("this game is not in your cart")
        return

    try:
        units = int(input(f"How many {name} do you want to remove? "))
        if units <= 0:
            print("Enter a positive number.")
            return
    except ValueError:
        print("Invalid input, enter a number.")
        return
    response = requests.delete(f"{BASE_URL}/cart/remove", json={"name": name, "units": units})
    data = response.json()
    print(data.get('message'), data.get('error', ''))


option = 0
while option != 4:
    option = menu()
    if option == 1:
        view_cart()
    elif option == 2:
        
        add_to_cart()
    elif option == 3:
        remove_from_cart()
    elif option == 4:
        print("Thanks for your purchase!")
    else:
        print("Please, introduce an option between 1 and 4")
