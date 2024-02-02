import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";



export const useTodos = () => {
    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: 'Recolectar la piedra del alma',
        //     done: false,
        // },
        // {
        //     id: new Date().getTime() * 3,
        //     description: 'Recolectar la piedra del poder',
        //     done: false,
        // }
    ];
    
    const init = () => {
        // BUSCA LOS DATOS ALAMACENADOS ENM LOCALSTORAGE
        // es el opuesto de stringify
        return JSON.parse( localStorage.getItem('todos') );//SI ES NULO CARGA UN ARRAY VACIO
    }

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );//init es una funcion que inicializa el reducer

    // cuando los todos cambian debo ejecutar un efecto secundario por ejemplo un use effect

    useEffect(() => {//CADA VEZ QUE SE CAMBIEN LOS TODOS ESTE EFECTO LOS MOPDIFICARA
    //   console.log(todos)
        // localStorage es un api que viene directamente en javascript, como fetch o los eventos addeventlistener
        // solo se puede guardar strings
        localStorage.setItem('todos', JSON.stringify( todos ) || [] );
         
        

    }, [todos])//se vuelve a ejecutyar cunado los todos cambian
    
    const handleNewTodo = ( todo ) => {
        // console.log({todo})
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        // console.log( {id} )
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo= ( id ) => {
        // console.log( {id} )

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }
    return {
        todos, 
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleDeleteTodo, 
        handleNewTodo, 
        handleToggleTodo,
        
    }
}
    