"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericsEventTarget = void 0;
/**
 * A type-safe extension of the standard EventTarget.
 * Allows defining a map of event types to their corresponding detail data types
 * for enhanced type checking when adding listeners and dispatching events.
 *
 * @template T A map where keys are event names (strings) and values are the
 * expected data type for the CustomEvent's detail property.
 */
class GenericsEventTarget extends EventTarget {
    // Implementation signature covering all overloads
    addEventListener(type, callback, options) {
        super.addEventListener(type, callback, options);
    }
    // Implementation signature covering all overloads
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
    }
    // Implementation signature covering all overloads
    dispatchEvent(arg1, arg2) {
        if (arg1 instanceof Event) {
            // If the first argument is an Event instance, dispatch it directly
            return super.dispatchEvent(arg1);
        }
        // Otherwise, assume it's a type string and detail data, create a CustomEvent
        const ev = new CustomEvent(arg1, { detail: arg2 });
        return super.dispatchEvent(ev);
    }
}
exports.GenericsEventTarget = GenericsEventTarget;
