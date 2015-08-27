Feature: Restrict access to unregistered user

  As unregistered user
  I want to navigate only on permited pages
  So that I can see the public content of the page

  Background:
    Given I am signed out


  @dev
  Scenario: An unregister user can not a new post
      Given I am on the home page
      When  I navigate to submit page
      Then  I should see an Access Denied message