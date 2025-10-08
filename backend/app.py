from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

products = [
    {
        "id": 1,
        "imageUrl": "https://fruit-time.ua/images/products/60/kavun.jpeg",
        "name": "Product 1",
        "count": 4,
        "size": {"width": 200, "height": 200},
        "weight": "200g",
        "comments": [1, 2]
    },
    {
        "id": 2,
        "imageUrl": "https://agriks.com.ua/images/detailed/28/semena-arbuza-selest-f1-sakata-1-000-sht_1.jpg",
        "name": "Product 2",
        "count": 10,
        "size": {"width": 150, "height": 150},
        "weight": "350g",
        "comments": []
    }
]

comments = [
    {
        "id": 1,
        "productId": 1,
        "description": "Great product!",
        "date": "14:00 22.08.2021"
    },
    {
        "id": 2,
        "productId": 1,
        "description": "Good quality for the price.",
        "date": "16:30 23.08.2021"
    }
]


@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)


@app.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)


@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Missing product name"}), 400

    new_product = {
        "id": len(products) + 1,
        "imageUrl": data.get("imageUrl", ""),
        "name": data["name"],
        "count": data.get("count", 0),
        "size": data.get("size", {"width": 0, "height": 0}),
        "weight": data.get("weight", ""),
        "comments": []
    }
    products.append(new_product)
    return jsonify(new_product), 201


@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Оновлюємо лише передані поля
    product.update({k: v for k, v in data.items() if k in product})
    return jsonify(product)


@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global products, comments
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Видаляємо товар
    products = [p for p in products if p["id"] != product_id]
    # Видаляємо коментарі до цього товару
    comments = [c for c in comments if c["productId"] != product_id]

    return jsonify({"message": "Product and its comments deleted"})



@app.route('/products/<int:product_id>/comments', methods=['GET'])
def get_product_comments(product_id):
    product_comments = [c for c in comments if c["productId"] == product_id]
    return jsonify(product_comments)



@app.route('/products/<int:product_id>/comments', methods=['POST'])
def add_comment(product_id):
    data = request.get_json()
    if not data or "description" not in data:
        return jsonify({"error": "Missing description field"}), 400

    new_comment = {
        "id": len(comments) + 1,
        "productId": product_id,
        "description": data["description"],
        "date": datetime.now().strftime("%H:%M %d.%m.%Y")
    }
    comments.append(new_comment)

    # Додаємо id коментаря до продукту
    for product in products:
        if product["id"] == product_id:
            product["comments"].append(new_comment["id"])

    return jsonify(new_comment), 201


@app.route('/products/<int:product_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(product_id, comment_id):
    global comments
    comment = next((c for c in comments if c["id"] == comment_id and c["productId"] == product_id), None)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    comments = [c for c in comments if c["id"] != comment_id]

    # Видаляємо id коментаря з товару
    for product in products:
        if product["id"] == product_id:
            product["comments"] = [cid for cid in product["comments"] if cid != comment_id]

    return jsonify({"message": "Comment deleted"})


if __name__ == '__main__':
    app.run(debug=True)
