

export const todoReducer = ( initialState = [], action ) => {

    // SIEMPRE DEBO DE DEVOLVER UN NUEVO ESTADO
    switch ( action.type ){
        case '[TODO] Add Todo':
            // Evitar mutar los arreglos y los push

            return [ ...initialState, action.payload ]
        case '[TODO] Remove Todo':
            // PUEDO USAR EL FILTER POR QUE DEVUELVE UN NUEVO ARREGLO
            return initialState.filter( todo => todo.id !== action.payload );
            // action.payload TRAE EL ID
            // throw new Error('Action.type = ABC no esta implementada');
        case '[TODO] Toggle Todo':
            return initialState.map( todo => {
                if( todo.id === action.payload ) {
                        return {
                            ...todo,
                            done: !todo.done
                    }
                }
            return todo;
            })
        default:
            return initialState;
    }
}