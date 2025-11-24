import pandas as pd

def load_data():
    return pd.read_excel("api/sample.xlsx")

def filter_area(df, area):
    return df[df['area'].str.contains(area, case=False, na=False)]

def generate_summary(area, filtered):
    if filtered.empty:
        return f"No data available for {area}."

    avg_price = round(filtered['price'].mean(), 2)
    avg_demand = round(filtered['demand'].mean(), 2)

    return (
        f"Here is the analysis of {area}: "
        f"The average price is {avg_price} and the average demand is {avg_demand}. "
        f"The area shows a consistent trend over the years."
    )

def build_chart_json(filtered):
    return {
        "years": filtered["year"].tolist(),
        "price": filtered["price"].tolist(),
        "demand": filtered["demand"].tolist(),
    }
