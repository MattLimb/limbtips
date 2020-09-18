from flask import render_template
from jinja2 import Markup, escape
import markdown
import base64
from . import main, mongo_client

## Base Routes for the Development Category

@main.route("/blog/", methods=["GET"])
def blog_index():
    article = mongo_client.limbtips.blog_articles.find_one(
        { 
            "title": "Hello World!"
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