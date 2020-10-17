from flask import Blueprint
from pymongo import MongoClient
from .. import config

main = Blueprint("main", __name__)

mongo_client = MongoClient("mongodb://{}:{}/".format(config["mongodb"]["host"], config["mongodb"]["port"]))

from . import base, development, blog, charts

