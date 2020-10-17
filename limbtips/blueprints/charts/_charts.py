from flask import render_template
from . import main

## Base Routes for the Development Category

@main.route("/charts/", methods=["GET"])
def charts():
    return render_template("charts/charts.html", active_page="charts")