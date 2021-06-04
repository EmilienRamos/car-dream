# Car Dream

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

---
**Please note that for this test, the Strict Mode from Angular 12 has been disabled.**

---

## Informations sur le code

Quelques lignes en français pour expliquer plus clairement et en détail ce que vous trouverez dans ce projet :

- La contrainte `NgRX` n'a pas été respectée : Effectivement, cette librairie n'est, à mon sens, pas utile dans la mesure où tout (ou presque), peut-être gérer grâce à **RxJS**. Un débat là dessus serait interessant !

- Pour gérer les Flexbox, je me suis servis de [FlexLayout](https://github.com/angular/flex-layout). Ce module permet, via des directives, de gérer la disposition des blocs directement depuis le HTML, allégeant ainsi les SCSS.

- Les thèmes (Dark & White), ainsi que toute la colorimétrie à été mit en place grâce à `Angular Material`.


## Installing dependencies

Before any command line, you have to install dependencies.
As usual, just do `npm install` to read the `package.json` file and install all required dependencies.

## Development server

This project use [json-server](https://www.npmjs.com/package/json-server).
So, before running Angular, **you must run** `json-server --watch db.json`.
This will listen to `db.json` file, and allow you to make simples HTTP requests.
This "fake API" is running on port 3000.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
