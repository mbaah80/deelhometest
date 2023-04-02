
1. PureComponent just superficially examines props and state before re-rendering. and Component always re-renders when its props or state change. 
 -  when the component's props or state contain complex data structures or objects that are being mutated, PureComponent may not behave as expected.

2.  Context+ ShouldComponentUpdate can be dangerous because it can cause unexpected re-renders and performance issues, because context  pass data down the component tree without going through intermediate components.

3. Information can be pass from component to it parent through Callback function, Props drilling, Context API.
   - Callback can pass data from the parent component to the child component as a prop
   -  Data can be pass through intermediate components using props drilling
   - Context API can be used to pass data through the component tree without having to pass props down manually at every level.


4. ShouldComponentUpdate  and Memoization
   - ShouldComponentUpdate  can be used to prevent re-rendering of a component if the props or state have not changed.
   - Memoization can be used to prevent re-rendering of a component if the props or state have not changed. (React.memo())

5. fragment is a way to group elements together without adding an extra node to the DOM. It is useful when you need to return multiple elements from a component's render method.
  - fragment without a key prop could potentially break your application if the order of the elements changes.


   
    [//]: # function autoComplete() {
    return (
      <>
        <input type="text" />
        <ul>
          <li>Ghana</li>
          <li>Togo</li>
        </ul>
      </>
    );
  }

6. WithData, WithError, WithState 

7. Promises, callbacks, and async/await provides different approaches for handling exceptions in JavaScript.


    [//]: # Promises can use .catch() to handle errors.
    myPromise.then((result) => {
      // display result or do something with it
    }).catch((error) => {
      // handling error
    });


    [//]: # Callbacks can use try/catch to handle errors.
    function myCallback(error, result) {
      if (error) {
        // handling error
      } else {
        // display result or do something with it
      }
    }


    [//]: # Async/await can use try/catch to handle errors.
    async function filterOptions() {
      try {
        const filtered = await myPromise;
        // display result or do something with it
      } catch (error) {
        // handling error
      }
    }

8. setState takes in  one or two arguments, depending on how you want to update the component's state.
   - setState is  asynchronous because it is not guaranteed that the state will be updated immediately after the setState function is called.

     

    [//]:  setState(prevState => ({ count: prevState.count + 1 }));
    [//]:  setState({ count: this.state.count + 1 });

9. Migrating a class component to a function component steps. 
   - Identify the component that needs to be migrated and its corresponding file.
   - Identify the state and side effects in the component.
   - Remove the render() method and the constructor.
   - Replace the state with the useState hook.
   - Remove the " this " keyword and use function arguments instead.

10. Styles can be applied to components in several ways.
     - Inline styles
     - CSS stylesheets
     - CSS-in-JS



    [//]: # Inline styles
    funtion App() {
      return (
        <div style={{ color: 'red' }}>
          <h1>Inline styles</h1>
        </div>
      );
    }

    [//]: # CSS stylesheets
    [//]: # (   // CSS Stylesheets)
    import './App.css';
    function App() {
      return (
        <div className="App">
          <h1>CSS stylesheets</h1>
        </div>
      );
    }

    [//]: # (   // CSS-in-JS)
    import styled from 'styled-components';
    const Title = styled.h1`
      color: red;
    `;
    function App() {
      return (
        <div>
          <Title>CSS-in-JS</Title>
        </div>
      );
    }

11. dangerouslySetInnerHTML.


    [//]: dangerouslySetInnerHTML
     function MyComponent() {
       const htmlContent = '<p>This is some <strong>HTML</strong> content</p>';
        return ( <div dangerouslySetInnerHTML={{ __html: htmlContent }} />);
      }
