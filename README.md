# **Type-Safe Event Target**

A lightweight and simple class that extends the native EventTarget to bring robust type safety to your custom events in TypeScript. Define your event types and their associated data payloads in a clear map, and let the compiler ensure you're dispatching and listening correctly.

Stop guessing what data your CustomEvent.detail contains\!

## **Why Use This?**

The native EventTarget and CustomEvent in the browser (and in Node.js with polyfills or specific APIs) are powerful but lack built-in type safety for the detail property of CustomEvents. This means you often have to manually cast or check the type of event.detail, which can lead to runtime errors.

Type-Safe Event Target solves this by allowing you to define a TypeScript interface or type representing your event map. The GenericsEventTarget class uses this map to provide strongly typed addEventListener, removeEventListener, and dispatchEvent methods.

## **Installation**

```
npm install type-safe-event-target
\# or
yarn add type-safe-event-target
```

## **Usage**

1. **Define your Event Map:** Create a TypeScript interface or type that maps your event names (string keys) to the expected data type for the CustomEvent.detail.

````ts
 interface AppEventMap {
  userLoggedIn: { userId: string; username: string };
  itemAddedToCart: { itemId: string; quantity: number };
  settingsUpdated: { theme: 'dark' | 'light' };
  // You can also have events with no detail data
  appInitialized: undefined;
 }
```

2. **Create an instance of GenericsEventTarget:** Instantiate the class, passing your event map type as the generic argument.
```ts
 import { GenericsEventTarget } from 'type-safe-event-target';
 ```

 const appEvents \= new GenericsEventTarget\<AppEventMap\>();

3. **Add Type-Safe Event Listeners:** Use the addEventListener method. The compiler will enforce that the event type is a key from your map and that the event object in the callback has a detail property matching the type defined in your map for that event.
```ts
 appEvents.addEventListener('userLoggedIn', (event) \=\> {
  // event.detail is automatically typed as { userId: string; username: string }
  console.log(\`User ${event.detail.username} (${event.detail.userId}) logged in.\`);
  // console.log(event.detail.nonExistentProperty); // \<-- TypeScript Error\!
 });

 appEvents.addEventListener('itemAddedToCart', (event) \=\> {
  // event.detail is automatically typed as { itemId: string; quantity: number }
  console.log(\`Added ${event.detail.quantity} of item ${event.detail.itemId} to cart.\`);
 });

 appEvents.addEventListener('appInitialized', (event) \=\> {
  // event.detail is automatically typed as undefined
  console.log('Application has initialized.');
  // console.log(event.detail.someValue); // \<-- TypeScript Error\!
 });
 ```

4. **Dispatch Type-Safe Events:** Use the dispatchEvent method. You can pass the event type (as a string literal from your map) and the detail data. The compiler will ensure the detail data matches the expected type for that event.
```
 // Dispatching a user login event
 appEvents.dispatchEvent('userLoggedIn', { userId: '123', username: 'Alice' });
 // appEvents.dispatchEvent('userLoggedIn', { userId: 456 }); // \<-- TypeScript Error\! (username is missing and userId type is wrong)

 // Dispatching an item added event
 appEvents.dispatchEvent('itemAddedToCart', { itemId: 'abc', quantity: 5 });
 // appEvents.dispatchEvent('itemAddedToCart', { itemId: 'xyz' }); // \<-- TypeScript Error\! (quantity is missing)

 // Dispatching an event with no detail
 appEvents.dispatchEvent('appInitialized', undefined);
 // appEvents.dispatchEvent('appInitialized', {}); // \<-- TypeScript Error\! (expected undefined)
```
## **API**

The GenericsEventTarget\<T\> class extends the native EventTarget and provides the following methods with enhanced type safety based on the generic type T:

- addEventListener\<K extends keyof T\>(type: K, callback: (e: CustomEvent\<T\[K\]\>) \=\> void, options?: boolean | AddEventListenerOptions): void;
- removeEventListener\<K extends keyof T\>(type: K, callback: (e: CustomEvent\<T\[K\]\>) \=\> void, options?: boolean | EventListenerOptions): void;
- dispatchEvent\<K extends keyof T\>(type: K, detail: T\[K\]): boolean;

It also maintains the original EventTarget method signatures for compatibility with standard Event objects or non-typed events:

- addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
- removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions): void;
- dispatchEvent(event: Event): boolean;

## **Development**

1. Clone the repository (once you create it).
2. Install dependencies: npm install or yarn install.
3. Build the project: npm run build or yarn build. This compiles the TypeScript code into the dist directory.

## **Contributing**

Feel free to open issues or submit pull requests if you have suggestions for improvements or find bugs.

## **License**

This project is licensed under the MIT License \- see the [LICENSE](https://github.com/yourusername/type-safe-event-target/blob/main/LICENSE) file for details.

**Note:** Replace yourusername and type-safe-event-target in the shield URLs and license link with your actual GitHub username and repository name once you create it. Update the author field in package.json as well.
````
