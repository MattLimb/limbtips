from dns.message import Message
from dns.resolver import reset_default_resolver, resolve
from flask import request, render_template, jsonify
from dns import resolver
from . import main

# DNS Tool Routes

@main.route("/development/dns/", methods=["GET"])
def ml_dns():
    args = request.args 
    if args:
        res = resolver.Resolver(configure=False)
        res.nameservers = [ args.get("dns") ]

        try:
            answer = resolver.query(args.get("domain"),  args.get("record"))
            return render_template("development/dns/dns_page.html", active_page="development.dns", result=answer.response, args=args)
        except resolver.NoAnswer:
            return render_template("development/dns/dns_page.html", active_page="development.dns", result="Request Returned No Results", args=args)
    else:
        return render_template("development/dns/dns_page.html", active_page="development.dns")