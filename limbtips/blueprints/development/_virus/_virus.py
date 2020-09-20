from flask import request, render_template, jsonify
from . import main, mongo_client

# Virus Tool Routes

@main.route("/development/virus/", methods=["GET"])
def lt_virus():
    args = request.args
    if args:
        data = mongo_client.limbtips[f"virus_hashes_{args['hash'][0]}"].find_one(
            {
                "hash": args["hash"]
            }
        )
        
        if data == None:
            data = "No Data Found"
        
        return render_template("development/virus/virus_page.html", active_page="development.virus", args=args, result=data)
    else:
        return render_template("development/virus/virus_page.html", active_page="development.virus")