from flask import render_template
from . import main

## Base Routes for the Site

@main.route("/", methods=["GET"])
def site_index():
    return render_template("base/home_content.html")