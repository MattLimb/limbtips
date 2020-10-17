from flask import request, render_template, jsonify
from . import main

@main.route("/charts/sankey/", methods=["GET"])
def sankey_charts():
    return render_template("charts/sankey/sankey.html", active_page="charts.sankey")