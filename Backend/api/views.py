from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import os

# --------------------------------------
# Load Excel safely
# --------------------------------------
def load_excel():
    file_path = os.path.join(os.path.dirname(__file__), "sample.xlsx")
    df = pd.read_excel(file_path, engine="openpyxl")
    df.columns = [c.strip().lower() for c in df.columns]
    return df

# --------------------------------------
# Numeric conversion helper
# --------------------------------------
def to_numeric(series):
    return pd.to_numeric(
        series.astype(str).str.replace(",", "").str.strip(),
        errors="coerce"
    )

# --------------------------------------
# ANALYZE SINGLE AREA
# --------------------------------------
@api_view(["POST"])
def analyze_area(request):
    query = (request.data.get("query") or "").strip()

    if not query:
        return Response({"summary": "Please enter an area name.", "chart": [], "table": []})

    try:
        df = load_excel()
    except Exception as e:
        return Response({
            "summary": f"Excel read error: {e}",
            "chart": [],
            "table": []
        }, status=500)

    # Column mappings
    AREA = "final location"
    YEAR = "year"
    PRICE = "flat - weighted average rate"
    DEMAND = "total sold - igr"
    SIZE = "total carpet area supplied (sqft)"

    required_cols = {AREA, YEAR, PRICE, DEMAND}
    if not required_cols.issubset(df.columns):
        return Response({
            "summary": f"Missing columns: {required_cols - set(df.columns)}",
            "chart": [],
            "table": []
        })

    # Filter rows for area
    mask = df[AREA].astype(str).str.contains(query, case=False, na=False)
    filtered = df.loc[mask].copy()

    if filtered.empty:
        return Response({"summary": f"No data found for {query}", "chart": [], "table": []})

    # Convert numeric fields
    filtered[PRICE] = to_numeric(filtered[PRICE])
    filtered[DEMAND] = to_numeric(filtered[DEMAND])
    filtered[YEAR] = to_numeric(filtered[YEAR])
    filtered[SIZE] = to_numeric(filtered[SIZE])

    filtered = filtered.sort_values(YEAR)

    avg_price = round(filtered[PRICE].mean(), 2)
    avg_demand = round(filtered[DEMAND].mean(), 2)

    summary = (
        f"Analysis for {query}: average flat price ₹{avg_price:,}, "
        f"average demand {avg_demand}, {len(filtered)} records found."
    )

    # --------------------------------------
    # FIXED: Chart must be a LIST of objects
    # --------------------------------------
    chart = []
    for _, row in filtered.iterrows():
        chart.append({
            "year": str(row[YEAR]),
            "price": float(row[PRICE] or 0),
            "demand": float(row[DEMAND] or 0)
        })

    # Table data
    table = []
    for _, row in filtered.iterrows():
        table.append({
            "year": str(row.get(YEAR, "")),
            "area": row.get(AREA, ""),
            "price": float(row.get(PRICE, 0) or 0),
            "demand": float(row.get(DEMAND, 0) or 0),
            "size": float(row.get(SIZE, 0) or 0)
        })

    return Response({
        "summary": summary,
        "chart": chart,
        "table": table
    })

# --------------------------------------
# COMPARE MULTIPLE AREAS
# --------------------------------------
@api_view(["POST"])
def compare_areas(request):
    areas = request.data.get("areas") or []

    if not isinstance(areas, list) or len(areas) < 2:
        return Response({"summary": "Provide at least two areas in a list."}, status=400)

    try:
        df = load_excel()
    except Exception as e:
        return Response({"summary": f"Excel read error: {e}"}, status=500)

    AREA = "final location"
    YEAR = "year"
    PRICE = "flat - weighted average rate"
    DEMAND = "total sold - igr"

    results = {}

    for area in areas:
        mask = df[AREA].astype(str).str.contains(area, case=False, na=False)
        sub = df.loc[mask].copy()

        if sub.empty:
            results[area] = []
            continue

        sub[PRICE] = to_numeric(sub[PRICE])
        sub[DEMAND] = to_numeric(sub[DEMAND])
        sub[YEAR] = to_numeric(sub[YEAR])

        sub = sub.sort_values(YEAR)

        area_chart = []
        for _, row in sub.iterrows():
            area_chart.append({
                "year": str(row[YEAR]),
                "price": float(row[PRICE] or 0),
                "demand": float(row[DEMAND] or 0)
            })

        results[area] = area_chart

    return Response({
        "summary": f"Comparing: {', '.join(areas)}",
        "comparison": results
    })
