# Setup and run the tests
1. Run the tests using below commands (node.js set up is pre-requisite)

 npm install
 npm test

2. All the tests run if the API response is not Throttling. 
3. If throttling response is returned from API, just validates the throttling message.

# Testing Observations
- API performance is very poor and throttling for every few requests
- In some instances API is returning blank or no response
- There are fields returning null values (Swagger didnt specify the field as mandatory though) 