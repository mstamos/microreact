Feature: Static Pages

  As a new user
  I want to be able to access all static pages
  So that I can see what this app is all about

  Background:
    Given I am a new user


  Scenario: Visit home page
    When I navigate to "/"
    Then I should see the title on the header "Microscope"