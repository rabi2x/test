# Import the library we need, which is Pandas and Matplotlib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
##%matplotlib inline

# Import statsmodel
import statsmodels.api as sm
import statsmodels.formula.api as smf
from statsmodels.tsa.stattools import adfuller

# Set some parameters to get good visuals - style to ggplot and size to 15,10
plt.style.use('ggplot')
plt.rcParams['figure.figsize'] = (15, 10)

# Read the csv file of Monthwise Quantity and Price csv file we have.
df = pd.read_csv('MonthWiseMarketArrivals_clean.csv')
dfsort = df.sort_values(by = "date")
print(dfsort.head())
 
dfBang = dfsort.loc[dfsort.city == "BANGALORE"].copy()
print(dfBang.head())
print(dfBang.tail())
dfBang.date = pd.DatetimeIndex(dfBang.date)
print(dfBang.head())
print(dfBang.tail())
quit()

# Changing the date column to a Time Interval columnn
df.date = pd.DatetimeIndex(df.date)
 

# Change the index to the date column
df.index = pd.PeriodIndex(df.date, freq='M')
print(df.index)
 
# Sort the data frame by date
#df = df.sort_values(by = "date")
 
print(df.head(7))

dfBang = df.loc[df.city == "BANGALORE"].copy()
print(dfBang.head())
quit()
# Drop redundant columns
dfBang = dfBang.drop(["market", "month", "year", "state", "city", "priceMin", "priceMax"], axis = 1)
print(dfBang.head())

#dfBang.head(30).priceMod.plot()
dfBang.priceMod.plot(kind = "hist", bins = 30)
plt.show()
dfBang['priceModLog'] = np.log(dfBang.priceMod)
model_mean_pred = dfBang.priceModLog.mean()
# Let us store this as our Mean Predication Value
dfBang["priceMean"] = np.exp(model_mean_pred)
dfBang.plot(kind="line", x="date", y = ["priceMod", "priceMean"])
plt.show()


def RMSE(predicted, actual):
    mse = (predicted - actual)**2
    rmse = np.sqrt(mse.sum()/mse.count())
    return rmse
    
model_mean_RMSE = RMSE(dfBang.priceMean, dfBang.priceMod)
print(model_mean_RMSE)

# Save this in a dataframe
dfBangResults = pd.DataFrame(columns = ["Model", "Forecast", "RMSE"])
print(dfBangResults.head())

#Model	Forecast	RMSE
dfBangResults.loc[0,"Model"] = "Mean"
dfBangResults.loc[0,"Forecast"] = np.exp(model_mean_pred)
dfBangResults.loc[0,"RMSE"] = model_mean_RMSE
print(dfBangResults.head())

dfBang["timeIndex"] = dfBang.date - dfBang.date.min()
print(dfBang.head())