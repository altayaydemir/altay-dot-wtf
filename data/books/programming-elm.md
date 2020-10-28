---
isbn: '1680502859'
date: '2020-09-21'
rating: '7/10'
---

## Chapter 1: Get Started with Elm

Introduction to the language, and initialization of the example app: _Picshare_

All variables are defined as constants, but REPL allows us to change them for convenience.

Elm is an _expression-oriented_ language. An expression is anything a programming language can evaluate to produce a value. Literals such as strings and numbers, math operators, and calling functions are all expressions in Elm.

### Branching

The `if` statement is similar to `ternary` expression in JavaScript. Elm's `if` statements have two advantages:

- It makes us to supply an `else` branch.
- It expects all branches to return same type of value.

### Partial Application

Elm functions are _curried,_ which is the _fancy way of saying they take one argument at a time._

Filling one argument at a time is known as _partial application._ Calling a function with only some arguments is _partially applying it._

> Create curried functions, partially apply arguments.

### Lists

Lists (also records) doesn't have notion of indices. Lists work by letting each element reference the next element in the list, similar to the links in chain. The language protects us from potential `undefined/null` values with this approach.

Lists can also include same type of elements.

---

## Chapter 2: Create Stateful Elm Applications

Introduction to _Elm Architecture:_ View-Model-Update pattern.

### Records

Elm developers typically refer to the entries in a record as _fields._

Record update syntax `newDog = { d | age = dog.age + 1 }` differs from `Object.assign` because it creates a new object each time, where the other lets us merge together different JavaScript objects.

### Benefits of Immutability

- It makes the data flow explicit.
- Instances of data structures can share data internally because there is no risk of code accidentally or intentionally mutating the shared data.
- In multithread languages, there is no risk of threads mutating the shared data.

### Custom Types and Pattern Matching

Elm developers refer to the values of a custom type as _constructors._

Each branch of a case expression is itself an expression so we don't need a `break` statement. `_` can be used as the wildcard for pattern matching.

```elm
update msg model =
	case msg of
		Like -> { model | liked = True }
	  _ => { model | liked = False }
```

---

## Chapter 3: Refactor and Enhance Elm Applications

### Using Type Aliases as Constructor

Elm also creates a constructor function with the same name as the type alias.

```elm
type alias Model =
	{ url : String
	, caption: String
	, liked : Bool
	}

initialModel = Model "https://programming-elm/1.jpg" "Surfing" False
```

### Checking List Length

Pattern matching is more versatile and faster compared to counting elements.

```elm
list = ["a", "b"]

case list of
	[] ->
		text "empty"

	_ ->
		ul [] [(List.map ... list])
```

---

## Chapter 4: Communicate with Servers

JSON decoding with `elm-decoders`, also uses NoRedInk's `elm-json-decode-pipeline` package for the railway.

```elm
type Result error value
	= Ok value
	| Err error
```

### Special string syntax (""")

```elm
myElmPoem =
	"""
	Roses are red...
	"""
```

### HTTP commands

We create the command, but execution is delegated to the Elm Architecture for the sake of purity. Sending commands can be done in the application lifecycle or as a result of a `Msg` handled in the `update` function.

### Safely Handle `null`

```elm
type Maybe a
	= Just a
	| Nothing

type alias Model =
	{ photo = Maybe Photo }

case model.photo of
	Just Photo -> "yey!"
	Nothing -> "ney!"
```

---

## Chapter 5: Go Real-Time with WebSockets

- Started with handling `loading` and `error` states for the HTTP request in the UI.
- Created a JS-Elm bridge for listening WebSocket events, with `ports`
  - `listen` → outgoing ports that return a `Cmd` → `elmApp.ports.subscibe.listen(webSocketHandler)`
  - `receive` → incoming ports that return a `Sub` → `socket.onMessage = (e) => elmApp.ports.receive.send(e.data)`
- Added a notification banner to show there are new photos available to be put into the `Feed`, then an `onClick` handler to put it into feed from `streamQueue`.

### Backward Composition (<<) Operator

```elm
WebSocket.receive
	(LoadStreamPhoto << decodeString photoDecoder)

--- same as ---
WebSocket.receive
	(\ json -> LoadStreamPhoto (decodeString photoDecoder json))
```

### Cons (::) Operator

Creates a new list by prepending the left operand to the list on the right.

```elm
oldList = ["b", "c"]

newList = "a" :: oldList -- -> ["a", "b", "c"]
```

---

## Chapter 6: Build Larger Applications

Refactored of the `salad-builder` app.

**Deconstructed `view` to have multiple functions.**

```elm
view .... everything

viewInput
viewCheckbox
```

**Simplified messages**

```elm
SelectLettuce
SelectSpinach
SelectSpringMix

--- to ---

type Base = Lettuce | Spinach | SpringMix

SelectBase Base
```

**Learnt two ways to make `model` more maintainable:**

```elm
type alias Model =
    { building : Bool
    , sending : Bool
    , success : Bool
    , error : Maybe String
    , base : Base
    , toppings : Set String
    , dressing : Dressing
    , name : String
    , email : String
    , phone : String
    }

---- first approach: nested state ----
type alias Salad =
	{ base: Base
	, toppings: Set String
	, dressing: Dressing
	}

type alias Model =
	{
		--- view state ---
		salad: Salad
		--- contact details state ---
	}

---- second approach: extensible records ----
type alias Contact c =
	{ c
			| name : String
			, email : String
			, phone : String
	}

-- any object can be treated as Contact if it contains the fields --
```

**Prevented invalid states**

```elm
type alias Model =
    { building : Bool
    , sending : Bool
    , success : Bool
    , error : Maybe String
		-- rest of the state --
    }

--- combined fields ---
type Step
	= Building (Maybe Error)
	| Sending
	| Confirmation

type alias Model =
	{
		step: Step
		-- rest of the state --
	}
```

---

## Chapter 7: Develop, Debug, and Deploy with Powerful Tooling

- Usage of `Debug.log` and `Debug.todo` with `Json.Decode` examples.
- `elm reactor` and `create-elm-app`
- Ported `picshare` to `create-elm-app`

---

## Chapter 8: Integrate with JavaScript

Added an Elm powered file uploader to a React application that has three inputs (title, description, images) for a note taking service.

Sent input events from Elm to JS with ports, also received the image list from the source of truth, `App` component from the JS context, again through ports.

Used `Flags` for passing data during the initialization step of the Elm app.

---

## Chapter 9: Test Elm Applications

Applied TDD while developing a date helper library called `awesome-date`

- **Unit tests** isolate and verify the behavior of one small piece of software.
- **Integration testing** verifies that your units work together correctly.
- Added a custom assertion for `ExpectDate`.
- Used `Fuzz` module for property based testing.

Tested an Elm app called `awesome-date-app` which uses the `awesome-date` module.

- Tests for `model`, `view`, `update` functions based on the changes in the app.
- Used `Test.Html` to interact with the virtual DOM for selecting elements and simulating events.

---

## Chapter 10: Build Single-Page Applications

Router boilerplate. How to match parameters, re-use components for multiple pages etc.
