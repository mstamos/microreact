Feature: User Login

  As existing user of the Microscope
  I want to login
  So that I can create new post


  Scenario: Login and create new psot
      Given I am logged in
      When  I click "Submit Post" button
      And   I fill in the Title with "Meteor Point"
      And   I fill in the URL with "http://www.meteorpoint.com"
      Then  I should see a Post with title "Meteor Point"

