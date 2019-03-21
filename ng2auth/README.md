# Ng2auth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Solution

Need to use audience
Configuration in my angular app. All the keys are case sensitive.
{
    clientID: <your_client_id>',
    domain: '<your.auth0.com>',
    audience: 'https://<your.auth0.com>/api/v2/',
    redirect: 'http://localhost:4200/callback',
    logoutRedirect: 'http://localhost:4200',
    scope: 'openid profile email'
  }
Notes

If you want access token as JWT then you must have to set audience.
Set APIs https://<your.auth0.com>/api/v2/ in audience as given above example. Userinfo endpoint not working for me.
In the URL / is required at last. https://<your.auth0.com>/api/v2/
Node side JWT verification
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://<your.auth0.com>/.well-known/jwks.json'
    }),
    // This is the identifier we set when we created the API
    audience: 'https://<your.auth0.com>/api/v2/',
    issuer: 'https://<your.auth0.com>/',
    algorithms: ['RS256']
});
In the URL / is required at last. https://<your.auth0.com>/api/v2/ and https://<your.auth0.com>/
