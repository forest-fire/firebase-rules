/**
 * # TODO: Better naming.
 * Lifts function into a container that may execute it directly or wait for the passed function to be called.
 */
export declare const lift: (fn: any) => (value: any) => any;
