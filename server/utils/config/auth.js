module.exports = {

    'facebookAuth' : {
        'clientID'      : 2032612350107771,
        'clientSecret'  : 'ca21e3c1728d25509d9be8059b33adeb',
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name']
    }
}
