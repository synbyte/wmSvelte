import { writable } from "svelte/store";

export let items = writable( [])
export let t = writable(0);
