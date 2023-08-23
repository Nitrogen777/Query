import { supabase } from "./client";

export interface Question {
    id: Number,
    question: string
}
export interface Answer {
    question: string,
    response: string,
    up: boolean
}

export const insert_new_question = async (question: string, uuid: string | false | null) => {
    const { error } = await supabase.rpc('new_question',{question: question, uuid: uuid})
    return error
}

export const delete_question = async (uuid: string | false | null) => {
    const { error } = await supabase.functions.invoke('delete_question', {body: {uuid: uuid}})
    return error
}

export const get_random_question = async (uuid: string | false | null) => {
    const { data } = await supabase.rpc('get_random_question', {v_uuid: uuid})
    return data
}

export const get_answered_questions = async (uuid: string | false | null) => {
    const { data } = await supabase.rpc('get_answered_questions', {v_uuid: uuid})
    return data
}

export const add_answer = async (id: Number, answer: string) => {
    const { error } = await supabase.functions.invoke('add_answer', {body: {query_id: id, answer: answer}})
    return error
}

export const get_creation_time = async (uuid: string | false | null) => {
    const { error,data } = await supabase.rpc('get_creation_time', {v_uuid: uuid})
    if(error != null){
        return 0;
    }
    return data
}