from flask import Flask, request, jsonify
from flask_cors import CORS
from job_recommendation  import get_job_listings  # Import job recommendation logic

app = Flask(__name__)
CORS(app)



@app.route('/recommend-jobs', methods=['POST'])
def recommend_jobs():
    data = request.get_json()
    search_query = data.get("search_query", "")
    
    if not search_query:
        return jsonify({"error": "Search query is required"}), 400

    jobs = get_job_listings(search_query)
    return jsonify(jobs)

if __name__ == '__main__':
    app.run(debug=True)
