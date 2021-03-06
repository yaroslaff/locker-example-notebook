# locker-example-notebook

Simple example notebook application to show how easy to write secure multi-user web application with locker.

## Quickstart

### Create app on locker server 
You may use myapps or (if you are admin of locker server):
~~~
# username is 'my' here
sudo locker-admin create my notebook
~~~

(copy autogenerated KEY from output, or use `--key` to specify it manually )

### Create .env file
~~~
# LOCKER_HOST is APP_NAME-USER.YOURDOMAIN
LOCKER_HOST=notebook-my.mir.local.www-security.net
LOCKER_KEY=<Your key here>
~~~

Now, all further `locker-admin` commands require either LOCKER_KEY and LOCKER_HOST env variables, or must be run in directory with this `.env` file.

### Test if app is created and deploy
In same directory with .env file, run `locker-admin ls`:
~~~
$ locker-admin ls 
home/                                                       DIR mt:1640712673.841365
var/                                                        DIR mt:1640712673.841365
etc/                                                        DIR mt:1640712673.841365
~~~

deploy app:
~~~
locker-admin deploy
~~~

### Configure application
Add your website URL to `origins`: `locker-admin edit etc/options.json`. Example:
~~~
{
    "origins": [
	    "http://localhost:8000",
	    "http://notebook.ll.www-security.net:8000"
    ]
}
~~~
Make sure there MUST be NO trailing slash in origins.


### Start development webserver
Run server:
~~~
locker-admin serve
~~~
