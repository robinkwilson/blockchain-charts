# Blockchain.info Charts Reimagined

Recreate Blockchain.info/charts to better organize and display charts to users. 

I chose to build this project similar to the current implementation so your team may choose to integrate these new features easily into the website -- regardless of your interviewing decisions.

I utilized my business and marketing knowledge for the business assumptions and created this project from scratch without using react-create-app.

**Thank you for your time reviewing my work! I welcome any and all feedback.**


### Prerequisites

Your machine should be running Node and the package manager npm globally.

## Setup Dev Environment

Use the following commands to setup dev environment on your local machine. Please ignore the "Warn unmet dependencies" warning, this is an known issue. 

```
git clone https://github.com/robin-k-wilson/codingchallenge-blockchain-charts.git
cd codingchallenge-blockchain-charts
npm install
npm run build
npm run dev
```

Open 'http://localhost:8080/' in your preferred browser.

## Running the tests

Use npm command to run tests in the terminal/console.
```
npm test'
```

## Summary for Context to Design Decisions

Coming from a business background, I first tried to figure out Blockchain's purpose for the charts page and the user demographic.

#### Business Assumptions for the User:
1. User is looking for specific data on Blockchain.info for business or personal reasons.
2. User is saavy in blockchain terminology.

#### Business Assumptions for Blockchain's main purpose for this page:
1. Establish credibility and brand themselves as the leading source of Bitcoin data.
2. Display all datasets available.
3. Encourage the user to use the interactive charts and the developer API's.


### Initial Thoughts and My Solutions

#### Initial Thoughts:
- Too much text
- Feeling disorganized -- how do I find the chart I wanted easily?
- Popular statistics could be more exciting
- Clicking to see each chart could be better

#### My Solutions:
- Use easy-to-read units for each chart
- Filters for easy searching within the charts for data
- Popular Stats - added a chart to visualize a heated topic in the crypto world -- mining revenue vs transaction value -- and was actually surprised by the information
  - Proved my "Chart Sandbox" idea could be compelling
- Added a Call to Action component to route user to developer APIs or the Chart Sandbox -- as per my Blockchain's page purpose assumption
- **Not Implemented** Single chart page to render all data clicked on. I dubbed it the "Chart Sandbox." Would have one large chart with buttons at the top (or bottom) that onClick would query and then render the datapoints on the chart. For implementing this, please see **"Next Steps"** section.


### Notes for Improvements

#### Coding Improvements
- Finish unit tests
- Break out common layouts into _/common/components
- Integrate history for BrowserRouter -- can type url in for navigating pages
- Integrate backend database to query for chart data and other static information
- Integrate into Blockchain.info CSS standards
- Finish Chart Sandbox: 
    - Create buttons with onClick functions that fetchChartData accordingly
    - Populating a large _common/Chart with each dataset
    - Create spinner while fetching datasets

#### Responsiveness and Feel Improvements
- Filters attach to 'sticky navbar' when scrolling
- Filter buttons collapse at mobile view width
- Popular Stats Loading: 
    - Utilize this.state.hidden for both popular statistics and charts to integrates a loading div the same size as the chart. If no data loads, loading screen shrinks to height 0px.

#### Security Improvements
- Proxy server should not be used
- Secure canvas element that is rendered for the popular statistics chart
