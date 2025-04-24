/**
 * A type-safe extension of the standard EventTarget.
 * Allows defining a map of event types to their corresponding detail data types
 * for enhanced type checking when adding listeners and dispatching events.
 *
 * @template T A map where keys are event names (strings) and values are the
 * expected data type for the CustomEvent's detail property.
 */
class GenericsEventTarget<T> extends EventTarget {
  /**
   * Registers an event handler of a specific event type on the EventTarget.
   * Provides type safety for CustomEvents based on the provided type map T.
   *
   * @template K The event type, which must be a key of the type map T.
   * @param type The event type to listen for.
   * @param callback The function to call when the event occurs. This function
   * receives a CustomEvent with a detail property typed according
   * to T[K].
   * @param options An options object that specifies characteristics about the
   * event listener.
   */
  addEventListener<K extends keyof T>(
    type: K,
    callback: (e: CustomEvent<T[K]>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  /**
   * Registers a generic event handler of a specific event type on the EventTarget.
   * This overload maintains compatibility with standard EventTarget behavior.
   *
   * @param type The event type to listen for (as a string).
   * @param callback The EventListener or EventListenerObject to call.
   * @param options An options object that specifies characteristics about the
   * event listener.
   */
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  // Implementation signature covering all overloads
  addEventListener(type: any, callback: any, options?: any) {
    super.addEventListener(type, callback, options);
  }

  /**
   * Removes an event listener from the EventTarget.
   * Provides type safety for CustomEvents based on the provided type map T.
   *
   * @template K The event type, which must be a key of the type map T.
   * @param type The event type.
   * @param callback The event listener function to remove. Must be the same
   * function object originally passed to addEventListener.
   * @param options An options object that specifies characteristics about the
   * event listener.
   */
  removeEventListener<K extends keyof T>(
    type: K,
    callback: (e: CustomEvent<T[K]>) => void,
    options?: boolean | EventListenerOptions
  ): void;
  /**
   * Removes a generic event listener from the EventTarget.
   * This overload maintains compatibility with standard EventTarget behavior.
   *
   * @param type The event type (as a string).
   * @param callback The EventListener or EventListenerObject to remove.
   * @param options An options object that specifies characteristics about the
   * event listener.
   */
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions
  ): void;
  // Implementation signature covering all overloads
  removeEventListener(type: any, callback: any, options?: any) {
    super.removeEventListener(type, callback, options);
  }

  /**
   * Dispatches an Event at the specified EventTarget, (optionally) invoking
   * the affected EventListeners in the appropriate order.
   * Provides type safety for dispatching CustomEvents with detail based on T.
   *
   * @template K The event type, which must be a key of the type map T.
   * @param type The event type (a key of T).
   * @param detail The data to include in the CustomEvent's detail property.
   * Must match the type T[K].
   * @returns False if at least one of the handlers called preventDefault(),
   * otherwise true.
   */
  dispatchEvent<K extends keyof T>(type: K, detail: T[K]): boolean;
  /**
   * Dispatches a standard Event at the specified EventTarget.
   * This overload maintains compatibility with standard EventTarget behavior.
   *
   * @param event The Event object to dispatch.
   * @returns False if at least one of the handlers called preventDefault(),
   * otherwise true.
   */
  dispatchEvent(event: Event): boolean;
  // Implementation signature covering all overloads
  dispatchEvent(arg1: any, arg2?: any): boolean {
    if (arg1 instanceof Event) {
      // If the first argument is an Event instance, dispatch it directly
      return super.dispatchEvent(arg1);
    }
    // Otherwise, assume it's a type string and detail data, create a CustomEvent
    const ev = new CustomEvent(arg1, { detail: arg2 });
    return super.dispatchEvent(ev);
  }
}

// Export the class so it can be imported in other projects
export { GenericsEventTarget };

