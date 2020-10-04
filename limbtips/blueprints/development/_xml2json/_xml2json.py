from xml.etree import ElementTree as et
from flask import request, render_template, jsonify
from jinja2 import Markup, escape
from . import main
import json
import markdown


def xml2json(_element):
    element_json = dict(
        namespace=None,
        tag=None,
        attributes=dict(),
        text=None,
        children=list()
    )

    for attrib_tag, attrib_value in _element.attrib.items():
        attrib = dict(
            namespace=None,
            value=attrib_value
        )

        attrib_tag = str(attrib_tag).split("}")

        if len(attrib_tag) > 1:
            attrib["namespace"] = attrib_tag[0][1::]
            attrib_tag = [ attrib_tag[1] ]
        
        element_json["attributes"][attrib_tag[0]] = attrib

    tmp_tag = str(_element.tag).split("}")

    if len(tmp_tag) == 1:
        element_json["tag"] = tmp_tag[0]
    else:
        element_json["namespace"] = tmp_tag[0][1::]
        element_json["tag"] = tmp_tag[1]

    for child_element in list(_element):
        element_json["children"].append(xml2json(child_element))

    if len(element_json["children"]) == 0:
        element_json["text"] = str(_element.text).strip()

    return element_json


@main.route("/development/xml2json/", methods=["GET", "POST"])
def xml2json_index():
    if request.method == "GET":
        return render_template("development/xml2json/xml2json.html", active_page="development.xml2json")
    elif request.method == "POST":
        raw_xml = request.form.get("xml_input")
        
        tree = et.fromstring(raw_xml)
        
        json_dict = xml2json(tree)

        md = markdown.Markdown(
            extensions=[
                "extra",
                "codehilite"
            ]
        )

        display = Markup(md.convert(f"```json\n{json.dumps(json_dict, indent=2)}\n```"))

        return render_template("development/xml2json/xml2json.html", active_page="development.xml2json", result=display, copy_text=json_dict, raw_xml=raw_xml)