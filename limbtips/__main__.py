from limbtips import create_app, config
#import waitress

app = create_app()

server = config.get("server", {})

if __name__ == "__main__":
    app.run(
        server.get("host", "127.0.0.1"),
        server.get("port", 5000),
        debug=server.get("debug", False)
    )