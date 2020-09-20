from flask import render_template, request
from jinja2 import Markup, escape
from bson.objectid import ObjectId
import markdown
import base64
from . import main, mongo_client

## Base Routes for the Blog

@main.route("/blog/", methods=["GET"])
def lt_blog_base():
    size = int(request.args.get("size", 25))
    page = int(request.args.get("page", 1))

    page = page if page != 0 else 1
    skip = page * size if page != 1 else 0

    total_pages = ( mongo_client.limbtips.blog_articles.count() // size ) + 1

    result = mongo_client.limbtips.blog_articles.find().sort("date", direction=-1).skip(skip).limit(size)

    return render_template("blog/navigation/navigation.html", active_page="blog", result=result, size=size, page_number=page, pages=range(1, total_pages+1))

@main.route("/blog/<blog_id>", methods=["GET"])
def lt_blog(blog_id):
    article = mongo_client.limbtips.blog_articles.find_one(
        { 
            "_id": ObjectId(blog_id)
        }
    )

    md = markdown.Markdown(
        extensions=[
            "extra",
            "codehilite"
        ]
    )
    
    article["body"] = base64.b64decode(article["body"]).decode("utf-8")


    article["body"] = Markup(md.convert(article["body"]))

    return render_template("blog/article/blog.html", active_page="blog", article=article)