import React, { useReducer } from "react";
import TareaContext from "./tareasContext";
import TareasReduce from "./tareasReduce";

import clienteAxios from "../../config/axios";

import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA} from "../../types/index"


const TareaState = props => {

   

    const initialState = {
        
        tareasProyecto:[],
        errorTarea: false, 
        tareaseleccionada: null 
    }

    const [state, dispatch] = useReducer(TareasReduce,initialState);


    //obtener las tareas de un proyecto 

    const obtenerTareas = async proyecto => {
        try {
            //console.log(proyecto);
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload:resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    // AGREGAR UNA TAREA AL PROYECTO SELECCIONADO 
    const agregarTarea  = async tarea => {
        
        try {
            console.log("la tarea es "); 
            console.log(tarea);
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log("el resultado es desde la api ")
            console.log(resultado.data.tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload:tarea
            })
        } catch (error) {
            console.log("cai a error");
            console.log(error);
        }
        
    }
    // valida y muestra un error. 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })

    }
    //elimina tarea por id 
    const eliminarTarea =  async (id, proyecto)=> {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params : {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // cambiar el estado de la tarea 

    // Edita o modifica una tarea 
    
      // Edita o modifica una tarea 
    const actualizarTarea =  async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado.data.tarea);
            dispatch({

                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        
            
        } catch (error) {
            console.log("paso aki ");
            console.log(error);
            
        }
        
    }


    //Extrae una tarea para su edición 

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }

    

    //Eliminar la tareaSelecionada 
    const limpiarTarea  = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    } 
    

    return (

        <TareaContext.Provider
         value={{
            tareasProyecto: state.tareasProyecto,
            errorTarea: state.errorTarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
         }}
        >
            {props.children}
        </TareaContext.Provider>
    );
}


export default TareaState;