from flask import Blueprint
from .. import config

main = Blueprint("main", __name__)


from . import base, development, charts

# Anything Mongo Related has been disabled for now.

#from pymongo import MongoClient
#mongo_client = MongoClient("mongodb://{}:{}/".format(config["mongodb"]["host"], config["mongodb"]["port"]))
#from . import blog
