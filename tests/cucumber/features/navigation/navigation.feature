Feature: Restrict access to unregistered user

  As unregistered user
  I want to navigate only on permited pages
  So that I can see the public content of the page

  Background:
    Given I am signed out

  @rerun
  Scenario: An unregistered user cannot submit a new post
      Given I am on the home page
      When  I navigate to submit page
      Then  I should see an Access Denied message

  @rerun
  Scenario: An unregistered user cannot add a comment
      Given I am on the home page
      When  I navigate to a post
      Then  I should not be able to insert comment