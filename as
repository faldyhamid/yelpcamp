Based on the updated documentation for the latest connect-mongo version currently, I found that we have to make the following changes in the app.js code (instead of the old connect-mongo v3.2.0 configuration lines):

- First, we require MongoStore differently:

const session = require('express-session');
const MongoStore = require('connect-mongo');
* Make sure that you don't repeat the 'const session' declaration line twice in your code, it should be already present if you are following Colt's code.

* Make sure to remove the old 'const MongoDBStore' line present in Colt's code if you are using the updated connect-mongo version — check this link to find the highlighted line that you should not use anymore with the newest versions of connect-mongo.

- Then, with the latest connect-mongo version, we should use the MongoStore.create() method to create the store (which has some differences in this new version, like specifying the mongoUrl property, and the crypto/secret properties):

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

After making those changes, things should work correctly with the latest connect-mongo version too! If you see any errors while visiting the app pages after implementing this, then try to clear your localhost domain session data/cookies in the browser (clear them just for localhost, you do not need to delete them for your other websites), or try to access your app from a private/incognito browser window after modifying this session configuration.

If you need any further help with this, please reach out to the course Q&A boards.

Zarko — Teaching Assistant