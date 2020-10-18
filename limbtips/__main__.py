from limbtips import create_app, config
import waitress

app = create_app(debug=config["server"]["debug"])

if __name__ == "__main__":
    #app.run(host=config["server"]["host"], port=config["server"]["port"])  
    waitress.serve(app, host=config["server"]["host"], port=config["server"]["port"])