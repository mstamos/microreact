Feature: Allow user to login and logout

  As existing user of the Microscope
  I want to login and logout
  So that I can prove my identity and see personalized data


  Background:
    Given I am signed out


  Scenario: A user can login with valid information
    Given I am on the home page
    When  I click on sign in link
    And   I enter my authentication information
    Then  I should be logged in


  @dev
  Scenario: A user cannot login with invalid information
    Given I am on the home page
    When  I click on sign in link
    And   I enter my false authentication information
    Then  I should see a user not found error