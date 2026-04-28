"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['POST'])
def user_signup():
    body = request.json
    if not body:
        return jsonify({"msg": "sorry your request is empty"}), 400
    email = body.get("email")
    if not email:
        return jsonify({"msg": "sorry no email"}), 400
    password = body.get("password")
    if not password:
        return jsonify({"msg": "sorry no password"}), 400
    
    # hashPassword = password.hashfunction() 
    
    # I dont understand the key value pairs how to Call User Class and add user???
    newUser = User(
        email = email,
        password = password,
        is_active = True
    )
    db.session.add(newUser)
    db.session.commit()
    return jsonify(newUser.serialize()), 201
    
@api.route('/login', methods=['POST'])
def user_login():
    #Check HTTP Request
    body = request.json
    if not body:
        return jsonify({"msg": "sorry your request is empty"}), 400
    email = body.get("email")
    if not email:
        return jsonify({"msg": "sorry no email"}), 400
    password = body.get("password")
    if not password:
        return jsonify({"msg": "sorry no password"}), 400
    
    #Check if User is in Database
    user = db.session.execute(
        select(User)
        .where(User.email == email)
        .where(User.password == password)
    ).scalar_one_or_none()
    
    if not user:
        return jsonify({"msg": "sorry user does not exist, please signup"}), 400
    
    #Create Token to Login
    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token}), 201



@api.route("/protected", methods=["GET"])
@jwt_required()
def protected(): 
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()

    # Get User Information from Database
    user = db.session.execute(
        select(User)
        .where(User.email == current_user)
    ).scalar_one_or_none()

    return jsonify(user.serialize()), 200
