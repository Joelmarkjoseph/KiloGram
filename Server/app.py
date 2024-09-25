from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/images'

db = SQLAlchemy(app)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)

@app.route('/api/images', methods=['GET'])
def get_images():
    images = Image.query.all()
    return jsonify([{'id': img.id, 'filename': img.filename} for img in images])

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        new_image = Image(filename=filename)
        db.session.add(new_image)
        db.session.commit()
        return jsonify({'message': 'Image uploaded successfully'}), 201

@app.route('/api/delete/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    image = Image.query.get(image_id)
    
    if image:
        # Remove the image from the database
        db.session.delete(image)
        db.session.commit()
        
        # Optionally, delete the image file from the server
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
        
        return jsonify({"message": "Image deleted successfully!"}), 200
    else:
        return jsonify({"message": "Image not found!"}), 404


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

