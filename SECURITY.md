# Security Analysis

### Google/Outlook Rest API

With API, we need validation of SSL certificates. For our TODO application, we will be using Rest API instead of directly handling API, where the key may contain hackable information. Rest API uses OAUTH and only provide to HTTPS endpoints, this allows users to authenticate the service and guarantees integrity of the transmitted data. This avoids XSS flaws and inadequate validation.

### Account

In order to store user information, we will be using MongoDB Databases. Although easy to use, MongoDB databases are exposed to the internet by default and don't require credentials immediately by default. In addition, the default port of MongoDB is wide open, which allows hackers to access the data. In order to avoid this issue, we must configure the installation of MongoDB by:
<li> Create Admin user for MongoDB (Authorization) </li>
<li> TSL/SSL </li>
<li> Role-based access control (RBAC) </li>
<li> Authentication </li>
</br>
This will avoid injection, broken authentication, and Sensitive Data exposure. 

### Login and Registration

Where there is a login page or registration page there is a threat for an attack on a website. Attackers can implement cross-site scripting (XSS) attacks by injecting javascript code in the login/registration text box. One way we will defend against this is by implenting escape keys.
</br>
<ul>Broke Authentication
<li>Where possible, implement multi-factor authentication to prevent automated, credential stuffing, brute force, and stolen credential re-use attacks</li>
<li>Implement weak-password checks, such as testing new or changed passwords against a list of the top 10000 worst passwords</li>
</ul>
<ul>Sensity Data Exposure
<li>Classify data processed, stored or transmitted by an application</li>
<li>Don’t store sensitive data unnecessarily</li>
</ul>
<ul>cross-site scripting (XSS)
<li>Using frameworks that automatically escape XSS by design, such as the latest React JS.</li>
</ul>

### Geolocation API

Geolocation obtains the location of the user. Geolocation API can violate a user's location privacy due to its coarse-grained permission and location models. To avoid this we will:
<li> Ask for the user's consent</li>
<li> Inform them of when location services would be utilized</li>



