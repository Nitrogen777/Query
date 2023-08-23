import { writable } from 'svelte/store'
import { browser } from "$app/environment"
import { supabase } from "../client"

let stored = undefined;
if(browser){
    if(localStorage.getItem("uuid") == "undefined" || localStorage.getItem("uuid") == "null" || localStorage.getItem("uuid") == null){
        const { data, error } = await supabase.rpc('generate_uuid')
        localStorage.setItem("uuid", data)
    }
    stored = localStorage.getItem("uuid")
}
export const uuid = writable(browser && stored)
uuid.subscribe((value) => {if(browser) {return localStorage.uuid = value}})