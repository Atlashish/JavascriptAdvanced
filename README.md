# Giovanni's Library

![banner](src/assets/img/Screenshot%20-site.png)

## About the project 📚

the site allows you to search for a category of books (fantasy, horror, drama, romance, etc.) and, by requesting the Open Library API, displays the first 20 books in that category and when you click on them, it appears the description of each individual book.

For the API request I used the fetch function:

```JavaScript
//basic fetch structure

fetch('URL')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

To request the titles, authors and covers of the books, a different API URL was used than that for the description of the books.

## Webpack and NodeJS 💡

Webpack is a module bundler that allows you to bundle your JavaScript code into a single file.
In this project, webpack was configured in order to manage all dependencies and optimize them for production. The configuration of webpack can be found inside `webpack.config.js` file.
To config Webpack we need to install NodeJs, an open source, cross-platform runtime environment for executing JavaScript code. 
Node is used extensively for server-side programming, making it possible for developers to use JavaScript for client-side and server-side code without needing to learn an additional language.

## Deployment 🚀

To deploy this project locally:

```bash
  npm run dev
```

## Links 🔗


Deploy app on Netlify -> [https://search-book-gl.netlify.app/](https://search-book-gl.netlify.app/)

Github repository -> [https://github.com/Atlashish/JavascriptAdvanced](https://github.com/Atlashish/JavascriptAdvanced)

## Authors 👥

- [@Atlashish](https://github.com/Atlashish/)
