from dns.message import Message
from dns.resolver import reset_default_resolver, resolve
from flask import request, render_template, jsonify
from dns import resolver
from . import main

nameserver_listings = {
    "google": [ "8.8.8.8", "8.8.4.4" ],
    "cloudflare": [ "1.1.1.1", "1.0.0.1"],
    "opendns": [ "208.67.222.222", "208.67.220.220" ],
    "quad9": [ "9.9.9.9", "149.112.112.112" ],
    "comodo": [ "8.26.56.26", "8.20.247.20" ],
    "verisign": [ "64.6.64.6", "64.6.65.6" ],
    "adgaurd_default": [ "176.103.130.130", "176.103.130.131" ],
    "adgaurd_family": [ "176.103.130.132", "176.103.130.134" ],
    "adgaurd_non": [ "176.103.130.136", "176.103.130.137" ]
}

# DNS Tool Routes

@main.route("/development/dns/", methods=["GET"])
def lt_dns():
    args = request.args 
    if args:
        res = resolver.Resolver(configure=False)
        res.nameservers = nameserver_listings[args.get("dns").lower()]

        try:
            answer = resolver.query(args.get("domain"),  args.get("record"))            
            
            return render_template("development/dns/dns_page.html", active_page="development.dns", result=answer.response, args=args)
        except resolver.NoAnswer:
            return render_template("development/dns/dns_page.html", active_page="development.dns", result="Request Returned No Results", args=args)
    else:
        return render_template("development/dns/dns_page.html", active_page="development.dns")