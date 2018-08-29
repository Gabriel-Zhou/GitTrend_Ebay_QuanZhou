# GitTrend By Quan Zhou (Ebay Programming Challenge)

GitTrend is a web application to get top repository in github

Functions:

```
1) Show the top 10 github repositories with most fork and pull request 
2) Provide a time period and language control to select the result, 
    for example, top 10 fork Java repositories in last 30 days
3) A simple UI chart to show the trend of each top repository
```

# Demo Site and Screenshots

## Demo Site URL: 

http://rocks-53.sdsc.edu:8079/gittrendqz/repos.html

(Deployed on one Linux VM using Tomcat V7 as web apps container)

## Demo Site Screenshots:

1) Default Filter (All Languages, Date Since 2018-08-20)

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen1.jpg" width="50%">

2) Custom Filter (Java, Date Since 2018-08-03)

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen2.jpg" width="55%">

3) Trend Chart of one Top repository (Spring-boot repo's newest fork events)

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen3.jpg" width="50%">

# Installation Guide

## Software Dependencies
1. Python 3.0 or higher
2. Apache Tomcat V7 or higher

Note: Choose 1 or 2 to host a web server container to run HTML/JS sources. 

## Deploy GitTrend Web Application

### Using Python Simple HTTP Server

1) Edit /SimpleServer.py

```
vi SimpleServer.py
```

2) Edit Port # to available port on your environment

```
PORT = 9002 ---> PORT = # of your free port)
```

3) Run Simple HTTP Server

```
python SimpleServer.py
```

4) Access GitTrend Web App through your browser by URL:

```
http://<ip>:<port>/repos.html
```

### Using Tomcat Web Container

1) Download and Run your tomcat server. 

2) Deploy the GitTrend Web Apps on your tomcat server:

```
cp -rf <repo_path>/* <tomcat_path>/webapps/gittrendqz/
```

3) Access GitTrend Web App through your browser by URL:

```
http://<ip>:<tomcat_port>/gittrendqz/repos.html
```

# Contribution
This work is from Quan Zhou for Ebay Programming Challenge from Aug. 28th to Aug. 29th, 2018.

# Release History
* 0.1 Release 2018.08.29



