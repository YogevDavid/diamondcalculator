# Diamond Calculator

A full stack app that lets you control how you value your diamonds.
This app contains a Mongo Database, an Express Based API running on Node.js and a client side built with React.

You can view the app running [on Heroku](https://diamoncalculator.herokuapp.com/)

## Installation
Requires [Node.js and npm](https://nodejs.org/).

**Back End**
```sh
npm i
node server.js
```
**Back End**
```sh
npm i
npm start
```

## Dependencies
##### FrontEnd
- react, react-dom, react-router-dom
- redux, react-redux
- reactjs-popup
- bootstarp (CDN)
- fontawesome (CDN)

##### BackEnd
- bcryptjs
- express
- jsonwebtoken
- mongoose
- upload-file
- uuidv4

# Notes
I went about this project knowing next to nothing about how to value a diamon so please bear with me as I googled almost everything.
#### Assumptions:
1. **According to this article:**
https://www.gemsociety.org/article/what-determines-diamond-cost/
There is a "Diamond Price Chart" which gives you a cross result based on the _color_ and _value_.
You need to take this _value_, and multiply it by the _chart multiplier_ (usually 100), I  took the default values for the calculator from this article, but the user can fully control them in the settings.
**According to this article:**
https://www.wpdiamonds.com/diamonds/diamond-selling-guides/how-are-diamonds-priced/
The _cut quality_ adds to the value as seen in the quote below, the precentage can also be changed later on. 
> When considering how cut grades affect the price of diamonds: excellent cut is optimal. It is worth approximately 15% more than a Very Good (VG) cut grade, which is worth approximately 15% more than a Good (G) cut grade

2. The pop up has to present similar items based on their properties and **not** their price.
3. The app should have its own backend and shouldn't use a third party API to get the diamond values.
4. The app needs to have some sort of user identification since the users are "uploading"  diamonds.
5. Since diamonds are rated by their lack of color and clarity, the UI's styling should be sharp, mostly black and white, with a clean cut look.

#### Regrets:
I used JavaScript to reduce the dev time, in hindsight I probably should have used TypeScript. That way I could could have made use of classes instead of writing a static function, and unions, types and interfaces instead of large schemas in the DB. 

### Features
- User management and authantication.
- Managing a presonal diamonds collection (images and prperties).
- Calculating a value based on your own calulator's values and logic.
- Viewing up to 4 similar items and control the values you match them by.
