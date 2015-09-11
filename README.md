# Microscope + React + FlowRouter + Tests = Microreact

I wanted to learn React with Meteor by building something. So I decided to
rebuild [Microscope] (https://github.com/DiscoverMeteor/Microscope), the app with which I learned Meteor.
[Microscope] (https://github.com/DiscoverMeteor/Microscope) is an app that someone can build by reading the [Discover Meteor Book] (http://www.discovermeteor.com).
In this version I rebuilt the app until chapter 10-5 and you can find a dome [here](http://microreact.meteor.com). You can find a dome at [Microreact](http://microreact.meteor.com/).

Except from integrating React and Meteor I wanted to learn how to write tests for my applications. So in this repo you will find 60 tests, 13 unit tests, 6 integration and 41 end-to-end. 
I used [xolvio:cucumber] (https://atmospherejs.com/xolvio/cucumber) for end-to-end tests and [sanjo:jasmine](https://atmospherejs.com/sanjo/jasmine) for integration and unit tests. I tried to explain every line
 of code into my tests.

If you want to run the app download the repo
  
```
$ git clone https://github.com/mstamos/microreact.git
```

```
$ cd microreact
```

If you want to run only integration and unit test just run meteor into command line and you will see the green dot from velocity
on right-top corner

```
$ meteor
```

If you want to run the end-to-end test you can do it by typing and enjoy the view from new browser!

```
$ CUCUMBER_TAGS=@rerun meteor
```


Below you will find all the resources I used to learn writing tests.
      
## Test Resources  
    
###1. Cucumber
#####1.1 Articles
1. [E2E testing your Meteor app with Cucumber, WebdriverIO and Chai] (http://g00glen00b.be/e2e-testing-your-meteor-app-with-cucumber-webdriverio-and-chai/)
2. [A Basic Cucumber Meteor Tutorial] (http://www.mhurwi.com/a-basic-cucumber-meteor-tutorial/)
3. [Cucumber.js and Meteor - The why and how of it] (http://joshowens.me/cucumber-js-and-meteor-the-why-and-how-of-it/)
4. [Writing Effective Cucumber Tests] (https://www.coveros.com/writing-effective-cucumber-tests/)
5. [15 Expert Tips for Using Cucumber] (https://blog.engineyard.com/2009/15-expert-tips-for-using-cucumber)
6. [Cucumber.js and Meteor - The why and how of it] (http://joshowens.me/cucumber-js-and-meteor-the-why-and-how-of-it/)

#####1.2 Videos
1. [Test a Meteor app with Cucumber.js] (https://www.youtube.com/watch?v=aLlHMToDb6I)
2. [Cucumber.js and Meteor - The why and how of it] (https://www.youtube.com/watch?v=FiClbcyxTGU)

###2. Meteor
1. [Meteor.js Testing] (http://webtempest.com/meteor-js-testing)
2. [Test-Driven Meteor: A Very Basic Tutorial] (http://www.mhurwi.com/test-driven-meteor-very-basic-tutorial/)
3. [Bullet-proof Meteor applications with Velocity, Unit Testing, Integration Testing and Jasmine] (https://doctorllama.wordpress.com/2014/09/22/bullet-proof-internationalised-meteor-applications-with-velocity-unit-testing-integration-testing-and-jasmine/)
4. [Unit testing Meteor applications with Velocity, Jasmine and Sinon.js] (http://g00glen00b.be/unit-testing-meteor-applications-with-velocity-jasmine-and-sinon-js/)

###3. React
1. [Unit Test React Components in Meteor] (https://medium.com/@skinnygeek1010/unit-test-react-components-in-meteor-a19d96684d7d)
2. [Unit testing React components without a DOM] (http://simonsmith.io/unit-testing-react-components-without-a-dom/)
3. [Approaches to testing React components - an overview] (http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/)
4. [Unit Testing and Building a React Component With Jest, Gulp and React Test Utils](http://www.undefinednull.com/2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/)
5. [Unit and Functional Testing React Components] (http://reactjsnews.com/testing-in-react/)  


##The packages I use are:

1. [react] (https://github.com/meteor/react-packages) (It is not officially announced by MDG yet)
2. [meteorhacks:flow-router] (https://atmospherejs.com/meteorhacks/flow-router)
3. [twbs:bootstrap](https://atmospherejs.com/twbs/bootstrap)
4. [accounts-password](https://atmospherejs.com/meteor/accounts-password)
5. [xolvio:cucumber] (https://atmospherejs.com/xolvio/cucumber)
6. [sanjo:jasmine](https://atmospherejs.com/sanjo/jasmine) 


##Suggestions
Feel free to open a new issue if you find any mistakes or you want further explanations or you want to suggest something else.
I am quite new on React and Testing so I tried to do my best.

This repo isn't officially supported by [Discover Meteor](http://www.discovermeteor.com).
