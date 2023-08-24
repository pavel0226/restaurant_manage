# A Web Application for a Restaurant
## Developed as part of a Final Assment project for the Web Programming Course in our College

* _**About**_ 
  * We have observed that the best restaurant websites have one thing in common: **beautiful presentation**. UI/UX design is of immense importance if we want to impress the customer.With this in mind, we have kept the UI simple, minimal and neat, also we have provided easy to use interface.
  * At the same time we have also worked on many **utility features** like **ordering food online** :iphone:, building user profiles to write **reviews** :speech_balloon: on the food we serve and much more. We will **analyse the reviews** from the customers and also the most popularly ordered food at our restaurant, based upon this we generate **statistical charts** to keep improving!

* _**Features**_
  * _**Login, Registration and Authentication**_ :guardsman:: Once a user registers on the webpage, his/her data will be securely stored on the **mLab database**.
The user’s session will then begin(valid for 24hrs.) and he/she can then securely browse through our
website, complete profile, order food, write review after ordering food. The webpage supports
**multiple user sessions**.
Once a user logouts, his/her session expires and the data is **securely backed-up** to the database.
Again to use the services the user has to login, where he will be **authenticated**, once that is done
successfully, he can proceed to the services. 

![Imgur](https://i.imgur.com/1Zp1lnI.png)


  * _**Order Online and Online Payment**_ :iphone::credit_card:: The user can browse through various available **menus** and place food items in **cart**, in preference.
Then the user can proceed to place an order, where he/she will be directed to a page to add
address, other details. Then the user has to select for options to pay online or by cash. If the user
wishes to pay online he/she will be directed to the Payment Module by **Stripe payments**. There the
user can perform the money (atomic) transaction securely!!

![Imgur Menu](https://i.imgur.com/zFeOsnd.png)
![Imgur Pay](https://i.imgur.com/oe839ml.png)

  * _**User Reviews**_ :speech_balloon:: The user can write reviews and blogs on the food they have ordered. They will be posted in the blogs
section. Only the registered users are allowed to write these. We **analyse the Reviews** to improve
the services provided by the restaurant.

![Imgur HomePage](https://i.imgur.com/vYQUUQS.png)

* _**Web Development Tools and Technologies used**_ :computer::
  _React Hooks and React Router, React semantic UI :nail_care:, GraphQL, Chrome dev tools , React Dev tools, Apollo GraphQL
playground, mLab noSQL relational db _


