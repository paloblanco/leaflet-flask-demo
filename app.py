import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/cities.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
City = Base.classes.cities

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """
    Render the main page of the webapp.
    Currently, the only api route accessed by the web page is 'passengersbyclass'.
    """
    return render_template('index.html')


@app.route("/api/locations")
def locations():
    """
    Return a dictionary of summary data. Data are structured as follows:
    Data[Survived_or_Died][Class_1_2_or_3] = count_of_passengers_matching_this_description
    """
    
    session = Session(engine)
    # Query all passengers
    results = session.query(City.name, City.population, 
                            City.lat, City.lon).all()

    session.close()

    df = pd.DataFrame(results)
    json_data = df.to_dict('split')['data']

    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=False)