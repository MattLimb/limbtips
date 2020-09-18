from flask import render_template
from . import main

## Base Routes for the Development Category

@main.route("/development/", methods=["GET"])
def development_index():
    return render_template("development/development.html", active_page="development")