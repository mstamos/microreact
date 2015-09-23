Feature: Allow user to login and logout

  As existing user of the Microscope
  I want to login and logout
  So that I can prove my identity and see personalized data


  Background:
    Given I am signed out

  @rerun
  Scenario: A user can login with valid information
    Given I am on the home page
    When  I click on sign in link
    And   I enter my authentication information
    Then  I should be logged in

  @rerun
  Scenario: A user cannot login with invalid information
    Given I am on the home page
    When  I click on sign in link
    And   I enter my false authentication information
    Then  I should see a user not found error

  @rerun
  Scenario: A user cannot login with invalid email address
    Given I am on the home page
    When  I click on sign in link
    And   I enter my invalid email address
    Then  I should see an invalid email error message

  @dev
  Scenario: A user cannot login with invalid password
    Given I am on the home page
    When  I click on sign in link
    And   I enter my invalid password
    Then  I should see an incorrect password error message