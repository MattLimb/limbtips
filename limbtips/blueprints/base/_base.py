from flask import render_template
from . import main

## Base Routes for the Site

@main.route("/", methods=["GET"])
def lt_base():
    return render_template("base/home_content.html")