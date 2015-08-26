Feature: Create New Post

  As existing user of the Microscope
  I want to login
  So that I can submit new post

  Background: Login and already at submit page
    Given I am logged in
    When  I click "Submit Post" button
    Then I should navigate to "/submit" page

  @dev
  Scenario: Fill the submit form and submit the new post
    Given I fill in title with "Meteor Point"
    And   I fill in url with "http://www.meteorpoint.com"
    When  I submit the form
    Then  I should see the new Post with title "Meteor Point"