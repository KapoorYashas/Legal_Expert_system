from flask import Flask, request, jsonify
from flask_cors import CORS
from legal_expert_system import rules, recommend_law, get_all_keywords

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend


@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        "message": "Legal Expert System API",
        "version": "1.0",
        "endpoints": {
            "/api/search": "POST - Search laws by keywords",
            "/api/keywords": "GET - Get all available keywords",
            "/api/rules": "GET - Get all rules",
            "/api/stats": "GET - Get system statistics"
        }
    })


@app.route('/api/search', methods=['POST'])
def search_laws():
    """
    Search for laws based on keywords
    
    Request Body:
        {
            "keywords": ["Rape", "Violence"]
        }
    
    Returns:
        List of matching laws
    """
    try:
        data = request.json
        keywords = data.get('keywords', [])
        
        if not keywords:
            return jsonify({
                "error": "No keywords provided",
                "results": []
            }), 400
        
        results = recommend_law(keywords)
        
        return jsonify({
            "keywords": keywords,
            "count": len(results),
            "results": results
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/keywords', methods=['GET'])
def get_keywords():
    """
    Get all available keywords from the system
    
    Returns:
        Sorted list of all keywords
    """
    try:
        keywords = get_all_keywords()
        return jsonify({
            "count": len(keywords),
            "keywords": keywords
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/rules', methods=['GET'])
def get_rules():
    """
    Get all rules in the system
    
    Returns:
        List of all rules
    """
    try:
        # Convert set to list for JSON serialization
        serializable_rules = []
        for rule in rules:
            serializable_rules.append({
                "Category": list(rule["Category"]),
                "IPC": rule["IPC"],
                "BNS": rule["BNS"],
                "Description": rule["Description"]
            })
        
        return jsonify({
            "count": len(serializable_rules),
            "rules": serializable_rules
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """
    Get system statistics
    
    Returns:
        System statistics including total rules, categories, etc.
    """
    try:
        keywords = get_all_keywords()
        
        # Count rules by main category
        category_counts = {}
        for rule in rules:
            main_cat = list(rule["Category"])[0] if rule["Category"] else "Other"
            category_counts[main_cat] = category_counts.get(main_cat, 0) + 1
        
        return jsonify({
            "total_rules": len(rules),
            "total_keywords": len(keywords),
            "category_distribution": category_counts,
            "top_categories": sorted(category_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/search-ipc', methods=['GET'])
def search_by_ipc():
    """
    Search for a law by IPC code
    
    Query Parameters:
        code: IPC code to search for
    
    Returns:
        Matching law or error
    """
    try:
        ipc_code = request.args.get('code', '')
        
        if not ipc_code:
            return jsonify({
                "error": "No IPC code provided"
            }), 400
        
        for rule in rules:
            if rule["IPC"].lower() == ipc_code.lower():
                return jsonify({
                    "found": True,
                    "law": {
                        "Category": list(rule["Category"]),
                        "IPC": rule["IPC"],
                        "BNS": rule["BNS"],
                        "Description": rule["Description"]
                    }
                })
        
        return jsonify({
            "found": False,
            "message": f"No law found for IPC {ipc_code}"
        }), 404
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/search-bns', methods=['GET'])
def search_by_bns():
    """
    Search for a law by BNS code
    
    Query Parameters:
        code: BNS code to search for
    
    Returns:
        Matching law or error
    """
    try:
        bns_code = request.args.get('code', '')
        
        if not bns_code:
            return jsonify({
                "error": "No BNS code provided"
            }), 400
        
        for rule in rules:
            if rule["BNS"].lower() == bns_code.lower():
                return jsonify({
                    "found": True,
                    "law": {
                        "Category": list(rule["Category"]),
                        "IPC": rule["IPC"],
                        "BNS": rule["BNS"],
                        "Description": rule["Description"]
                    }
                })
        
        return jsonify({
            "found": False,
            "message": f"No law found for BNS {bns_code}"
        }), 404
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == '__main__':
    print("=" * 60)
    print("Legal Expert System API Server")
    print("=" * 60)
    print(f"Total Rules: {len(rules)}")
    print(f"Total Keywords: {len(get_all_keywords())}")
    print("\nAPI Endpoints:")
    print("  GET  /                  - API Information")
    print("  POST /api/search        - Search laws by keywords")
    print("  GET  /api/keywords      - Get all keywords")
    print("  GET  /api/rules         - Get all rules")
    print("  GET  /api/stats         - Get statistics")
    print("  GET  /api/search-ipc    - Search by IPC code")
    print("  GET  /api/search-bns    - Search by BNS code")
    print("\nServer starting on http://localhost:5000")
    print("=" * 60)
    
    app.run(debug=True, port=5000, host='0.0.0.0')