# Wallet Portfolio Tracker

A simple web app for tracking crypto wallet portfolios across Ethereum addresses.

## Features

- Add multiple wallet addresses to track
- Real-time balance checking via Ethereum RPC
- Portfolio value calculation in USD
- Visual charts showing distribution and historical trends
- Export data to CSV
- 30-day historical tracking using localStorage

## Setup

1. Clone this repo
2. Open `index.html` in a web browser
3. Enter wallet addresses to start tracking

No backend required - everything runs in the browser.

## Tech Stack

- Vanilla JavaScript
- ethers.js for blockchain interactions
- Chart.js for visualizations
- CoinGecko API for price data

## Notes

- Data is stored locally in your browser
- Requires internet connection to fetch balances and prices
- Free public RPC endpoint may have rate limits