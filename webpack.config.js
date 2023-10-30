const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  // Configurazione dell'entry point e dell'output del bundle
  entry: {
    index: "./src/assets/js/script.js", // Punto di ingresso del bundle
  },
  output: {
    filename: "bundle.js", // Nome del file di output
    path: path.resolve(__dirname, "dist"), // Percorso di output del bundle
  },
  // Regole per gestire i diversi tipi di file durante il processo di build
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Gestione dei file CSS
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Trasformazione dei file JS utilizzando Babel per il supporto dei browser
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: "img-optimize-loader", // Ottimizzazione delle immagini
          options: {
            compress: {
              mode: "low", // Modalità di compressione delle immagini
            },
          },
        },
      },
    ],
  },
  // Plugin utilizzati durante il processo di build
  plugins: [
    new HtmlWebpackPlugin({
      title: "Applicazione webpack", // Titolo della pagina HTML generata
      template: "./src/index.html", // Percorso del file HTML template
    }),
    new FaviconsWebpackPlugin("./src/assets/img/favicon-16x16.png"),
  ],
  // Configurazioni del server di sviluppo
  devServer: {
    port: 5000, // Porta su cui il server di sviluppo sarà in ascolto
    open: true, // Apre automaticamente il browser al lancio del server
    static: path.resolve(__dirname, "dist"), // Percorso dei file statici per il server
  },
};
