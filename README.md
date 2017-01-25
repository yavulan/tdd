# tdd
Discovering test-driven development with JavaScript.

*TDD is a kind of design tool.*

### Benefits of TDD

1. Saves time in a long run.
2. Code quality:
	- we write clean code that just works;
	- we code only what needs to be coded;
	- we think on code before writing it.
3. Testing:
	- all code is covered with tests;
	- automated testing is far faster than manual testing;
	- automated tests are reproducible;
4. Maintaining:
	- easier refactoring (it is a challenge without the tests);
	- well-written tests serves as a documentation;
	- bugs are easier to discover.


### Red-Green-Refactor principle

|#  | Word   | Meaning                                                                 |
|---|--------|-------------------------------------------------------------------------|
|1  |Red     |Write a failing test **before** writing **any** code.                    |
|2  |Green   |Make the test pass using the **simplest code** possible.                 |
|3  |Refactor\* (Clean)|Refactor code to remove duplication while keeping tests green. |

\* Refactoring - changing the implementation while maintaining the same interface.

### Iteration

1. Write a test:
	- short;
	- focused on single behavior of function or method;
	- describes the interface (so have to be changed only if interface has been changed);
	- avoid duplicates.
2. Run tests (to see the test failed):
	- confirm theories about current state of a code;
	- confirm it failed expected way and we understand why it fails.
3. Make the test pass:
	- the simplest possible solution, even hard-coded (keeping up progress pace).
4. Refactor to remove duplication:
	- perform only one operation at a time and then run tests to ensure they are green;
	- refactor tests as well;
	- ways to receive an idea on how to refactor:
		- search for duplication in a code;
		- add another test to fail hard-coded solution.

*(1 iteration == few minutes)*


### General rules and advises

#### Rules

1. Unit tests must NOT contain any branching logic (reduces chance of a bug in the test).

#### Advises

1. Keep cycles short - it gives frequent feedback
2. When you are done for the day - leave failing test, so you know where to start the next day.
3. Run tests automatically when file is saved.

#### Principles

1. YAGNI - “you ain't gonna need it” - don't add functionality until it necessary and until there no test that demonstrate reasonable use of added code.
2. “Single responsibility principle”.

### FAQ

Q: I've found something in a code to change besides current iteration. What do I have to do?
A: Write your idea in a some todo list. Finish current iteration. Only after that return to your idea.

Q: I couldn't finish refactoring without adding more code (e.g., split one method in two). Do I have to add required code?
A: Put refactoring off until running all iterations for required functionality and then refactor.


### Testing frameworks (JavaScript)

- Jasmine
- Mocha
- QUnit
- others

Running them with the Karma in browsers (in actual environment for code to works in) is a good idea.

#### Main syntax
```describe``` — a set of tests, may be nested;
```it``` — a test inside the set of tests;
```expect``` — speaks for himself.

