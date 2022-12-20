import { writable } from "svelte/store";

export let items = writable([
    { name:"ORBIT PINK S", 
        upc:"08584100751", 
        price:"29.92"},
        
        { name:"JU FLC HOODI", 
        upc:"07461943024", 
        price:"45.99"},
        
        { name:"MBM POTTERY", 
        upc:"00897686432", 
        price:"21.97"}
])