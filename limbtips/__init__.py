from flask import Flask
import pathlib
import yaml
import os

def load_config(location="limbtips/config/limbtips.yaml"):
    with pathlib.Path(location).open("r") as f:
        config_file = yaml.safe_load(f.read())
    return config_file

config = load_config()

def create_app():
    """Create an instance of the application."""
    app = Flask(__name__)

    server = config.get('server', {})

    app.debug = server.get('debug', False)
    app.config['SERVER_NAME'] = "{host}:{port}".format(
        host=server.get("host", "127.0.0.1"),
        port=server.get("port", 5000)
    )
    app.config['SECRET_KEY'] = os.urandom(10)

    from .blueprints import main

    app.register_blueprint(main)

    return app