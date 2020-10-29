---
title: Dear state, please stop lying
date: '2020-02-22'
---

_Managing UI state is hard._

Or we make it hard for ourselves by not paying attention.

How?

We have this React component fetches the list of something and renders accordingly.

```jsx
class List extends React.Component {
  state = { loading: false, data: [], error: null }

  async componentDidMount() {
    this.setState({ loading: true })

    try {
      const response = await api.getData()
      this.setState({ loading: false, data: response.data })
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    if (this.state.error) {
      return <p>Error: {this.state.error}</p>
    }

    return (
      <ul>
        {this.state.data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )
  }
}
```

Pretty straightforward, huh?

Probably not 😬

Our state initializes with `loading: false` and `fetchData` is called on `componentDidMount` which means, right after the initial render.

This will cause a flash in the `Loading` text since it's displayed after we render the empty list in our initial state (`data: []`)

But programmers are pragmatic and smart people; maybe we can quickly fix this by initializing the state with `loading: true`?

✅ - No more flashing UI.

😰 - We say that something is `loading` but that is not the _reality_, nothing is _literally_ `loading` until `fetchData` is called.

_Our state is lying_, but we can live with that.

## Request failed? Oh, snap.

Let's take one more step forward for a better UX and add a _retry_ button to the error component.

```jsx
class List extends React.Component {
  state = { loading: true, data: [], error: null }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })

    try {
      const response = await api.getData()
      this.setState({ loading: false, data: response.data })
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  render() {
    if (this.state.loading) {
      <p>Loading...</p>
    }

    if (this.state.error) {
      return (
        <div>
          <p>Error: {this.state.error}</p>
          <button type="button" onClick={this.fetchData}>
            Try again
          </button>
        </div>
      )
    }

    return (
      // render list
    )
  }
}
```

OK, this would work for our beloved users.

However, readability is not optimal because we're doing some nasty things on `line 9`. We need to perform a clean-up since `error` might be a leftover from the first call 😟

Again, we may come up with an ingenious solution to make that bearable, maybe by introducing a custom `onRetry` method.

```jsx
class List extends React.Component {
  // ...

  fetchData = async () => {
    // this.setState({ loading: true, error: null }) Gone 👋
    try {
      const response = await api.getData()
      this.setState({ loading: false, data: response.data })
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  onRetry = () => {
    this.setState(
      {
        loading: true,
        error: null,
      },
      () => this.fetchData(),
    )
  }

  // ...
}
```

✅ - More readable and traceable.

😰 - We are skipping a very fundamental point, and our state is still lying.

## Time to question our choices

- Why can our state have an error while loading is `true`?
- Why does our state have `data: []` while loading is `true`?
- Why is that possible to have `data` and `error` at the same time?

> 👨🏻‍💻 : "_Dear state, pls stop lying._"

> 🤖 : "_Dear programmer, pls help._"

## How types can help us to make better choices

It's time to enter the safe and shiny world of types, where we can stop [_making impossible state possible_](https://www.youtube.com/watch?v=IcgmSRJHu_8).

🥁🥁🥁

Let's start with a tiny touch and strip the meaningless properties from different types of UI states.

```ts
type LoadingState = { type: 'loading' }
type SuccessState<T> = { type: 'sucess'; data: T }
type FailureState = { type: 'failure'; error: Error }
```

Now we can use the simple but powerful [discriminated (or tagged) unions feature of TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions).

```ts
type State<T> = LoadingState | SuccessState<T> | FailureState
```

By revisiting our state design, we made all of these questions irrelevant.

- ~~Why can our state have an error while loading is `true`?~~
- ~~Why does our state have `data: []` while loading is `true`?~~
- ~~Why is that possible to have `data` and `error` at the same time?~~

How would that affect our component?

```tsx
class List extends React.Component {
  // no more pointless initial values
  state: State<{ id: number; name: string }[]> = { type: 'loading' }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    try {
      const response = await api.getData()
      this.setState({ type: 'success', data: response.data })
    } catch (e) {
      this.setState({ type: 'failure', error: e.message })
    }
  }

  // no more nasty clean-ups
  onRetry = () => this.setState({ type: 'loading' }, this.fetchData)

  // no more top level if statements
  render() {
    switch (this.state.type) {
      case 'loading':
        return <p>Loading...</p>

      case 'failure':
        return (
          <div>
            <p>Error: {this.state.error}</p>
            <button type="button" onClick={this.onRetry}>
              Try again
            </button>
          </div>
        )

      case 'success':
        return (
          <ul>
            {this.state.data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )
    }
  }
}
```

Looks better?

There are more benefits than making the state a trustworthy citizen.

- We have proper types for the `data`.
- We can have proper types for the `error` by creating custom exception types (will discuss later).
- TypeScript will also help us to catch programmer errors to prevent runtime exceptions, as shown below.

```tsx
switch (this.state.type) {
  case 'loading':
    return <p>Loading: {this.state.data[0].id}</p> // NOPE!
```

> 🤖 : "_Dear programmer, good luck with the migration._"

---

### Resources

- ["Effective TypeScript"](https://www.oreilly.com/library/view/effective-typescript/9781492053736/) by [Dan Vanderkam](https://github.com/danvk)
- ["Making Impossible States Impossible"](https://www.youtube.com/watch?v=IcgmSRJHu_8) by [Richard Feldman](https://github.com/rtfeldman)
- ["Pragmatic types: making impossible states impossible"](https://dev.to/stereobooster/pragmatic-types-making-impossible-states-impossible-inh) by [stereobooster](https://stereobooster.com)
