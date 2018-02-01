# Slack WAT

# TODO

 * put it somewhere on tinterwebs
 * give people decent output
 * how to pass secrets and env variables to docker
 
# to run in heroku

 * `cd` into root of repo
 * `heroku auth:login`
 * `heroku create`
 * `git push heroku master`
 * `heroku ps:scale web=1`
 * `heroku config:set SLACK_TOKEN:the_token`
 * update the URL in the slack app settings