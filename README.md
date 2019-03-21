# Auth0 Authentication
Authentication with OAuth0 in Angular and NodeJS.

Below is the solution for to get Access Token as JWT and JWT verification with NodeJS.

## JWT Access Token
1. Need to use audience

2. Configuration in my angular app. All the keys are case sensitive.
```
{
    clientID: <your_client_id>',
    domain: '<your.auth0.com>',
    audience: 'https://<your.auth0.com>/api/v2/',
    redirect: 'http://localhost:4200/callback',
    logoutRedirect: 'http://localhost:4200',
    scope: 'openid profile email'
}
```

## Notes

1. If you want access token as JWT then you must have to set audience.
2. Set APIs https://<your.auth0.com>/api/v2/ in audience as given above example. Userinfo endpoint not working for me.
3. In the URL / is required at last. https://<your.auth0.com>/api/v2/
4. Node side JWT verification
```
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
```
5. In the URL / is required at last. https://<your.auth0.com>/api/v2/ and https://<your.auth0.com>/
