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

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen1.jpg" width="60%">

2) Custom Filter (Java, Date Since 2018-08-03)

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen2.jpg" width="60%">

3) Trend Chart of one Top repository (Spring-boot repo's newest fork events)

<img src="https://github.com/Gabriel-Zhou/GitTrend_Ebay_QuanZhou/blob/master/screenshots/screen3.jpg" width="60%">

# Installation Guide

## Software Dependencies
1. Python 3.0 or higher
2. Apache Tomcat V7 or higher

Note: Choose 1 or 2 to host a web server container to run HTML/JS sources. 



## Install and Deploy PRAGMA PIT Ext service
1) Build source to generate a web application archive (war) file:

```
mvn clean install -Dmaven.test.skip=true
```

2) PIT ext service must be configured properly so it knows which identifier service and type registry to contact.
An example configuration file in Java's properties file format can be found as testing.properties.example. Copy it to /usr/local/rda/pitapi.properties and make sure the application server's user has sufficient permissions to read it. Also update it with the addresses of the Handle System 8 instance and possibly the Type Registry. The config file contains the same properties that are also used for testing.

3) Deploy the generated war file on your application server (e.g., Tomcat)

```
cp <pragmapit-ext>/target/pragmapit-ext-0.2.war <tomcat>/webapps/
```

4) A simple test to verify that the API is running properly can be made by calling the {@link rdapit.rest.TypingRESTResource#simplePing ping} method:

```
curl http://your.server/your.application.path/pitapi/ping
>Hello World
```

# Contribution
This work is from Quan Zhou for Ebay Programming Challenge from Aug. 28th to Aug. 29th, 2018.

# Release History
* 0.1 Release 2018.08.29



